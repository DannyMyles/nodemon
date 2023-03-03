export function isSubarray(array: string[], subArray: string[]): boolean {
  return subArray.every((el) => array.includes(el));
}
