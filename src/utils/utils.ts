export function isObjEmpty(obj: Object): obj is {} {
  for (let i in obj) return false;
  return true;
}
