type anyObject = Record<string, unknown>;
type emptyObject = Record<string, unknown>;

export function isObjEmpty(obj: anyObject): obj is emptyObject {
  for (const i in obj) return false;
  return true;
}
