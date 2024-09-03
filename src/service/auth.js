import ApiService from "./apiService";

export async function loginService(userCredentials) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.urlencoded = false;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = "api/auth/login/email/CUSTOMER";
  apiObject.body = userCredentials;
  return await ApiService.callApi(apiObject);
}

export async function createAccount(userCredentials) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = false;
  apiObject.urlencoded = false;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = "api/customer/auth/register";
  apiObject.body = userCredentials;
  return await ApiService.callApi(apiObject);
}

export async function resetPasswordConfirmEmail(data) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = "api/password-reset-request";
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}

export async function resetPasswordDetailsWithOtp(data) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = "api/password/check-otp-for-reset";
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}

//------------------------------------------------------------------------------

export async function changeFirstTimePassword(data) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.endpoint = "reset-default-password";
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}

export async function renewToken(token) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.urlencoded = false;
  apiObject.endpoint = "auth/refresh";
  apiObject.body = token;
  apiObject.state = "refresh_token";
  return await ApiService.callApi(apiObject);
}

export async function verifyOtp(data) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.endpoint = "forgot-password/verify-otp";
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}

export async function requestOTP(email) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.urlencoded = false;
  apiObject.endpoint = "forgot-password/request-otp";
  apiObject.body = email;
  return await ApiService.callApi(apiObject);
}

export async function resetPasswordInProfile(data) {
  const apiObject = {};
  apiObject.method = "PATCH";
  apiObject.authentication = true;
  apiObject.urlencoded = false;
  apiObject.endpoint = "api/auth/me";
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}

export async function resetPassword(data) {
  const apiObject = {};
  apiObject.method = "POST";
  apiObject.authentication = true;
  apiObject.urlencoded = false;
  apiObject.endpoint = "api/auth/staff/reset/password";
  apiObject.body = data;
  return await ApiService.callApi(apiObject);
}

//------------------

export async function getCsrfToken() {
  const apiObject = {};
  apiObject.method = "GET";
  apiObject.authentication = false;
  apiObject.isWithoutPrefix = false;
  apiObject.endpoint = "api/auth/csrf-token";
  apiObject.body = null;
  return await ApiService.callApi(apiObject);
}
