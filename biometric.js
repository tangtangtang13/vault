export async function enableBio() {
  if (!window.PublicKeyCredential) return alert("ไม่รองรับ");
  await navigator.credentials.create({
    publicKey: {
      challenge: crypto.getRandomValues(new Uint8Array(32)),
      rp:{name:"Vault"},
      user:{id:new Uint8Array(16),name:"user",displayName:"user"},
      pubKeyCredParams:[{type:"public-key",alg:-7}],
      authenticatorSelection:{userVerification:"required"}
    }
  });
  alert("Biometric ready");
}
