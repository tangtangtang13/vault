export function db(){
  return new Promise(res=>{
    const r=indexedDB.open("vault",1);
    r.onupgradeneeded=e=>{
      const db=e.target.result;
      db.createObjectStore("items",{keyPath:"id",autoIncrement:true});
      db.createObjectStore("trash",{keyPath:"id",autoIncrement:true});
    };
    r.onsuccess=e=>res(e.target.result);
  });
}
