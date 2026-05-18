"use client"

import { useEffect, useState } from "react"
import CommitHeatmap from "./CommitHeatmap"
import {
    BarChart, Bar, XAxis, YAxis, Tooltip,
    ResponsiveContainer, PieChart, Pie, Cell
} from "recharts"
import Image from "next/image"

interface Repo {
    name: string
    stars: number
    language: string
    updatedAt: string
}

interface Profile {
    name: string
    username: string
    avatar: string
    bio: string
    followers: number
    following: number
    publicRepos: number
}

interface Stats {
    profile: Profile
    totalRepos: number
    repos: Repo[]
    commitActivity: { date: string; count: number }[]  // yeh add karo
}

const COLORS = ["#6366f1", "#8b5cf6", "#ec4899", "#f59e0b", "#10b981"]

export default function GitHubStats({ accessToken }: { accessToken: string }) {
    const [stats, setStats] = useState<Stats | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("/api/github/stats")
            .then((r) => r.json())
            .then((data) => {
                setStats(data)
                setLoading(false)
            })
    }, [])

    if (loading) {
        return (
            <div className="flex items-center justify-center h-40">
                <p className="text-gray-400 animate-pulse">Loading your GitHub data...</p>
            </div>
        )
    }

    const languageData = stats?.repos.reduce((acc: any[], repo) => {
        const lang = repo.language || "Unknown"
        const existing = acc.find((i) => i.name === lang)
        if (existing) existing.value++
        else acc.push({ name: lang, value: 1 })
        return acc
    }, []) || []

    const barData = stats?.repos.map((r) => ({
        name: r.name.length > 10 ? r.name.slice(0, 10) + "..." : r.name,
        stars: r.stars,
    })) || []

    return (
        <div className="space-y-6">

            {/* Profile Card */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800 flex items-center gap-6">
                <Image
                    src={stats?.profile.avatar || ""}
                    alt="GitHub Avatar"
                    width={80}
                    height={80}
                    className="rounded-full border-2 border-indigo-500"
                />
                <div className="flex-1">
                    <h2 className="text-2xl font-bold">{stats?.profile.name}</h2>
                    <p className="text-gray-400">@{stats?.profile.username}</p>
                    {stats?.profile.bio && (
                        <p className="text-gray-300 text-sm mt-1">{stats?.profile.bio}</p>
                    )}
                </div>
                <div className="flex gap-6 text-center">
                    <div>
                        <p className="text-2xl font-bold text-indigo-400">
                            {stats?.profile.followers}
                        </p>
                        <p className="text-gray-400 text-xs">Followers</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-purple-400">
                            {stats?.profile.following}
                        </p>
                        <p className="text-gray-400 text-xs">Following</p>
                    </div>
                    <div>
                        <p className="text-2xl font-bold text-pink-400">
                            {stats?.profile.publicRepos}
                        </p>
                        <p className="text-gray-400 text-xs">Public Repos</p>
                    </div>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-3 gap-4">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <p className="text-gray-400 text-sm">Total Repos</p>
                    <p className="text-4xl font-bold mt-1 text-indigo-400">
                        {stats?.totalRepos}
                    </p>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <p className="text-gray-400 text-sm">Top Language</p>
                    <p className="text-4xl font-bold mt-1 text-purple-400">
                        {stats?.repos[0]?.language || "N/A"}
                    </p>
                </div>
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <p className="text-gray-400 text-sm">Recent Repos</p>
                    <p className="text-4xl font-bold mt-1 text-pink-400">
                        {stats?.repos.length}
                    </p>
                </div>
            </div>

            {/* Charts */}
            <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h2 className="text-lg font-semibold mb-4">Stars per Repo</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <BarChart data={barData}>
                            <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} />
                            <YAxis stroke="#6b7280" />
                            <Tooltip
                                contentStyle={{
                                    background: "#111827",
                                    border: "1px solid #374151",
                                    borderRadius: "8px",
                                }}
                            />
                            <Bar dataKey="stars" fill="#6366f1" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                    <h2 className="text-lg font-semibold mb-4">Languages Used</h2>
                    <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                            <Pie
                                data={languageData}
                                cx="50%"
                                cy="50%"
                                outerRadius={80}
                                dataKey="value"
                                label={({ name, percent }) =>
                                    `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                                }
                            >
                            </Pie>
                            <Tooltip
                                contentStyle={{
                                    background: "#111827",
                                    border: "1px solid #374151",
                                    borderRadius: "8px",
                                }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Repos Table */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h2 className="text-lg font-semibold mb-4">Recent Repositories</h2>
                <div className="space-y-3">
                    {stats?.repos.map((repo) => (
                        <div
                            key={repo.name}
                            className="flex justify-between items-center border-b border-gray-800 pb-3"
                        >
                            <span className="font-medium text-indigo-300">{repo.name}</span>
                            <div className="flex gap-4 text-sm text-gray-400">
                                <span className="bg-gray-800 px-2 py-1 rounded text-xs">
                                    {repo.language || "Unknown"}
                                </span>
                                <span>⭐ {repo.stars}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Commit Heatmap — YAHAN PASTE KARO 👇 */}
            {stats?.commitActivity && (
                <CommitHeatmap data={stats.commitActivity} />
            )}

        </div>
    )
}