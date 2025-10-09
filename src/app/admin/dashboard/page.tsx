'use client';

import React from 'react';

import {
  FacebookIcon,
  Instagram,
  Linkedin,
  LucideBell,
  X,
  Youtube,
} from 'lucide-react';

interface Event {
  name: string;
  date: string;
  attendees: string;
  status: string;
}

interface Attendee {
  name: string;
  events: number;
  socialMedia: {
    instagram: string;
    twitter: string;
    facebook: string;
    linkedin: string;
    youtube: string;
    tiktok: string;
  };
}

const events: Event[] = [
  {
    name: 'H.wood Camp Poosh',
    date: '12/14/2024',
    attendees: '500/1.8K',
    status: 'Manage',
  },
  {
    name: 'H.wood Camp Poosh',
    date: '12/14/2024',
    attendees: '500/1.8K',
    status: 'Manage',
  },
  {
    name: 'H.wood Camp Poosh',
    date: '12/14/2024',
    attendees: '500/1.8K',
    status: 'Manage',
  },
  {
    name: 'H.wood Camp Poosh',
    date: '12/14/2024',
    attendees: '500/1.8K',
    status: 'Manage',
  },
  {
    name: 'H.wood Camp Poosh',
    date: '12/14/2024',
    attendees: '500/1.8K',
    status: 'Manage',
  },
  {
    name: 'H.wood Camp Poosh',
    date: '12/14/2024',
    attendees: '500/1.8K',
    status: 'Manage',
  },
];

export const attendees: Attendee[] = [
  {
    name: 'Alix Earle',
    events: 189,
    socialMedia: {
      instagram: '12M',
      twitter: '10M',
      facebook: '11M',
      linkedin: '14M',
      youtube: '19M',
      tiktok: '19M',
    },
  },
  {
    name: 'Alix Earle',
    events: 189,
    socialMedia: {
      instagram: '12M',
      twitter: '10M',
      facebook: '11M',
      linkedin: '14M',
      youtube: '19M',
      tiktok: '19M',
    },
  },
  {
    name: 'Alix Earle',
    events: 189,
    socialMedia: {
      instagram: '12M',
      twitter: '10M',
      facebook: '11M',
      linkedin: '14M',
      youtube: '19M',
      tiktok: '19M',
    },
  },
  {
    name: 'Alix Earle',
    events: 189,
    socialMedia: {
      instagram: '12M',
      twitter: '10M',
      facebook: '11M',
      linkedin: '14M',
      youtube: '19M',
      tiktok: '19M',
    },
  },
  {
    name: 'Alix Earle',
    events: 189,
    socialMedia: {
      instagram: '12M',
      twitter: '10M',
      facebook: '11M',
      linkedin: '14M',
      youtube: '19M',
      tiktok: '19M',
    },
  },
  {
    name: 'Alix Earle',
    events: 189,
    socialMedia: {
      instagram: '12M',
      twitter: '10M',
      facebook: '11M',
      linkedin: '14M',
      youtube: '19M',
      tiktok: '19M',
    },
  },
  {
    name: 'Alix Earle',
    events: 189,
    socialMedia: {
      instagram: '12M',
      twitter: '10M',
      facebook: '11M',
      linkedin: '14M',
      youtube: '19M',
      tiktok: '19M',
    },
  },
];

export default function EventDashboard() {
  return (
    <div className="h-full p-6 font-diatype">
      <div className="grid grid-cols-1 gap-4 xl:grid-cols-2">
        <div className="rounded-[24px] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-medium text-ui-neutralSurfaceOnColor sm:text-lg">
            Upcoming Events
          </h2>
          <div className="mb-4 hidden items-center px-4 text-sm font-medium text-ui-textTertiary sm:flex">
            <div className="flex-[2]">Event</div>
            <div className="flex-[1]">Date</div>
            <div className="flex-[1.5]">Attendees</div>
            <div className="flex-[0.8] text-right"></div>
          </div>
          <div className="scrollbar-hidden max-h-[550px] space-y-3 overflow-y-auto pr-1">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 transition hover:bg-ui-bgGrey50 sm:flex-row sm:items-center"
              >
                <div className="flex-[2] text-sm font-medium text-ui-neutralSurfaceOnColor">
                  {event.name}
                </div>
                <div className="flex-[1] text-sm text-ui-neutralSurfaceOnColor">
                  {event.date}
                </div>
                <div className="flex flex-[1.5] items-center gap-2">
                  <div className="h-2 w-20 overflow-hidden rounded-full bg-ui-neutralSurfaceBackground">
                    <div className="h-full w-1/2 rounded-full bg-gray-900"></div>
                  </div>
                  <span className="text-sm text-ui-neutralSurfaceOnColor">
                    {event.attendees}
                  </span>
                </div>
                <div className="flex flex-[0.8] justify-start sm:justify-end">
                  <button className="whitespace-nowrap rounded-full bg-ui-mutedGreen px-4 py-2 text-xs font-normal text-ui-neutralSurfaceOnColor sm:text-[13px]">
                    {event.status}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[24px] bg-white p-6 shadow-sm">
          <h2 className="mb-4 text-base font-medium text-ui-neutralSurfaceOnColor sm:text-lg">
            Top Attendees
          </h2>

          <div className="mb-4 hidden items-center px-4 text-sm font-medium text-ui-textTertiary sm:flex">
            <div className="flex-[1.5]">Name</div>
            <div className="flex-[0.8]">Events</div>
            <div className="flex-[2.95]">Social Media</div>
          </div>

          <div className="scrollbar-hidden max-h-[550px] space-y-3 overflow-x-auto overflow-y-auto pr-1">
            {attendees.map((attendee, idx) => (
              <div
                key={idx}
                className="flex flex-col gap-3 p-4 transition hover:bg-ui-bgGrey50 sm:flex-row sm:items-center"
              >
                <div className="flex-[1.5] text-sm font-medium text-ui-neutralSurfaceOnColor">
                  {attendee.name}
                </div>
                <div className="flex-[0.8] text-sm text-ui-neutralSurfaceOnColor">
                  {attendee.events}
                </div>
                <div className="flex flex-[2.5] flex-wrap items-center gap-2 text-ui-neutralSurfaceOnColor xl:flex-nowrap">
                  <SocialPill
                    icon={<Instagram className="h-3 w-3" />}
                    label={attendee.socialMedia.instagram}
                  />
                  <SocialPill
                    icon={<X className="h-3 w-3" />}
                    label={attendee.socialMedia.twitter}
                  />
                  <SocialPill
                    icon={<LucideBell className="h-3 w-3" />}
                    label={attendee.socialMedia.facebook}
                  />
                  <SocialPill
                    icon={<FacebookIcon className="h-3 w-3" />}
                    label={attendee.socialMedia.linkedin}
                  />
                  <SocialPill
                    icon={<Youtube className="h-3 w-3" />}
                    label={attendee.socialMedia.youtube}
                  />
                  <SocialPill
                    icon={<Linkedin className="h-3 w-3" />}
                    label={attendee.socialMedia.tiktok}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function SocialPill({
  icon,
  label,
}: {
  icon?: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon && (
        <div className="flex items-center justify-center rounded-full bg-gray-900 p-1.5 text-white">
          {icon}
        </div>
      )}
      <span className="text-sm text-ui-neutralSurfaceOnColor">{label}</span>
    </div>
  );
}
