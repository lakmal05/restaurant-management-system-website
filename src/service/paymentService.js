import ApiService from "./apiService";

export async function makeAdvancePayment(data) {
  const apiObject = {};
  apiObject.method = "POST",
  apiObject.authentication = true,
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = `api/payment/advance-payment/create`;
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}

