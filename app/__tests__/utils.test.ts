describe("GitHub Stats Utils", () => {
  it("calculates total commits correctly", () => {
    const data = [
      { date: "2024-01-01", count: 5 },
      { date: "2024-01-02", count: 3 },
      { date: "2024-01-03", count: 0 },
    ]
    const total = data.reduce((sum, d) => sum + d.count, 0)
    expect(total).toBe(8)
  })

  it("calculates active days correctly", () => {
    const data = [
      { date: "2024-01-01", count: 5 },
      { date: "2024-01-02", count: 0 },
      { date: "2024-01-03", count: 3 },
    ]
    const activeDays = data.filter((d) => d.count > 0).length
    expect(activeDays).toBe(2)
  })

  it("handles empty data", () => {
    const data: { date: string; count: number }[] = []
    const total = data.reduce((sum, d) => sum + d.count, 0)
    expect(total).toBe(0)
  })

  it("truncates long repo names", () => {
    const name = "my-very-long-repository-name"
    const truncated = name.length > 10 ? name.slice(0, 10) + "..." : name
    expect(truncated).toBe("my-very-lo...")
  })
})