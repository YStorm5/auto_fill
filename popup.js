async function getCurrentTab() {
  let queryOptions = { active: true, lastFocusedWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab.id;
}
const btn = document.getElementById("myBtnOnly");
const text = document.getElementById("text");
const saveBtn = document.getElementById("saveBtn");

saveBtn.addEventListener("click", async (e) => {
  chrome.storage.local.clear();
  chrome.storage.local.set({
    config: {
      text: {
        length: text.value,
      },
    },
  });
});
btn.addEventListener("click", async () => {
  chrome.scripting.executeScript({
    target: { tabId: await getCurrentTab() },
    files: ["content.js"],
  });
});
