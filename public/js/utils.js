export function eleToString(ele) {
  let tmpNode = document.createElement("g");

  let newNode = ele.cloneNode(true);

  tmpNode.appendChild(newNode);

  let str = tmpNode.innerHTML;

  tmpNode = newNode = null;

  return str;
}

//Decimal to binary
export function decToBinary(dec, binaryLen) {
  let str = "";
  let restr = [];
  let reverse = "";

  for (let i = 0; i < binaryLen; i++) {
    str = str + (dec % 2);
    dec = parseInt(dec / 2);
  }

  if (str.length > 0) {
    restr = str.split("").reverse().join("");
  }
  for (let i = 0; i < str.length; i++) {
    reverse = reverse + restr[i];
  }
  return reverse;
}

//add one new HTML between a specified positon by id
export function addHtmlById(id, pos, content) {
  let Code = document.getElementById(id);
  Code.insertAdjacentHTML(pos, content);
}

/*createElem("circle", {'cx':'500', 'cy':'500', 'r':'50'})
 *JSON format*/
export function createElem(tag, objAttr) {
  let elem = document.createElementNS(svgNS, tag);
  for (let attr in objAttr) {
    elem.setAttribute(attr, objAttr[attr]);
  }
  return elem;
}

export function getElementLeft(element) {
  let actualLeft = element.offsetLeft;
  let current = element.offsetParent;
  while (current != null) {
    actualLeft = actualLeft + current.offsetLeft;
    current = current.offsetParent;
  }
  return actualLeft;
}

export function getElementTop(element) {
  let actualTop = element.offsetTop;
  let current = element.offsetParent;
  while (current != null) {
    actualTop = actualTop + current.offsetTop;
    current = current.offsetParent;
  }
  return actualTop;
}

export const Loading = {
  loading: document.querySelector("#loading"),

  show() {
    this.loading.classList.add("loading");
  },

  hide() {
    this.loading.classList.remove("loading");
  },
};
