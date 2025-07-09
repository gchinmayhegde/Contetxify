document.addEventListener("dblclick", async (e) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText && selectedText.split(" ").length === 1) {
    const x = e.pageX;
    const y = e.pageY;
    removeExistingTooltip();
    showTooltip(x, y, "Loading...");
    const wordData = await fetchWordData(selectedText.toLowerCase());
    const html = formatWordData(selectedText, wordData);
    updateTooltipContent(html);
  }
});

function removeExistingTooltip() {
  const oldTooltip = document.querySelector(".contextify-tooltip");
  if (oldTooltip) oldTooltip.remove();
}

function showTooltip(x, y, htmlContent) {
  const tooltip = document.createElement("div");
  tooltip.className = "contextify-tooltip";
  tooltip.innerHTML = htmlContent;
  tooltip.style.top = `${y + 10}px`;
  tooltip.style.left = `${x + 10}px`;
  document.body.appendChild(tooltip);
}

function updateTooltipContent(html) {
  const tooltip = document.querySelector(".contextify-tooltip");
  if (tooltip) tooltip.innerHTML = html;
}

async function fetchWordData(word) {
  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error("Word not found");
    const data = await res.json();
    return data[0]; // first entry
  } catch (err) {
    return { error: true, message: err.message };
  }
}

function formatWordData(word, data) {
  if (data.error) {
    return `<strong>${word}</strong><br><em>${data.message}</em>`;
  }

  const phonetic = data.phonetic || (data.phonetics?.[0]?.text || "");
  const audio = data.phonetics?.find(p => p.audio)?.audio;

  const meaning = data.meanings?.[0]?.definitions?.[0];
  const definition = meaning?.definition || "No definition found.";
  const example = meaning?.example || "";

  return `
    <strong>${word}</strong> <em>${phonetic}</em><br>
    <small>${definition}</small><br>
    ${example ? `<q>${example}</q><br>` : ""}
    ${audio ? `<audio controls src="${audio}" style="width:100%;margin-top:4px;"></audio>` : ""}
  `;
}
