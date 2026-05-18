"use client"

export default function DownloadPDF() {
  const handleDownload = async () => {
    const domtoimage = (await import("dom-to-image")).default
    const jsPDF = (await import("jspdf")).default

    const element = document.getElementById("dashboard-content")!

    const dataUrl = await domtoimage.toPng(element, {
      bgcolor: "#111827",
      width: element.scrollWidth,
      height: element.scrollHeight,
    })

    const pdf = new jsPDF("landscape", "mm", "a4")
    const width = pdf.internal.pageSize.getWidth()
    const height = pdf.internal.pageSize.getHeight()

    pdf.addImage(dataUrl, "PNG", 0, 0, width, height)
    pdf.save("github-analytics-report.pdf")
  }

  return (
    <button
      onClick={handleDownload}
      className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm transition"
    >
      📄 Download PDF
    </button>
  )
}