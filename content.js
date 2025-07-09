document.addEventListener("dblclick", (e) => {
  const selectedText = window.getSelection().toString().trim();
  if (selectedText && selectedText.split(" ").length === 1) {
    showTooltip(e.pageX, e.pageY, selectedText);
  }
});

function showTooltip(x, y, word) {
  removeExistingTooltip();

  const tooltip = document.createElement("div");
  tooltip.className = "contextify-tooltip";
  tooltip.innerText = `You selected: "${word}"`;
  tooltip.style.top = `${y + 10}px`;
  tooltip.style.left = `${x + 10}px`;

  document.body.appendChild(tooltip);
}

function removeExistingTooltip() {
  const oldTooltip = document.querySelector(".contextify-tooltip");
  if (oldTooltip) oldTooltip.remove();
}
