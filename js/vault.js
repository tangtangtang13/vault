import { openDB } from "./db.js";
import { deriveKey, encrypt, decrypt } from "./crypto.js";
import { lockNow } from "./lock.js";

let key;

(async () => {
  const session = JSON.parse(sessionStorage.getItem("vault_key"));
  if (!session) lockNow();

  const pw = prompt("Master Password");
  const salt = new Uint8Array(session.salt);
  key = await deriveKey(pw, salt);
  loadItems();
})();

async function loadItems() {
  const db = await openDB();
  const tx = db.transaction("items");
  tx.objectStore("items").getAll().onsuccess = async e => {
    const ul = document.getElementById("list");
    ul.innerHTML = "";
    for (const i of e.target.result) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.textContent = "👁";
      btn.onclick = async () => {
        const txt = await decrypt(i.cipher, i.iv, key);
        btn.textContent = txt;
        setTimeout(() => btn.textContent = "👁", 3000);
      };
      li.textContent = `${i.category} | ${i.title} `;
      li.appendChild(btn);
      ul.appendChild(li);
    }
  };
}

window.saveItem = async () => {
  const db = await openDB();
  const { cipher, iv } = await encrypt(secret.value, key);
  db.transaction("items","readwrite")
    .objectStore("items")
    .add({ category:category.value, title:title.value, cipher, iv });
  loadItems();
};

window.lock = lockNow;
