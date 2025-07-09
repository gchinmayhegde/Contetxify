document.addEventListener("dblclick", async (e) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText && selectedText.split(" ").length === 1) {
    const x = e.pageX;
    const y = e.pageY;

    removeExistingTooltip();
    showTooltip(x, y, renderWordCard("Loading...", "", "", "", ""));

    const wordData = await fetchWordData(selectedText.toLowerCase());
    const html = formatWordCard(selectedText, wordData);
    updateTooltipContent(html);
  }
});

// Remove existing tooltip
function removeExistingTooltip() {
  const oldTooltip = document.querySelector(".contextify-tooltip");
  if (oldTooltip) oldTooltip.remove();
}

// Show initial tooltip
function showTooltip(x, y, htmlContent) {
  const tooltip = document.createElement("div");
  tooltip.className = "contextify-tooltip";
  tooltip.style.top = `${y + 10}px`;
  tooltip.style.left = `${x + 10}px`;
  tooltip.innerHTML = htmlContent;
  document.body.appendChild(tooltip);

  // Auto dismiss after 10s
  setTimeout(removeExistingTooltip, 10000);
}

// Dismiss on outside click
document.addEventListener("click", (e) => {
  if (!e.target.closest(".contextify-tooltip")) {
    removeExistingTooltip();
  }
});

// Update tooltip content after data is fetched
function updateTooltipContent(html) {
  const tooltip = document.querySelector(".contextify-tooltip");
  if (tooltip) tooltip.innerHTML = html;
}

// Fetch definition data
async function fetchWordData(word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error("Word not found");
    const data = await res.json();
    return data[0]; // First result
  } catch (err) {
    return { error: true, message: err.message };
  }
}

// Format and build visual word card HTML
function formatWordCard(word, data) {
  if (data.error) {
    return renderWordCard(word, "", `❌ ${data.message}`, "", "");
  }

  const phonetic = data.phonetic || (data.phonetics?.[0]?.text || "");
  const audio = data.phonetics?.find(p => p.audio)?.audio || "";
  const meaning = data.meanings?.[0]?.definitions?.[0];
  const definition = meaning?.definition || "No definition found.";
  const example = meaning?.example || "";

  return renderWordCard(word, phonetic, definition, example, audio);
}

// Actual visual card layout
function renderWordCard(word, phonetic, definition, example, audio) {
  return `
    <div class="word-card">
      <div class="word-head">
        <span class="word">${word}</span>
        ${phonetic ? `<span class="phonetic">/${phonetic}/</span>` : ""}
      </div>
      ${definition ? `<div class="definition">📖 ${definition}</div>` : ""}
      ${example ? `<div class="example">💡 <em>${example}</em></div>` : ""}
      ${audio ? `<audio controls src="${audio}" class="audio"></audio>` : ""}
    </div>
  `;
}
