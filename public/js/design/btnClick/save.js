import { reminder } from "../../HDL/generatorUtils/generatorUtils.js";
import { renderDataList } from "../../account/verifyToken.js";

export default async function save() {
  if (reminder()) return;

  const data = localStorage.getItem("data");
  if (!data) return;

  try {
    const res = await $.ajax({
      type: "POST",
      url: "/save",
      dataType: "json",
      data: {
        data,
      },
    });

    console.log(res);
    renderDataList(data);
  } catch (err) {}
}
