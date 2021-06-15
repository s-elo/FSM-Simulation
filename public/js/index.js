import design from "./design/index.js";
import HDL from "./HDL/index.js";
import accountInit from "./account/accountInit.js";

import "../css/design.css";
import "../css/code.css";

// if (module.hot) {
//     module.hot.accept("./design/index.js");
// }

console.log("call");
accountInit();

design();

HDL();
