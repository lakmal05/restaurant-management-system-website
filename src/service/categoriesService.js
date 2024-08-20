import ApiService from "./apiService";

export async function getAllCategories() {
  const apiObject = {};
  (apiObject.method = "GET"),
    (apiObject.authentication = true),
    (apiObject.isWithoutPrefix = false);
  apiObject.endpoint = ``;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}

export async function getCategoriesFiltration(data) {
  const apiObject = {};
  (apiObject.method = "GET"),
    (apiObject.authentication = true),
    (apiObject.isWithoutPrefix = false);
  apiObject.endpoint = ``;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
