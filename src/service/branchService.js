import ApiService from "./apiService";

export async function getAllBranches() {
  const apiObject = {};
  apiObject.method = "GET",
  apiObject.authentication = true,
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = `api/store-locator/find-all`;
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}

