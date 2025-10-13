'use client';

import { useEffect, useRef } from 'react';

import Image from 'next/image';

import { ExternalLink, Heart, MapPin, User2Icon } from 'lucide-react';

interface ProfileDropdownProps {
  name: string;
  roles: string[];
  age: string;
  location: string;
  interests: string[];
  avatar: string;
  isOpen: boolean;
  onClose: () => void;
}

const ProfileDropdown = ({
  name,
  roles,
  age,
  location,
  interests,
  avatar,
  isOpen,
  onClose,
}: ProfileDropdownProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  const socialLinks = [
    { img: '/images/Logos.png', alt: 'Instagram', active: true },
    { img: '/images/Logos1.svg', alt: 'Twitter', active: true },
    { img: '/images/Logos2.svg', alt: 'Music', active: true },
    { img: '/images/Logos3.svg', alt: 'Facebook', active: true },
    { img: '/images/Logos4.svg', alt: 'LinkedIn', active: true },
    { img: '/images/Logos5.svg', alt: 'YouTube', active: true },
    { img: '/images/Logos3.svg', alt: 'Facebook', active: true },
  ];

  return (
    <div
      ref={dropdownRef}
      className={`origin-top-right rounded-2xl border border-ui-neutralBorderComponent bg-ui-neutralBorderComponent font-diatype shadow-2xl transition-all duration-300 sm:w-[370px] ${
        isOpen
          ? 'translate-x-0 scale-100 opacity-100'
          : 'translate-x-full scale-95 opacity-0'
      }`}
    >
      <div className="relative py-8 pb-4">
        <div className="absolute right-4 top-4 rounded-full border border-ui-neutralBorderComponent bg-white p-2 text-sm text-white">
          <Image
            src="/images/user-check-01.svg"
            alt="User Check"
            width={16}
            height={16}
          />
        </div>
        <div className="mb-6 flex justify-center">
          <div>
            <Image
              src={avatar}
              width={64}
              height={64}
              className="ml-3.5 rounded-full object-center text-center"
              alt={name}
            />
            <div className="absolute left-1/2 top-[74px] ml-1 flex w-fit -translate-x-1/2 items-center space-x-1 rounded-full bg-black px-2.5 py-[5px] text-sm font-medium text-white">
              <Image
                src="/images/check-verified-02.svg"
                width={17}
                height={17}
                alt="Entertainment Logo"
              />
              <span>Member</span>
            </div>
          </div>
        </div>

        <div className="text-center font-diatype">
          <h2 className="text-[32px] font-medium text-ui-neutralSurfaceOnColor">
            {name}
          </h2>
          <div className="mb-3 flex justify-center space-x-2 text-sm text-ui-neutralSurfaceOnColor">
            {roles.map((role, i) => (
              <span
                className="rounded-full border border-ui-neutralBorderComponent bg-white px-2 py-0.5 text-sm"
                key={i}
              >
                {role}
              </span>
            ))}
          </div>
        </div>
        <div
          className="my-4 h-[1px] w-full font-diatype"
          style={{
            background:
              'linear-gradient(to right, #E1E1E1 0%, #D4D4D4 50%, #E1E1E1 100%)',
          }}
        ></div>
        <div className="space-y-1.5 text-sm font-medium text-ui-neutralSurfaceOnColor">
          <div className="flex items-center justify-center space-x-1">
            <User2Icon className="h-4 w-4 text-ui-neuteralSurfaceSecondary" />
            <span>{age}</span>
          </div>
          <div className="flex items-center justify-center space-x-1">
            <MapPin className="h-4 w-4 text-ui-neuteralSurfaceSecondary" />
            <span>{location}</span>
          </div>
        </div>

        <div
          className="my-4 h-[1px] w-full font-diatype"
          style={{
            background:
              'linear-gradient(to right, #E1E1E1 0%, #D4D4D4 50%, #E1E1E1 100%)',
          }}
        ></div>
        <div className="mt-4 flex flex-wrap items-center justify-center gap-2">
          {socialLinks.map((link, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-full bg-white px-1.5 py-0.5 shadow-sm"
            >
              <button className="flex h-7 w-7 items-center justify-center rounded-full bg-ui-neutralSurfaceBackground transition hover:bg-ui-neutralSurfaceBackground/80">
                <Image
                  src={link.img}
                  alt={link.alt}
                  width={18}
                  height={18}
                  className="object-contain"
                  unoptimized
                />
              </button>

              <span className="w-6 text-sm text-ui-neutralSurfaceOnColor">
                —
              </span>
            </div>
          ))}
        </div>
      </div>
      <div
        className="my-4 h-[1px] w-full font-diatype"
        style={{
          background:
            'linear-gradient(to right, #E1E1E1 0%, #D4D4D4 50%, #E1E1E1 100%)',
        }}
      ></div>
      <div className="mt-4 flex flex-wrap justify-center gap-2">
        {interests.map((interest, i) => (
          <span
            key={i}
            className="cursor-pointer rounded-full bg-white px-2 py-1 text-sm text-ui-neutralSurfaceOnColor"
          >
            {interest}
          </span>
        ))}
      </div>
      <div
        className="my-4 h-[1px] w-full font-diatype"
        style={{
          background:
            'linear-gradient(to right, #E1E1E1 0%, #D4D4D4 50%, #E1E1E1 100%)',
        }}
      ></div>
      <div>
        <p className="text-center text-sm text-ui-neutralSurfaceOnColor">
          Added by
        </p>
        <div className="mx-auto my-2 flex w-32 cursor-pointer items-center gap-2 rounded-full bg-white px-2 py-1 text-sm text-ui-neutralSurfaceOnColor">
          <div className="flex h-8 w-8 justify-center rounded-full bg-black p-1.5">
            <Image
              src="/images/figma-1 1.svg"
              width={17}
              height={17}
              alt="Entertainment Logo"
            />
          </div>
          <p className="text-center text-sm text-ui-neutralSurfaceOnColor">
            Username{' '}
          </p>
        </div>
      </div>
      <div className="flex space-x-2 rounded-b-2xl border-t border-ui-neutralBorderComponent bg-white p-3">
        <button className="flex flex-1 items-center justify-center space-x-2 rounded-full border px-4 py-2 hover:bg-gray-50">
          <Heart className="h-4 w-4 text-ui-neutralSurfaceOnColor" />
          <span className="font-medium text-ui-neutralSurfaceOnColor">
            Favorite
          </span>
        </button>
        <button className="flex flex-1 items-center justify-center space-x-2 rounded-full border px-4 py-2 hover:bg-gray-50">
          <ExternalLink className="h-4 w-4 text-ui-neutralSurfaceOnColor" />
          <span className="font-medium text-ui-neutralSurfaceOnColor">
            Profile
          </span>
        </button>
      </div>
    </div>
  );
};

export default ProfileDropdown;
