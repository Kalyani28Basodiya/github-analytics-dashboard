import { auth } from "@/app/api/auth/[...nextauth]/route"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const [profileRes, reposRes] = await Promise.all([
    fetch("https://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }),
    fetch("https://api.github.com/user/repos?per_page=100&sort=updated", {
      headers: {
        Authorization: `Bearer ${session.accessToken}`,
        Accept: "application/vnd.github.v3+json",
      },
    }),
  ])

  const profile = await profileRes.json()
  const repos = await reposRes.json()

  if (!Array.isArray(repos)) {
    return NextResponse.json({ error: "GitHub API error" })
  }

  // Last 30 days commit activity
  const thirtyDaysAgo = new Date()
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30)

  // Top 5 repos se commits fetch karo
  const commitPromises = repos.slice(0, 5).map((repo: any) =>
    fetch(
      `https://api.github.com/repos/${profile.login}/${repo.name}/commits?since=${thirtyDaysAgo.toISOString()}&per_page=100`,
      {
        headers: {
          Authorization: `Bearer ${session.accessToken}`,
          Accept: "application/vnd.github.v3+json",
        },
      }
    ).then((r) => r.json())
  )

  const allCommitsArrays = await Promise.all(commitPromises)

  // Date wise group karo
  const commitMap: Record<string, number> = {}
  allCommitsArrays.forEach((commits) => {
    if (!Array.isArray(commits)) return
    commits.forEach((commit: any) => {
      const date = commit.commit?.author?.date?.split("T")[0]
      if (date) {
        commitMap[date] = (commitMap[date] || 0) + 1
      }
    })
  })

  const commitActivity = Object.entries(commitMap).map(([date, count]) => ({
    date,
    count,
  }))

  return NextResponse.json({
    profile: {
      name: profile.name,
      username: profile.login,
      avatar: profile.avatar_url,
      bio: profile.bio,
      followers: profile.followers,
      following: profile.following,
      publicRepos: profile.public_repos,
    },
    totalRepos: repos.length,
    repos: repos.slice(0, 5).map((r: any) => ({
      name: r.name,
      stars: r.stargazers_count,
      language: r.language,
      updatedAt: r.updated_at,
    })),
    commitActivity,
  })
}