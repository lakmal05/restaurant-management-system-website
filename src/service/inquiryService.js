import ApiService from "./apiService";

export async function sendInquiry(data) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = "api/inquirie/submit";
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}
