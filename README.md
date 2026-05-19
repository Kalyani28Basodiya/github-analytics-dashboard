# 📊 GitAnalytics Dashboard

> A full-stack GitHub analytics dashboard that visualizes your coding journey with real-time data.

🔗 **Live Demo:** https://github-analytics-dashboard-black.vercel.app
## 📸 Screenshots
<img width="1920" height="1022" alt="Screenshot (1862)" src="https://github.com/user-attachments/assets/fe643519-bf25-4797-95a9-d5aef111c7f2" />
---

## 🤔 Why I Built This

Most developers don't have a clear picture of their coding habits. I wanted to build a tool that connects to real GitHub data and presents it in a beautiful, meaningful way — not just fake placeholder charts.

---

## ✨ Features

- 🔐 GitHub OAuth 2.0 secure login
- 📈 Real-time repository analytics
- 🥧 Language breakdown pie chart
- ⭐ Stars per repository bar chart
- 🗓️ 30-day commit activity heatmap
- 🌙 Dark mode with localStorage persistence
- 📄 Download dashboard as PDF report
- 👤 GitHub profile — bio, followers, avatar

---

## 🛠️ Tech Stack

| Frontend | Auth | Data | Testing | Deploy |
|----------|------|------|---------|--------|
| Next.js 14 | Auth.js | GitHub API | Jest | Vercel |
| TypeScript | OAuth 2.0 | Recharts | React Testing Library | — |
| Tailwind CSS | JWT Sessions | TanStack Query | — | — |

---

## 🧠 Technical Challenges I Faced

**1. OAuth Token Persistence**
Getting the GitHub access token to persist in the session was tricky. Auth.js by default doesn't expose the token — had to implement custom `jwt` and `session` callbacks to make it available for API calls.

**2. Real Commit Data**
GitHub doesn't have a single "all commits" endpoint. Had to fetch commits from each repo individually and merge + group them by date to build the heatmap.

**3. PDF Export with CSS**
`html2canvas` doesn't support modern CSS color functions like `lab()`. Switched to `dom-to-image` which handled Tailwind CSS correctly.

---

## 🚀 Future Improvements

- [ ] Add Spotify integration for music habits tracking
- [ ] Weekly email reports
- [ ] Compare stats with other GitHub users
- [ ] Contribution streak counter
- [ ] Mobile app with React Native

---

## 🧪 Testing

11 unit tests written with Jest + React Testing Library:

```bash
npm test
# Test Suites: 3 passed
# Tests: 11 passed
```

---

## ⚙️ Setup & Installation

```bash
git clone https://github.com/Kalyani28Basodiya/github-analytics-dashboard.git
cd github-analytics-dashboard
npm install
```

Create `.env.local`:
```
GITHUB_CLIENT_ID=your_value
GITHUB_CLIENT_SECRET=your_value
AUTH_SECRET=your_value
NEXTAUTH_URL=http://localhost:3000
```

```bash
npm run dev
```

---

## 👩‍💻 Built by Kalyani Basodiya 
