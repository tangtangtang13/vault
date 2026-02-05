import { deriveKey } from "./crypto.js";

window.unlock = async () => {
  const pw = document.getElementById("master").value;
  if (!pw) return alert("030646");

  const salt = crypto.getRandomValues(new Uint8Array(16));
  const key = await deriveKey(pw, salt);

  sessionStorage.setItem("vault_key", JSON.stringify({
    salt: Array.from(salt)
  }));

  window.location = "app.html";
};
