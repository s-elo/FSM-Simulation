export default async function getFSM(entityName) {
  try {
    const res = await $.ajax({
      url: `/getFSM?entityName=${entityName}`,
      dataType: "json",
      type: "GET",
    });

    return res.data;
  } catch (err) {
    console.log(err);
  }
}
