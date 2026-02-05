import { openDB } from "./db.js";
import { deriveKey, encrypt } from "./crypto.js";

let key;

(async () => {
  const session = JSON.parse(sessionStorage.getItem("vault_key"));
  if (!session) location.href = "index.html";

  const pw = prompt("Re-enter Master Password");
  const salt = new Uint8Array(session.salt);
  key = await deriveKey(pw, salt);
  loadItems();
})();

async function loadItems() {
  const db = await openDB();
  const tx = db.transaction("items");
  const store = tx.objectStore("items");
  store.getAll().onsuccess = e => {
    const ul = document.getElementById("list");
    ul.innerHTML = "";
    e.target.result.forEach(i => {
      const li = document.createElement("li");
      li.textContent = `${i.category} | ${i.title}`;
      ul.appendChild(li);
    });
  };
}

window.saveItem = async () => {
  const db = await openDB();
  const data = document.getElementById("secret").value;
  const { cipher, iv } = await encrypt(data, key);

  db.transaction("items", "readwrite")
    .objectStore("items")
    .add({
      category: category.value,
      title: title.value,
      cipher,
      iv
    });

  loadItems();
};

window.lock = () => {
  sessionStorage.clear();
  location.href = "index.html";
};
