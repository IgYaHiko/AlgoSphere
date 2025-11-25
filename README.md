# 🚀 AI Portfolio Creator  
A fully client-side portfolio generator that allows users to create, preview, and download beautiful personal portfolios — in **HTML** or **PDF** — directly from the browser.

This tool features multiple themes, templates, and an AI-like auto-generation system for bios and project descriptions. Optional OpenAI API key integration allows real GPT-powered content generation.

---

## 📌 Features

### 🎨 **Themes & Templates**
- Select from multiple **themes** (Dark, Light, Blue, Warm)
- Switch between **templates** (Modern, Minimal, Developer)
- Instant live preview inside a sandboxed iframe

### 🤖 **AI-like Auto Generation**
- Auto-generate:
  - Bio
  - Project descriptions
  - Skill overview
- Works locally (no API key required)
- Optional: Add your own **OpenAI API key** for real GPT generation

### 📄 **Export Options**
- **Download HTML** version of the generated portfolio
- **Download PDF** (powered by `html2canvas` + `jsPDF`)

### 🖼️ **Photo Upload Support**
- Upload and embed your profile image in templates

### ⚡ 100% Client-Side
- No backend required  
- Works offline  
- Your data never leaves your browser  
- Safe for local use

---

## 🛠️ Tech Stack

| Purpose | Technology |
|--------|------------|
| UI & Layout | HTML5, CSS3, Custom Themes |
| Logic | Vanilla JavaScript (ES6+) |
| PDF Export | html2canvas, jsPDF |
| AI Auto-Gen | Local text generator + Optional OpenAI API |
| Sandbox Rendering | iframe with `allow-same-origin allow-scripts` |

---

## 📁 Project Structure

