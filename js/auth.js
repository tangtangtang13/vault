const MASTER_PASSWORD = "030646";

function login(){
  const pass = document.getElementById("password").value;
  if(pass === MASTER_PASSWORD){
    sessionStorage.setItem("auth","ok");
    sessionStorage.setItem("key", pass);
    location.replace("app.html");
  }else{
    document.getElementById("error").innerText = "รหัสไม่ถูกต้อง";
  }
}
