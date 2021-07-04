export default async function deleteFSM(entityName) {
  await $.ajax({
    url: "/delete",
    type: "POST",
    dataType: "json",
    data: {
      entityName,
    },
  });
}
