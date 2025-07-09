document.addEventListener("dblclick", async (e) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText && selectedText.split(" ").length === 1) {
    const x = e.pageX;
    const y = e.pageY;

    removeExistingTooltip();
    showTooltip(x, y, renderWordCard("Loading...", "", "", "", "", ""));

    const word = selectedText.toLowerCase();
    const [dictData, wikiSnippet] = await Promise.all([
      fetchWordData(word),
      fetchWikipediaSnippet(word)
    ]);

    const html = formatWordCard(word, dictData, wikiSnippet);
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
  tooltip.style.top = `${y + 10}px`;
  tooltip.style.left = `${x + 10}px`;
  tooltip.innerHTML = htmlContent;
  document.body.appendChild(tooltip);

  setTimeout(removeExistingTooltip, 10000);
}

document.addEventListener("click", (e) => {
  if (!e.target.closest(".contextify-tooltip")) {
    removeExistingTooltip();
  }
});

function updateTooltipContent(html) {
  const tooltip = document.querySelector(".contextify-tooltip");
  if (tooltip) tooltip.innerHTML = html;
}

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

async function fetchWikipediaSnippet(word) {
  try {
    const res = await fetch(
      `https://en.wikipedia.org/w/api.php?action=query&list=search&srsearch=${word}&format=json&origin=*`
    );
    const data = await res.json();
    const snippet = data.query?.search?.[0]?.snippet;
    if (snippet) {
      // Highlight the word in snippet
      const highlighted = snippet.replace(
        new RegExp(`(${word})`, "gi"),
        "<mark>$1</mark>"
      );
      return highlighted + "...";
    }
    return null;
  } catch (err) {
    return null;
  }
}

function formatWordCard(word, data, wikiSnippet) {
  if (data.error) {
    return renderWordCard(word, "", `❌ ${data.message}`, "", "", wikiSnippet);
  }

  const phonetic = data.phonetic || (data.phonetics?.[0]?.text || "");
  const audio = data.phonetics?.find(p => p.audio)?.audio || "";
  const meaning = data.meanings?.[0]?.definitions?.[0];
  const definition = meaning?.definition || "No definition found.";
  const example = meaning?.example || "";

  return renderWordCard(word, phonetic, definition, example, audio, wikiSnippet);
}

function renderWordCard(word, phonetic, definition, example, audio, wikiSnippet) {
  return `
    <div class="word-card">
      <div class="word-head">
        <span class="word">${word}</span>
        ${phonetic ? `<span class="phonetic">/${phonetic}/</span>` : ""}
      </div>
      ${definition ? `<div class="definition">📖 ${definition}</div>` : ""}
      ${example ? `<div class="example">💡 <em>${example}</em></div>` : ""}
      ${audio ? `<audio controls src="${audio}" class="audio"></audio>` : ""}
      ${
        wikiSnippet
          ? `<div class="wiki-snippet">🌐 <strong>Wikipedia:</strong><br><span>${wikiSnippet}</span></div>`
          : ""
      }
    </div>
  `;
}
