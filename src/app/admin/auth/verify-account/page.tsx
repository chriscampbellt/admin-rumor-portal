'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import AuthFooter from '@/components/layout/authFooter';
import { CommonButton } from '@/components/ui/CommonButton';
import OneTimePassword from '@/components/ui/OTPInput';
import { useTheme } from '@/context/ThemeContext';

const RESEND_INTERVAL = 60; // seconds

export default function VerifyAccount() {
  const [otp, setOtp] = useState('');
  const [timer, setTimer] = useState(RESEND_INTERVAL);
  const [mounted, setMounted] = useState(false);

  const router = useRouter();
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (timer <= 0) return;
    const interval = setInterval(() => setTimer(prev => prev - 1), 1000);
    return () => clearInterval(interval);
  }, [timer]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleResend = () => {
    console.log('🔁 Resend OTP');
    setTimer(RESEND_INTERVAL);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    console.log('🔑 Submitted OTP:', otp);
  };

  if (!mounted) return null;

  return (
    <div className="mx-auto flex h-[100vh] w-full max-w-[1440px] flex-col px-4">
      <div className="flex w-full flex-wrap justify-between px-6 py-6 sm:px-8">
        <Image
          src={theme === 'dark' ? '/images/logo-dark.webp' : '/images/logo.svg'}
          alt="Rumor Logo"
          height={40}
          width={128}
          className="h-10 max-w-[128px] sm:h-12"
          priority
        />
        <div className="flex max-w-[400px] flex-wrap items-center gap-4 sm:flex-nowrap">
          {/* <ThemeSwitcher /> */}
        </div>
      </div>

      <div className="mx-auto flex w-full flex-1 flex-col items-center justify-center lg:flex-row">
        <div className="flex w-full flex-1 justify-center lg:w-[60%]">
          <div className="scrollbar-hidden h-full w-full overflow-y-auto px-6 pb-12 sm:max-w-[80%] sm:px-8 lg:h-[calc(100vh-120px)]">
            <div className="flex min-h-full flex-col justify-center">
              <h2 className="mb-4 font-romie text-[24px] font-bold text-ui-textPrimaryColor sm:text-[36px] xl:text-[52px]">
                Verification Code
              </h2>
              <p className="mb-8 font-diatype text-base leading-relaxed text-ui-neutralContentBody sm:mb-12 sm:text-lg">
                We sent a verification code to email@domain.com.
              </p>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <OneTimePassword
                  className="flex gap-[8px] min-[1440px]:pt-1"
                  onChange={setOtp}
                  error={otp.length > 0 && otp.length < 4}
                />

                <div className="flex items-center justify-between font-diatype">
                  <div className="text-sm font-normal text-ui-neutralSurfaceOnColor">
                    Didn&apos;t get a code?{' '}
                    <button
                      type="button"
                      disabled={timer > 0}
                      onClick={handleResend}
                      className={`ml-1 cursor-pointer rounded-full border border-ui-neutralSurfaceOnColor px-2 py-1 font-bold ${
                        timer > 0
                          ? 'border-ui-neutralContentBody text-ui-neutralContentBody'
                          : 'text-ui-neutralSurfaceOnColor'
                      }`}
                    >
                      Resend
                    </button>
                  </div>
                  <div className="font-bold text-ui-bgBlur min-[1440px]:py-1">
                    {formatTime(timer)}
                  </div>
                </div>

                <CommonButton
                  type="submit"
                  onClick={() => router.push('/admin/auth/new-password')}
                  className="mt-8 w-full py-4 font-diatype"
                >
                  Verify
                </CommonButton>
              </form>
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
