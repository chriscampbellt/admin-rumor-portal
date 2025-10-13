'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import AuthFooter from '@/components/layout/authFooter';
import { CommonButton } from '@/components/ui/CommonButton';
import CommonInput from '@/components/ui/CommonInput';
import { useTheme } from '@/context/ThemeContext';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  const { theme } = useTheme();

  useEffect(() => setMounted(true), []);

  const validateForm = () => {
    let valid = true;

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Please provide a valid email address');
      valid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    } else {
      setPasswordError('');
    }

    return valid;
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!validateForm()) return;
    console.log('🔑 Sign in attempt:', { email, password });
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
                Sign in
              </h2>

              <form className="space-y-6" onSubmit={handleSubmit}>
                <CommonInput
                  label="Email"
                  id="email"
                  floatingLabel
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

                <CommonInput
                  label="Password"
                  type="password"
                  floatingLabel
                  placeholder="••••••••"
                  value={password}
                  onChange={e => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  error={!!passwordError}
                  errorMessage={passwordError}
                />

                <CommonButton
                  type="submit"
                  className="mt-8 w-full py-4 font-diatype"
                  onClick={() => router.push('/admin/dashboard')}
                >
                  Enter
                </CommonButton>
                <div className="relative z-10 flex items-center justify-between text-sm">
                  <a
                    href="/admin/auth/reset-password"
                    className="font-diatype text-ui-neutralContentBody hover:underline"
                  >
                    Forgot Password?
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div className="hidden w-full max-w-[543px] px-4 lg:block lg:w-[40%] lg:px-8">
          {/* <Image
            src="/images/sign-in.jpg"
            alt="People in a warm, social atmosphere"
            width={543}
            height={720}
            className="h-64 w-full rounded-[20px] object-cover sm:h-80 lg:h-[calc(100vh-120px)]"
            onError={e => {
              e.currentTarget.src = '/images/sign-in.jpg';
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
