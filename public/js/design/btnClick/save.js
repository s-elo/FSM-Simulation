import { reminder } from "../../HDL/generatorUtils/generatorUtils.js";
import { renderDataList } from "../../account/verifyToken.js";
import saveFSM from "../../account/data/saveFSM.js";

export default async function save() {
  if (reminder()) return;

  const data = localStorage.getItem("data");
  if (!data) return;

  try {
    const res = await saveFSM(data);

    console.log(res);
    renderDataList(data);
  } catch (err) {}
}
