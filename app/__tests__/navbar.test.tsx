import { render, screen } from "@testing-library/react"
import Navbar from "@/components/Navbar"

jest.mock("next-auth/react", () => ({
  signOut: jest.fn(),
}))

jest.mock("next-themes", () => ({
  useTheme: () => ({ theme: "dark", setTheme: jest.fn() }),
}))

describe("Navbar", () => {
  it("renders user name correctly", () => {
    render(<Navbar name="Kalyani Basodiya" />)
    expect(screen.getByText(/Welcome, Kalyani Basodiya!/)).toBeInTheDocument()
  })

  it("renders logout button", () => {
    render(<Navbar name="Kalyani" />)
    expect(screen.getByText("Logout")).toBeInTheDocument()
  })

  it("renders dark mode toggle", () => {
    render(<Navbar name="Kalyani" />)
    expect(screen.getByText("☀️ Light")).toBeInTheDocument()
  })
})