async function loginWithBiometric(){
  if(!window.PublicKeyCredential){
    alert("อุปกรณ์ไม่รองรับ Face ID");
    return;
  }
  try{
    await navigator.credentials.get({
      publicKey:{
        challenge:new Uint8Array(32),
        userVerification:"required",
        timeout:60000
      }
    });
    sessionStorage.setItem("auth","ok");
    location.replace("dashboard.html");
  }catch(e){
    alert("Face ID ไม่ผ่าน");
  }
}
