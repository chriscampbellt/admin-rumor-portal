import api from '@/lib/axios';

export interface LoginPayload {
  email: string;
  password: string;
}

export interface ForgetPasswordPayload {
  email: string;
}

export interface VerifyOtpPayload {
  otpCode: number;
  userId: string;
}

export interface CreateNewPasswordPayload {
  newPassword: string;
  confirmPassword: string;
}

export const loginService = (data: LoginPayload) =>
  api.post('/auth/signIn', data);
export const forgotPasswordService = (data: ForgetPasswordPayload) =>
  api.post('/auth/forgetPassword', data);
export const verifyOtpService = (data: VerifyOtpPayload) =>
  api.post('/auth/verifyOtp', data);
export const createNewPasswordService = (
  data: CreateNewPasswordPayload,
  token?: string
) =>
  api.patch('/auth/resetPassword', data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const logoutService = () => api.post('/auth/logout');
