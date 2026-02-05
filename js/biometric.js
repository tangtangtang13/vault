async function loginWithBiometric(){
  if(!window.PublicKeyCredential){
    alert("ไม่รองรับ Face ID");
    return;
  }
  try{
    await navigator.credentials.get({
      publicKey:{challenge:new Uint8Array(32),userVerification:"required"}
    });
    sessionStorage.setItem("auth","ok");
    sessionStorage.setItem("key", MASTER_PASSWORD);
    location.replace("app.html");
  }catch{}
}
