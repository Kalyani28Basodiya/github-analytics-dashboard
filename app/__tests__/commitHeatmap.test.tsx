import { render, screen } from "@testing-library/react"
import CommitHeatmap from "@/components/CommitHeatmap"

describe("CommitHeatmap", () => {
  it("renders correctly with empty data", () => {
    render(<CommitHeatmap data={[]} />)
    expect(screen.getByText("Commit Activity — Last 30 Days")).toBeInTheDocument()
  })

  it("shows 0 commits when no data", () => {
    render(<CommitHeatmap data={[]} />)
    expect(screen.getByText("0 commits")).toBeInTheDocument()
  })

  it("shows correct commit count", () => {
    const data = [
      { date: "2024-01-01", count: 5 },
      { date: "2024-01-02", count: 3 },
    ]
    render(<CommitHeatmap data={data} />)
    expect(screen.getByText("8 commits")).toBeInTheDocument()
  })

  it("renders 30 day squares", () => {
    render(<CommitHeatmap data={[]} />)
    const squares = document.querySelectorAll(".w-7.h-7")
    expect(squares).toHaveLength(30)
  })
})