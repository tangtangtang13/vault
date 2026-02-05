const type = localStorage.getItem("vaultType");

// 🔐 ตัวอย่างข้อมูล (แก้ตรงนี้เป็นของสตางค์)
const vaultData = {
  rov: [
    { name:"ROV หลัก", user:"rov_id_1", pass:"rov_pass_1" },
    { name:"ROV สำรอง", user:"rov_id_2", pass:"rov_pass_2" }
  ],
  facebook: [
    { name:"Facebook ส่วนตัว", user:"fb@mail.com", pass:"fbpass1" },
    { name:"Facebook ทำงาน", user:"fb2@mail.com", pass:"fbpass2" }
  ],
  google: [
    { name:"Gmail หลัก", user:"gmail1", pass:"gpass1" }
  ]
};

document.getElementById("title").innerText = type.toUpperCase();

const list = document.getElementById("list");

vaultData[type].forEach((acc,i)=>{
  const div = document.createElement("div");
  div.className = "item";

  div.innerHTML = `
    <div class="item-title">${acc.name}</div>

    <div class="row">
      <span>ID: ${acc.user}</span>
      <button onclick="copy('${acc.user}')">📋</button>
    </div>

    <div class="row">
      <span id="p${i}">Password: ******</span>
      <div>
        <button onclick="toggle(${i},'${acc.pass}')">👁</button>
        <button onclick="copy('${acc.pass}')">📋</button>
      </div>
    </div>
  `;

  list.appendChild(div);
});

function toggle(i,pass){
  const el = document.getElementById("p"+i);
  el.innerText =
    el.innerText.includes("*")
    ? "Password: " + pass
    : "Password: ******";
}

function copy(text){
  navigator.clipboard.writeText(text);
  alert("คัดลอกแล้ว");
}
