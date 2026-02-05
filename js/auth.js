const MASTER_PASSWORD = "030646";

function login(){
  const pass = document.getElementById("password").value;

  if(pass === MASTER_PASSWORD){
    sessionStorage.setItem("auth","ok");
    location.replace("dashboard.html");
  }else{
    document.getElementById("error").innerText = "รหัสผ่านไม่ถูกต้อง";
  }
}
