let timer;
const TIMEOUT = 2 * 60 * 1000; // 2 นาที

function resetTimer() {
  clearTimeout(timer);
  timer = setTimeout(lockNow, TIMEOUT);
}

function lockNow() {
  sessionStorage.clear();
  location.href = "index.html";
}

["mousemove","keydown","click","scroll","touchstart"].forEach(e =>
  document.addEventListener(e, resetTimer)
);

window.addEventListener("beforeunload", lockNow);
resetTimer();

export { lockNow };
