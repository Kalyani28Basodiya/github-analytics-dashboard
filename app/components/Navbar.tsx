"use client"

import { useTheme } from "next-themes"
import { signOut } from "next-auth/react"
import { useEffect, useState } from "react"

export default function Navbar({ name }: { name: string }) {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  return (
    <nav className="flex justify-between items-center mb-8 pb-4 border-b border-gray-800">
      <div>
        <h1 className="text-2xl font-bold">👋 Welcome, {name}!</h1>
        <p className="text-gray-400 text-sm">Your GitHub Analytics Dashboard</p>
      </div>

      <div className="flex items-center gap-3">
        {/* Dark Mode Toggle */}
        {mounted && (
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="bg-gray-800 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm transition"
          >
            {theme === "dark" ? "☀️ Light" : "🌙 Dark"}
          </button>
        )}

        {/* Logout */}
        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-900 hover:bg-red-800 text-white px-4 py-2 rounded-lg text-sm transition"
        >
          Logout
        </button>
      </div>
    </nav>
  )
}