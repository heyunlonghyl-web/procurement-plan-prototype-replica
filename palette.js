const toneByLabel = new Map([
  ["持续增长", "tone-high"],
  ["月度增长", "tone-growth"],
  ["基本持平", "tone-neutral"],
  ["波动", "tone-neutral"],
  ["月度下降", "tone-low"],
  ["持续下降", "tone-no-stock"],
  ["爆款", "tone-high"],
  ["旺款", "tone-growth"],
  ["平款", "tone-neutral"],
  ["滞销款", "tone-no-stock"],
  ["新品", "tone-new"],
  ["商品清仓", "tone-low"],
  ["停止销售", "tone-stopped"],
]);

const toneClasses = [
  "tone-high",
  "tone-growth",
  "tone-neutral",
  "tone-low",
  "tone-no-stock",
  "tone-stopped",
  "tone-new",
];

function applySemanticTones() {
  document.querySelectorAll("#root span").forEach((element) => {
    const tone = toneByLabel.get(element.textContent.trim());
    if (!tone) return;

    element.classList.remove(...toneClasses);
    element.classList.add("semantic-tone", tone);
  });
}

let updateScheduled = false;
const observer = new MutationObserver(() => {
  if (updateScheduled) return;
  updateScheduled = true;
  requestAnimationFrame(() => {
    updateScheduled = false;
    applySemanticTones();
  });
});

applySemanticTones();
observer.observe(document.getElementById("root"), {
  childList: true,
  subtree: true,
});
