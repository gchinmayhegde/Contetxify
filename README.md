# 📚 Contextify – On-the-Fly Word Explainer Chrome Extension

> Instantly get definitions, pronunciations, usage examples, and live Wikipedia snippets by simply double-clicking a word on any webpage.

---

## 🚀 Features

✅ Double-click any word on any webpage  
✅ Beautiful word cards with phonetics, audio, and examples  
✅ 📖 Definitions from dictionary API  
✅ 🌐 Wikipedia snippets showing real-world use  
✅ 🔊 Pronunciation with audio  
✅ 🌓 Light / Dark / Auto theme toggle  
✅ 🅰️ Font style toggle (Serif / Sans)  
✅ ⏱️ Tooltip disappears automatically after 10 seconds  
✅ 🎛️ Preferences saved with `chrome.storage.sync`

---

## 📦 Installation

### 🔧 Load as Unpacked Extension

1. Download or clone this repo  
2. Go to: `chrome://extensions` in your Chrome browser  
3. Enable **Developer Mode** (top right toggle)  
4. Click **Load unpacked**  
5. Select the extension folder

Done! The extension icon will appear in your toolbar.

---

## 🧑‍💻 How to Use

- Just **double-click** any word  
- A tooltip will show:
  - Definition  
  - Example usage  
  - Phonetic text and audio  
  - A Wikipedia snippet if available  
- Tooltip closes after 10 seconds  
- Use the popup to change:
  - Theme (light/dark/auto)  
  - Font (serif/sans-serif)

---

## 🛠️ Project Structure

CONTEXTIFY/
├── icons/
│   └── icon128.png
├── popup/
│   ├── popup.html
│   └── popup.js
├── styles/
│   └── tooltip.css
├── content.js
├── manifest.json
├── README.md
└── LICENSE


---

## 🔌 APIs Used

- [dictionaryapi.dev](https://dictionaryapi.dev/)  
- [Wikipedia API](https://en.wikipedia.org/w/api.php)

---

## 📋 License

MIT License © 2025 [gchinmayhegde]
