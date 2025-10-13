'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import AuthFooter from '@/components/layout/authFooter';
import { CommonButton } from '@/components/ui/CommonButton';
import CommonInput from '@/components/ui/CommonInput';
import Tooltip from '@/components/ui/Tooltip';
import { useTheme } from '@/context/ThemeContext';

export default function ResetPasswordPage() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const { theme } = useTheme();
  const router = useRouter();
  const validateForm = () => {
    let valid = true;

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      valid = false;
    } else {
      setPasswordError('');
    }

    if (!confirmPassword) {
      setConfirmPasswordError('Please confirm your password');
      valid = false;
    } else if (confirmPassword !== password) {
      setConfirmPasswordError('Passwords do not match');
      valid = false;
    } else {
      setConfirmPasswordError('');
    }

    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    console.log('🔑 Reset password request with:', { password });
    router.push('/admin/auth/sign-in');
  };

  return (
    <div className="mx-auto flex h-[100vh] w-full max-w-[1440px] flex-col px-4">
      <div className="flex w-full flex-wrap justify-between px-6 py-6 sm:px-8">
        <Image
          src={theme === 'dark' ? '/images/logo-dark.webp' : '/images/logo.svg'}
          alt="Rumor Logo"
          height={10}
          width={128}
          className="h-10 max-w-[128px] sm:h-12"
        />
        {/* <ThemeSwitcher /> */}
      </div>

      <div className="mx-auto flex w-full flex-1 flex-col items-center justify-center lg:flex-row">
        <div className="flex w-full flex-1 justify-center lg:w-[60%]">
          <div className="scrollbar-hidden h-full w-full overflow-y-auto px-6 pb-12 sm:max-w-[80%] sm:px-8 lg:h-[calc(100vh-120px)]">
            <div className="flex min-h-full flex-col justify-center">
              <h2 className="lxl:leading-[60px] mb-4 font-romie text-[24px] font-bold text-ui-textPrimaryColor sm:text-[36px] xl:text-[52px]">
                Pick a new <br /> password
              </h2>

              <p className="mb-8 pt-2 font-diatype text-base leading-relaxed text-ui-neutralContentBody sm:mb-12 sm:text-lg">
                To secure your account, please create a password.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-1.5">
                  <CommonInput
                    label="Password"
                    id="password"
                    floatingLabel
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={e => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    error={!!passwordError}
                    errorMessage={passwordError}
                  />
                  <Tooltip
                    trigger={
                      <Image
                        src="/images/info-circle.svg"
                        width={18}
                        height={18}
                        alt="Info Icon"
                      />
                    }
                    direction="left"
                    width="w-[300px] 2xl:w-[420px]"
                    content={
                      <div className="space-y-2 text-sm text-white">
                        <p>
                          Please ensure your new password meets the following
                          criteria:
                        </p>
                        <ul className="list-disc space-y-1 pl-5">
                          <li>At least 8 characters long</li>
                          <li>Includes at least 1 number</li>
                          <li>Contains at least 1 uppercase letter</li>
                          <li>Contains at least 1 lowercase letter</li>
                          <li>Includes at least 1 special character</li>
                        </ul>
                      </div>
                    }
                  />
                </div>
                <div className="pr-5">
                  <CommonInput
                    label="Confirm Password"
                    id="confirmPassword"
                    floatingLabel
                    type="password"
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={e => {
                      setConfirmPassword(e.target.value);
                      setConfirmPasswordError('');
                    }}
                    error={!!confirmPasswordError}
                    errorMessage={confirmPasswordError}
                  />
                </div>
                <CommonButton
                  onClick={handleSubmit}
                  className="mt-8 w-full py-4 font-diatype"
                >
                  Save and log in
                </CommonButton>
              </div>
            </div>
          </div>
        </div>

        <div className="hidden w-full max-w-[543px] px-4 lg:block lg:w-[40%] lg:px-8">
          {/* <Image
            src="/images/new-password.png"
            alt="Person using vintage telephone"
            width={1000}
            height={1000}
            className="h-64 w-full rounded-[20px] object-cover sm:h-80 lg:h-[calc(100vh-120px)]"
            onError={e => {
              e.currentTarget.src = '/images/fallback.png';
            }}
          /> */}
        </div>
      </div>
      <div className="absolute bottom-0 left-0 z-[1] flex h-[22vh] w-[30vw] max-w-[280px] items-end justify-start xl:h-[26vh] xl:w-[20vw] 2xl:h-[28vh] 2xl:w-[28vw]">
        <div
          className="absolute inset-0 hidden bg-contain bg-left bg-no-repeat 2xl:block"
          style={{ backgroundImage: "url('/images/bg-logo.svg')" }}
        ></div>
        <div className="relative">
          <AuthFooter />
        </div>
      </div>
    </div>
  );
}
