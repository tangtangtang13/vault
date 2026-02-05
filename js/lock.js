import { deriveKey } from "./crypto.js";
let key;

export async function initSession(){
  const pw=document.getElementById("master").value;
  const salt=crypto.getRandomValues(new Uint8Array(16));
  key=await deriveKey(pw,salt);
  sessionStorage.vault=JSON.stringify({salt:[...salt]});
  location.href="app.html";
}

export function getKey(){
  if(key) return key;
  const s=JSON.parse(sessionStorage.vault||"");
  if(!s) location.href="index.html";
  const pw=prompt("Master Password");
  return deriveKey(pw,new Uint8Array(s.salt));
}

export function lock(){
  sessionStorage.clear();
  location.href="index.html";
}
