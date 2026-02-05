import { db } from "./db.js";
import { encrypt,decrypt } from "./crypto.js";
import { getKey,lock } from "./lock.js";
import { strength } from "./strength.js";

const list=document.getElementById("list");
const key=await getKey();
window.lock=lock;

async function load(){
  const d=await db();
  d.transaction("items").objectStore("items").getAll().onsuccess=async e=>{
    list.innerHTML="";
    for(const i of e.target.result){
      const li=document.createElement("li");
      li.textContent=i.title+" ";
      const b=document.createElement("button");
      b.textContent="👁";
      b.onclick=async()=>{
        b.textContent=await decrypt(i.data,i.iv,key);
        setTimeout(()=>b.textContent="👁",3000);
      };
      li.appendChild(b);
      list.appendChild(li);
    }
  };
}
window.add=async()=>{
  const t=title.value;
  const s=secret.value;
  document.getElementById("strength").textContent="Strength: "+strength(s);
  const {data,iv}=await encrypt(s,key);
  const d=await db();
  d.transaction("items","readwrite")
   .objectStore("items")
   .add({title:t,data,iv});
  secret.value="";
  load();
};
load();
