const KEY="vault_note";

function save(){
  const t=document.getElementById("text").value;
  localStorage.setItem(KEY,t);
  load();
}
function load(){
  const t=localStorage.getItem(KEY)||"";
  document.getElementById("text").value=t;
  document.getElementById("view").innerText=t;
}
load();
