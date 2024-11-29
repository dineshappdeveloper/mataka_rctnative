class AppUrl {
  static baseUrl = 'https://development.smapidev.co.in/api/Api';

  static signupApi = `${AppUrl.baseUrl}/signup`;
  static verifyUserApi = `${AppUrl.baseUrl}/verify_user`;
  static resendOTPApi = `${AppUrl.baseUrl}/resend_otp`;
  static loginApi = `${AppUrl.baseUrl}/login`;
  static loginPinApi = `${AppUrl.baseUrl}/login_pin`;
  static forgotPasswordApi = `${AppUrl.baseUrl}/forgot_password`;
  static verifyOTPForgotPasswordApi = `${AppUrl.baseUrl}/verify_otp`;
  static createPasswordApi = `${AppUrl.baseUrl}/forgot_password_verify`;
  static getProfileApi = `${AppUrl.baseUrl}/get_user_details`;
  static gameListApi = `${AppUrl.baseUrl}/main_game_list`;
  static appDetailsApi = `${AppUrl.baseUrl}/app_details`;
}

export default AppUrl;
