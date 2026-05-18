import { auth } from "../api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"
import GitHubStats from "../components/GitHubStats"
import Navbar from "../components/Navbar"
import DownloadPDF from "../components/DownloadPDF"

export default async function Dashboard() {
  const session = await auth()
  if (!session) redirect("/")

  return (
    <main className="min-h-screen bg-gray-950 dark:bg-gray-950 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <Navbar name={session.user?.name || "User"} />

        <div className="flex justify-end mb-4">
          <DownloadPDF />
        </div>

        <div id="dashboard-content">
          <GitHubStats accessToken={session.accessToken!} />
        </div>
      </div>
    </main>
  )
}