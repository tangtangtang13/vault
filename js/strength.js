export function strength(p){
  let s=0;
  if(p.length>8)s++;
  if(/[A-Z]/.test(p))s++;
  if(/[0-9]/.test(p))s++;
  if(/[^A-Za-z0-9]/.test(p))s++;
  return ["Weak","OK","Good","Strong"][s];
}
