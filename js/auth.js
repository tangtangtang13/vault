const MASTER_PASSWORD = "030646"; // เปลี่ยนตรงนี้

function login(){
  const pass=document.getElementById("password").value;
  if(pass===MASTER_PASSWORD){
    sessionStorage.setItem("auth","ok");
    location.replace("dashboard.html");
  }else{
    document.getElementById("error").innerText="รหัสไม่ถูกต้อง";
  }
}
