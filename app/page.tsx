import Link from "next/link"
import { auth } from "./api/auth/[...nextauth]/route"
import { redirect } from "next/navigation"

export default async function Home() {
  const session = await auth()
  if (session) redirect("/dashboard")

  return (
    <main className="min-h-screen bg-gray-950 text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-800">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📊</span>
          <span className="font-bold text-lg">GitAnalytics</span>
        </div>
        <Link
          href="/api/auth/signin"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-5 py-2 rounded-lg text-sm font-medium transition"
        >
          Login with GitHub
        </Link>
      </nav>

      {/* Hero */}
      <section className="flex-1 flex flex-col items-center justify-center text-center px-4 py-20">
        <div className="inline-flex items-center gap-2 bg-indigo-950 border border-indigo-800 text-indigo-300 text-sm px-4 py-1.5 rounded-full mb-6">
          <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
          Real-time GitHub Analytics
        </div>

        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
          Track Your
          <span className="text-indigo-400"> Coding Journey</span>
          <br />
          Like Never Before
        </h1>

        <p className="text-gray-400 text-lg max-w-xl mb-10">
          Connect your GitHub account and get beautiful insights about your
          repositories, commit activity, and programming languages.
        </p>

        <div className="flex gap-4">
          <Link
            href="/api/auth/signin"
            className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold text-lg transition"
          >
            Get Started — It's Free
          </Link>
        </div>
      </section>

      {/* Features */}
      <section className="px-8 py-16 border-t border-gray-800">
        <h2 className="text-3xl font-bold text-center mb-12">
          Everything you need to track your progress
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl mb-4">📈</div>
            <h3 className="font-semibold text-lg mb-2">Commit Activity</h3>
            <p className="text-gray-400 text-sm">
              Visual heatmap of your last 30 days coding activity. See your streaks at a glance.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl mb-4">🥧</div>
            <h3 className="font-semibold text-lg mb-2">Language Breakdown</h3>
            <p className="text-gray-400 text-sm">
              Pie chart showing which programming languages you use most across all repos.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl mb-4">📄</div>
            <h3 className="font-semibold text-lg mb-2">PDF Reports</h3>
            <p className="text-gray-400 text-sm">
              Download your analytics as a beautiful PDF report to share with anyone.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl mb-4">🌙</div>
            <h3 className="font-semibold text-lg mb-2">Dark Mode</h3>
            <p className="text-gray-400 text-sm">
              Easy on the eyes dark mode that remembers your preference automatically.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="font-semibold text-lg mb-2">Real-time Data</h3>
            <p className="text-gray-400 text-sm">
              Always fresh data directly from GitHub API. No stale cache, always accurate.
            </p>
          </div>

          <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
            <div className="text-3xl mb-4">🔒</div>
            <h3 className="font-semibold text-lg mb-2">Secure OAuth</h3>
            <p className="text-gray-400 text-sm">
              Login securely with GitHub OAuth 2.0. We never store your credentials.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="text-center py-16 px-4 border-t border-gray-800">
        <h2 className="text-3xl font-bold mb-4">Ready to see your stats?</h2>
        <p className="text-gray-400 mb-8">
          Join developers who track their coding journey with GitAnalytics.
        </p>
        <Link
          href="/api/auth/signin"
          className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-xl font-semibold text-lg transition"
        >
          Connect GitHub Now
        </Link>
      </section>

      {/* Footer */}
      <footer className="text-center py-6 border-t border-gray-800 text-gray-500 text-sm">
        Built with Next.js · Auth.js · Recharts · TanStack Query
      </footer>

    </main>
  )
}