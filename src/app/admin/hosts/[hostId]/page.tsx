'use client';

import React, { useEffect, useRef, useState } from 'react';

import {
  ArrowRight,
  Calendar,
  ChevronDown,
  MoreHorizontal,
  User,
} from 'lucide-react';

import ApproveHostSelection from '@/components/ui/ApproveHostSelection';
import { CommonButton } from '@/components/ui/CommonButton';
import DeleteSelectedHost from '@/components/ui/DeleteSelectedHost';
import EditHostDetails from '@/components/ui/EditHostDetails';
import HostBio from '@/components/ui/HostBio';
import WaitlistDailog from '@/components/ui/WaitlistDailog';
import useToggle from '@/lib/useToggle';
import { cn } from '@/lib/utils';

type TabType = 'upcoming' | 'past' | 'pending';

export default function HostProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<TabType>('upcoming');
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);
  const hostBioDailog = useToggle(false);
  const approvalDailog = useToggle(false);
  const waitlistDailog = useToggle(false);
  const deleteHostDailog = useToggle(false);
  const editHostDailog = useToggle(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const deleteMenuRef = useRef<HTMLDivElement | null>(null);

  const tabs = [
    { id: 'upcoming', label: 'Upcoming', count: 33, activeColor: '#A4887E' },
    { id: 'past', label: 'Past', count: 33, activeColor: '#A4887E' },
    { id: 'pending', label: 'Pending', count: 33, activeColor: '#A4887E' },
  ] as const;

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
      if (
        deleteMenuRef.current &&
        !deleteMenuRef.current.contains(e.target as Node)
      ) {
        setShowDeleteMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <>
      <div className="min-h-screen px-4 py-2 font-diatype sm:px-6 lg:px-8">
        <div
          ref={dropdownRef}
          className="relative mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between"
        >
          <h1 className="font-romie text-3xl font-medium text-ui-darkGrey xl:text-5xl">
            Uncommon Entertainment
          </h1>

          <div
            onClick={() => setIsDropdownOpen(prev => !prev)}
            className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-full bg-[#E7E6E6] px-5 py-3 sm:w-auto sm:min-w-[230px]"
          >
            <div>
              <p className="text-xs text-gray-600">Status</p>
              <p className="text-base font-normal text-gray-900">
                New Applicant
              </p>
            </div>
            <ChevronDown
              size={20}
              className={cn(
                'text-ui-neutralSurfaceOnColor transition-transform duration-300',
                isDropdownOpen ? 'rotate-180' : 'rotate-0'
              )}
            />
          </div>

          {isDropdownOpen && (
            <div className="absolute right-0 top-full z-10 mt-2 w-[200px] overflow-hidden rounded-lg border border-gray-200 bg-white shadow-lg">
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  approvalDailog.open();
                }}
                className="w-full border-b border-gray-200 px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-50"
              >
                Approve User
              </button>
              <button
                onClick={() => {
                  setIsDropdownOpen(false);
                  waitlistDailog.open();
                }}
                className="w-full px-4 py-3 text-left text-sm text-gray-900 hover:bg-gray-50"
              >
                Waitlist User
              </button>
            </div>
          )}
        </div>

        <div className="mb-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm">
            <div className="flex flex-col gap-4 2xl:flex-row">
              <div className="flex flex-shrink-0 flex-col items-center justify-between [@media(min-width:1441px)]:px-4">
                <div className="mb-4 h-40 w-40 rounded-full bg-black" />
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {['🌐', '𝕏', '📷', '📘', '🎵', '▶️', 'in'].map(
                    (icon, idx) => (
                      <div
                        key={idx}
                        className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-black text-sm text-white hover:bg-gray-200"
                      >
                        {icon}
                      </div>
                    )
                  )}
                </div>
              </div>

              <div className="flex-1 text-sm">
                <div className="flex items-start justify-between">
                  <div className="flex-1 space-y-2">
                    {[
                      ['Contact', 'Michael Gates'],
                      ['Website', 'nylon.com'],
                      ['Email', 'michael.gates@nylon.com'],
                      ['Phone', '+1 (123) 456-1893'],
                      ['Events per year', '4'],
                      ['Referred by', '[TextField]'],
                      ['Source', 'Invite from Admin'],
                      ['Applied on', '05/16/2024'],
                      ['Host Since', '05/16/2024'],
                      ['Bio', 'Uncommon Entertainment is a...'],
                    ].map(([label, value], index, array) => {
                      const isLast = index === array.length - 1;

                      return (
                        <div key={label} className="flex items-center gap-3">
                          <p className="whitespace-nowrap text-[15px] text-ui-contentDisabled">
                            {label}:
                          </p>
                          <div className="flex items-center gap-2">
                            {' '}
                            <p className="flex-1 text-[15px] text-ui-neutralSurfaceOnColor">
                              {value}
                            </p>
                            {isLast && (
                              <CommonButton
                                onClick={hostBioDailog.open}
                                className="rounded-full border border-ui-bgBlur bg-transparent px-2 py-1 text-ui-neutralSurfaceOnColor transition-colors hover:bg-ui-bgBlur hover:text-white"
                              >
                                <ArrowRight size={18} />
                              </CommonButton>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="relative" ref={deleteMenuRef}>
                    <CommonButton
                      onClick={() => setShowDeleteMenu(prev => !prev)}
                      className="rounded-full border border-ui-lightGreyBorder bg-transparent p-2 text-sm text-ui-neutralSurfaceOnColor hover:bg-ui-bgBlur hover:text-white"
                    >
                      <MoreHorizontal size={20} />
                    </CommonButton>
                    {showDeleteMenu && (
                      <div className="absolute right-0 top-10 z-10 flex flex-col whitespace-nowrap rounded-lg border bg-white shadow-lg">
                        <button
                          onClick={editHostDailog.open}
                          className="w-full rounded-lg px-4 py-2 text-left text-sm text-ui-neutralSurfaceOnColor hover:bg-gray-50"
                        >
                          Edit Host Details
                        </button>
                        <button
                          onClick={deleteHostDailog.open}
                          className="w-full rounded-lg px-4 py-2 text-left text-sm text-ui-neutralDarkRed hover:bg-gray-50"
                        >
                          Delete User
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6">
            <div className="h-full rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-start justify-between">
                <h3 className="text-lg font-normal text-gray-900">Attendees</h3>
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-ui-neuteralSurfaceSecondary">
                  <User size={20} className="text-ui-neutralSurfaceOnColor" />
                </div>
              </div>
              <div className="pt-2">
                <p className="flex-1 text-sm text-ui-neutralSurfaceOnColor">
                  ————————
                </p>
              </div>
            </div>

            <div className="h-full rounded-3xl bg-white p-6 shadow-sm">
              <div className="mb-6 flex items-start justify-between">
                <h3 className="text-lg font-normal text-gray-900">Events</h3>
                <div className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-ui-neuteralSurfaceSecondary">
                  <Calendar
                    size={20}
                    className="text-ui-neutralSurfaceOnColor"
                  />
                </div>
              </div>
              <div className="pt-2">
                <p className="flex-1 text-sm text-ui-neutralSurfaceOnColor">
                  ————————
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-sm">
          <h3 className="mb-6 font-romie text-xl font-medium text-gray-900">
            Events
          </h3>
          <div className="scrollbar-hidden mb-6 overflow-x-auto border-b border-gray-200">
            <div className="flex min-w-max space-x-8">
              {tabs.map(tab => {
                const isActive = activeTab === tab.id;
                const badgeBg = isActive ? tab.activeColor : '#CCCCCC';
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={cn(
                      'flex items-center pb-2 font-romie text-base font-medium transition-colors duration-200 ease-in-out',
                      isActive
                        ? 'border-b-2 border-[#A4887E] text-[#A4887E]'
                        : 'border-b-2 border-transparent text-gray-400'
                    )}
                  >
                    {tab.label}
                    <span
                      className="ml-2 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: badgeBg }}
                    >
                      {tab.count}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="relative aspect-[3/4] overflow-hidden rounded-2xl bg-black/20"
              >
                {i === 2 && (
                  <div className="absolute bottom-4 right-4 rounded-full bg-black px-3 py-1.5 text-xs text-white">
                    Co-host
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <HostBio isOpen={hostBioDailog.isOpen} onClose={hostBioDailog.toggle} />
      <ApproveHostSelection
        isOpen={approvalDailog.isOpen}
        onClose={approvalDailog.toggle}
      />
      <WaitlistDailog
        isOpen={waitlistDailog.isOpen}
        onClose={waitlistDailog.toggle}
      />
      <DeleteSelectedHost
        isOpen={deleteHostDailog.isOpen}
        onClose={deleteHostDailog.toggle}
      />
      <EditHostDetails
        isOpen={editHostDailog.isOpen}
        onClose={editHostDailog.toggle}
      />
    </>
  );
}
