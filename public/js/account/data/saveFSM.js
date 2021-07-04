export default async function saveFSM(data) {
  const res = await $.ajax({
    type: "POST",
    url: "/save",
    dataType: "json",
    data: {
      data,
    },
  });

  return res;
}
