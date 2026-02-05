export async function deriveKey(pw,salt){
  const base=await crypto.subtle.importKey(
    "raw",new TextEncoder().encode(pw),
    "PBKDF2",false,["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {name:"PBKDF2",salt,iterations:200000,hash:"SHA-256"},
    base,{name:"AES-GCM",length:256},false,["encrypt","decrypt"]
  );
}
export async function encrypt(txt,key){
  const iv=crypto.getRandomValues(new Uint8Array(12));
  const data=await crypto.subtle.encrypt(
    {name:"AES-GCM",iv},key,new TextEncoder().encode(txt)
  );
  return {data,iv};
}
export async function decrypt(data,iv,key){
  const res=await crypto.subtle.decrypt(
    {name:"AES-GCM",iv},key,data
  );
  return new TextDecoder().decode(res);
}
