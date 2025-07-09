const themeSelect = document.getElementById("themeSelect");
const fontSelect = document.getElementById("fontSelect");

// Load settings
chrome.storage.sync.get(["theme", "font"], (res) => {
  themeSelect.value = res.theme || "auto";
  fontSelect.value = res.font || "sans";
});

// Save changes
themeSelect.addEventListener("change", () => {
  chrome.storage.sync.set({ theme: themeSelect.value });
});

fontSelect.addEventListener("change", () => {
  chrome.storage.sync.set({ font: fontSelect.value });
});
