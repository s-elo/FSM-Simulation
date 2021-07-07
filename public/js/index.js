import design from "./design/index.js";
import HDL from "./HDL/index.js";
import accountInit from "./account/accountInit.js";
import { Loading } from "./utils";

import "../css/design.css";
import "../css/code.css";

Loading.show();

accountInit();

design();

HDL();

Loading.hide();
