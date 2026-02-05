import { db } from "./db.js";
import { encrypt,decrypt } from "./crypto.js";
import { getKey,lock } from "./lock.js";
import { strength } from "./strength.js";

const item = document.createElement("div");
item.className = "item";

const info = document.createElement("div");
info.className = "item-info";
info.innerHTML = `<strong>${i.title}</strong><small>${i.tags || ""}</small>`;

const btn = document.createElement("button");
btn.textContent = "👁";
btn.onclick = async () => {
  btn.textContent = await decrypt(i.data, i.iv, key);
  setTimeout(() => btn.textContent = "👁", 3000);
};

item.appendChild(info);
item.appendChild(btn);
list.appendChild(item);

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
