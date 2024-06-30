export default function createServingApiResponse(
  configParametersDocuments,
  countryParam
) {
  let result = {};

  if (countryParam != "default") {
    result["country"] = countryParam;
  }
  configParametersDocuments.forEach((document) => {
    const data = document.data();
    console.log("Data:", data);

    const filteredValue = filterByValueTag(data, countryParam);
    if (filteredValue.length > 0) {
      result[data.key] = filteredValue[0];
    }
  });
  return result;
}

function filterByValueTag(data, tag) {
  let filtered = data.value.filter((item) => item.value_tag === tag);
  if (filtered.length == 0) {
    filtered = data.value.filter((item) => item.value_tag === "default");
  }
  return filtered.map((item) => item.value);
}
