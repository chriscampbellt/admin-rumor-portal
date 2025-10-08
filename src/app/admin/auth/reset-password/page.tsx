'use client';

import { useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import AuthFooter from '@/components/layout/authFooter';
import { CommonButton } from '@/components/ui/CommonButton';
import CommonInput from '@/components/ui/CommonInput';
import { useTheme } from '@/context/ThemeContext';

export default function ResetPasswordPage() {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();
  const { theme } = useTheme();

  const validateForm = () => {
    let valid = true;

    if (!email) {
      setEmailError(
        `The email you provided is not in a valid format. Please ensure it includes an '@' symbol and a domain, such as example@domain.com.`
      );
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(
        'Please provide a valid email address (e.g., example@domain.com)'
      );
      valid = false;
    } else {
      setEmailError('');
    }

    return valid;
  };

  const handleSubmit = () => {
    if (!validateForm()) return;
    console.log('🔑 Reset password request for:', email);
    setSubmitted(true); // switch to confirmation state
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

      {/* Content */}
      <div className="mx-auto flex w-full flex-1 flex-col items-center justify-center lg:flex-row">
        <div className="flex w-full flex-1 justify-center lg:w-[60%]">
          <div className="scrollbar-hidden h-full w-full overflow-y-auto px-6 pb-12 sm:max-w-[80%] sm:px-8 lg:h-[calc(100vh-120px)]">
            <div className="flex min-h-full flex-col justify-center">
              {!submitted ? (
                <>
                  <h2 className="mb-4 font-romie text-[24px] font-bold text-ui-textPrimaryColor sm:text-[36px] xl:text-[52px]">
                    Reset Password
                  </h2>
                  <p className="mb-10 font-diatype text-base leading-relaxed text-ui-neutralContentBody sm:mb-12 sm:text-lg">
                    Enter your email, and we&apos;ll send a secure link to reset
                    your password.
                  </p>
                  <div className="space-y-6">
                    <CommonInput
                      label="Email"
                      floatingLabel
                      id="email"
                      type="email"
                      placeholder="example@gmail.com"
                      value={email}
                      onChange={e => {
                        setEmail(e.target.value);
                        setEmailError('');
                      }}
                      error={!!emailError}
                      errorMessage={emailError}
                    />

                    <CommonButton
                      onClick={handleSubmit}
                      className="mt-8 w-full py-4 font-diatype"
                    >
                      Send Reset Link
                    </CommonButton>
                  </div>
                </>
              ) : (
                <>
                  <h2 className="mb-4 font-romie text-[24px] font-bold sm:text-[36px] xl:text-[52px]">
                    Check your inbox
                  </h2>
                  <p className="mb-4 font-diatype text-base leading-relaxed text-ui-neutralContentBody sm:text-lg">
                    We&apos;ve sent a secure reset link to <b>{email}</b>.{' '}
                    <br />
                    If you don&apos;t see it in your inbox, check your spam or
                    junk <br /> folder.
                  </p>

                  <CommonButton
                    onClick={() => router.push('/admin/auth/verify-account')}
                    className="w-full rounded-full py-4 font-diatype"
                  >
                    Continue
                  </CommonButton>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="hidden w-full max-w-[543px] px-4 lg:block lg:w-[40%] lg:px-8">
          <Image
            src="/images/sign-in.jpg"
            alt="People in a warm, social atmosphere"
            width={543}
            height={720}
            className="h-64 w-full rounded-[20px] object-cover sm:h-80 lg:h-[calc(100vh-120px)]"
            onError={e => {
              e.currentTarget.src = '/images/sign-in.jpg';
            }}
          />
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
