export default function isAllX(array) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] != "X") return false;
  }
  return true;
}
