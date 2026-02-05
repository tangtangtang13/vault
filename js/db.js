export function openDB() {
  return new Promise((res) => {
    const req = indexedDB.open("vaultDB", 1);
    req.onupgradeneeded = e => {
      e.target.result.createObjectStore("items", { keyPath: "id", autoIncrement: true });
    };
    req.onsuccess = e => res(e.target.result);
  });
}
