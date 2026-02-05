function encrypt(text, key){
  return btoa([...text].map((c,i)=>
    String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i%key.length))
  ).join(""));
}
function decrypt(data, key){
  const text = atob(data);
  return [...text].map((c,i)=>
    String.fromCharCode(c.charCodeAt(0) ^ key.charCodeAt(i%key.length))
  ).join("");
}
