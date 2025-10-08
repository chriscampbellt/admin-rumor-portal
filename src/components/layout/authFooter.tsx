'use client';

import Image from 'next/image';
import Link from 'next/link';

const AuthFooter: React.FC = () => {
  return (
    <footer className="relative z-10 py-6 pl-6 text-ui-neutralContentBody md:pl-10">
      <div className="mx-auto flex flex-col gap-4 font-diatype sm:flex-row sm:items-center">
        <div className="whitespace-nowrap text-sm">&copy; 2025 Rumor</div>

        <div className="flex items-center gap-4 text-sm">
          <Link href="" className="whitespace-nowrap hover:underline">
            Privacy Policy
          </Link>
          <div className="flex items-center gap-4">
            <Link href="" className="whitespace-nowrap hover:underline">
              Terms of Service
            </Link>
            <Image
              src="/images/Instagram.svg"
              alt="Instagram"
              width={20}
              height={20}
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AuthFooter;
