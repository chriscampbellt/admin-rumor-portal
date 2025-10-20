import { useMutation } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';

import {
  ForgetPasswordPayload,
  LoginPayload,
  VerifyOtpPayload,
  createNewPasswordService,
  forgotPasswordService,
  loginService,
  logoutService,
  verifyOtpService,
} from '@/services/authService';

import { useAuthStore } from '../store/authStore';

interface User {
  id: string;
  email: string;
  fullName?: string;
  role?: string;
}

interface LoginResponse {
  data: {
    user: User;
    accessToken: string;
  };
}

interface ApiError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message: string;
}

export const useAuthMutations = () => {
  const { setUser, setToken, logout } = useAuthStore();

  const loginMutation = useMutation<LoginResponse, ApiError, LoginPayload>({
    mutationFn: data => loginService(data),
    onSuccess: response => {
      const { user, accessToken } = response.data;
      if (user && accessToken) {
        setUser(user);
        setToken(accessToken);
      }
    },
    onError: error => {
      console.error(
        'Login failed:',
        error.response?.data?.message || error.message
      );
    },
  });

  const forgotPasswordMutation = useMutation<
    AxiosResponse,
    ApiError,
    ForgetPasswordPayload
  >({
    mutationFn: forgotPasswordService,
  });

  const verifyOtpMutation = useMutation<
    AxiosResponse,
    ApiError,
    VerifyOtpPayload
  >({
    mutationFn: verifyOtpService,
  });

  const createNewPasswordMutation = useMutation<
    AxiosResponse,
    ApiError,
    { newPassword: string; confirmPassword: string; token: string }
  >({
    mutationFn: ({ newPassword, confirmPassword, token }) =>
      createNewPasswordService({ newPassword, confirmPassword }, token),
  });

  const logoutMutation = useMutation<AxiosResponse, ApiError>({
    mutationFn: logoutService,
    onSuccess: () => logout(),
  });

  return {
    loginMutation,
    logoutMutation,
    forgotPasswordMutation,
    verifyOtpMutation,
    createNewPasswordMutation,
  };
};
