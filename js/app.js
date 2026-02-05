const key = sessionStorage.getItem("key");
const STORE = "vault_data";

function getData(){
  const raw = localStorage.getItem(STORE);
  if(!raw) return [];
  return JSON.parse(decrypt(raw,key));
}

function saveData(data){
  localStorage.setItem(STORE, encrypt(JSON.stringify(data),key));
}

function addItem(){
  const name = prompt("ชื่อ (เช่น Facebook / ROV)");
  const value = prompt("รหัส / ข้อมูล");
  if(!name || !value) return;
  const data = getData();
  data.push({name,value});
  saveData(data);
  render();
}

function copy(text){
  navigator.clipboard.writeText(text);
  alert("คัดลอกแล้ว");
}

function render(){
  const q = document.getElementById("search").value.toLowerCase();
  const data = getData().filter(i=>i.name.toLowerCase().includes(q));
  const box = document.getElementById("list");
  box.innerHTML="";
  data.forEach(i=>{
    box.innerHTML += `
      <div class="item">
        <b>${i.name}</b>
        <button onclick="copy('${i.value}')">📋 คัดลอก</button>
      </div>`;
  });
}

function logout(){
  sessionStorage.clear();
  location.replace("index.html");
}

render();
