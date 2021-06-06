import design from "./design/index.js";
import HDL from "./HDL/index.js";
import accountInit from "./account/accountInit.js";

import "../css/design.css";
import "../css/code.css";

console.log("call");
accountInit();

design();

HDL();
