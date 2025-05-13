# 🎓 DropLearn.io – Your Personal AI-Powered Tutor

**DropLearn.io** is a fully responsive web app designed to help students learn faster using AI. This tool takes any lecture material or syllabus and turns it into an interactive tutoring experience — powered by voice or chat.

Built with TypeScript, React, Tailwind CSS, and OpenAI, this project is optimized for performance, clarity, and real-world usefulness. It’s the kind of tool I wish I had throughout university — so I made it.

---

## 🚀 Live Demo

**Coming Soon...**

---

## 🧠 What It Does

- 🎙️ **Voice Tutoring**: Ask questions verbally and get answers in real-time.
- 💬 **Chat Interface**: Prefer typing? The chatbot has you covered.
- 📂 **File Upload**: Drop in lecture notes, slides, or syllabi.
- 🧾 **PDF-to-Text**: Processes your uploads and prepares them for AI analysis.
- 🧠 **OpenAI-Powered**: Answers are personalized based on your exact material.

---

## 🧰 Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Styling**: Tailwind CSS + Gradient UI
- **Voice Input**: Native browser Speech Recognition API
- **Chat Backend**: OpenAI GPT-4 (via custom API hook)
- **Design Approach**: Fully componentized with context-based global state

---

## 🗂 Project Structure

```bash
.
├── public/                   # Static files
├── src/
│   ├── components/           # UI components (Header, Footer, Tutor interfaces)
│   ├── context/              # TutorContext for managing app-wide state
│   ├── hooks/                # Custom hooks for voice, file upload, and OpenAI
│   ├── types/                # Type definitions
│   ├── App.tsx              # Main app entry
│   └── main.tsx             # Vite bootstrap
├── dist/                    # Production build (auto-generated)
├── tailwind.config.js       # Tailwind custom config
├── vite.config.ts           # Vite config with TS support
└── package.json             # Project metadata and scripts
```

---

## 🧪 How to Run It

```bash
# 1. Clone the repo
git clone https://github.com/YourUsername/DropLearn.git
cd DropLearn

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

Visit `http://localhost:5173` to start tutoring yourself.

---

## 📌 Key Features Deep Dive

- `TutorContext`: Global state management for file uploads, tutor mode, and session control.
- `ChatInterface` + `VoiceInterface`: Seamlessly switch between chat and speech.
- `useChatGPT`: Hook for interacting with OpenAI's API.
- `useVoiceRecognition`: Voice-to-text support with graceful fallback for unsupported browsers.
- `useFileUpload`: Drag-and-drop + click-to-upload support.

---

## 🧩 Design Philosophy

- Minimal UI but powerful interaction
- Fast load times with Vite bundler
- Modular codebase for easy scaling and maintenance
- Custom visual feedback (voice visualizer, scroll-to-bottom, etc.)

---

## 🔮 Future Ideas

- Optimize current features
- Firebase or Supabase for login + data history
- Upgrade UI aesthetic
- Mobile-first voice-only interface
- AI model switcher (Claude, Gemini, etc.)
- Real-time collaboration tutoring with peers

---

## 👨‍💻 About Me

I'm Ahmed Abdelgalil — a computer science student from the University of Manitoba, passionate about using code to make learning more accessible, efficient, and human. This is one of the most meaningful projects I’ve built because it solves a real pain point I’ve lived through.

---

## 📬 Let’s Talk

Want to work together? Or just curious how this all works?  
Reach out, I’m always up to talk code, AI, and creativity.
