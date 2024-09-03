import ApiService from "./apiService";

export async function placeReservation(data) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = "api/reservation/create";
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}
export async function placeOrder(data) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = "api/order/create";
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}
