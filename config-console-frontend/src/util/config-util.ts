
// Utility function for deep cloning: for arrays and nested objects
export default function deepClone(obj: Object) {
  return JSON.parse(JSON.stringify(obj))
}


