import { openDB } from "./db.js";

export async function exportVault() {
  const db = await openDB();
  const items = await new Promise(r=>{
    const req=db.transaction("items").objectStore("items").getAll();
    req.onsuccess=e=>r(e.target.result);
  });
  const blob = new Blob([JSON.stringify(items)], {type:"application/json"});
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "vault.enc.json";
  a.click();
}

export async function importVault(file) {
  const text = await file.text();
  const items = JSON.parse(text);
  const db = await openDB();
  const store = db.transaction("items","readwrite").objectStore("items");
  items.forEach(i => store.add(i));
}
