'use client';

import Image from 'next/image';

import { Avatar, AvatarFallback, AvatarImage } from './Avatar';

interface TownEventCardProps {
  name: string;
  dateRange: string;
  image: string;
  attendees: Array<{
    avatar: string;
    name: string;
  }>;
}

export function TownEventCard({
  name,
  dateRange,
  image,
  attendees,
}: TownEventCardProps) {
  return (
    <div className="w-full overflow-hidden rounded-[16px] border border-ui-neutralBorderComponent bg-white p-1 font-diatype">
      {/* Event image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={image}
          alt={name}
          height={500}
          width={400}
          className="rounded-3 h-full w-full object-cover"
        />
      </div>

      <div className="space-y-1 p-3">
        <h3 className="text-[16px] font-medium leading-tight text-ui-neutralSurfaceOnColor 2xl:text-[20px]">
          {name}
        </h3>

        <p className="text-sm text-ui-neutralContentBody">{dateRange}</p>

        {/* Attendees */}
        <div className="flex -space-x-1 pt-1">
          {attendees.slice(0, 4).map((attendee, index) => (
            <Avatar key={index} className="h-8 w-8 border-2 border-card">
              <AvatarImage
                src={attendee.avatar}
                alt={attendee.name}
                className="object-cover"
              />
              <AvatarFallback className="bg-muted text-xs">
                {attendee.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ))}
          {attendees.length > 4 && (
            <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-card bg-ui-neutralSurfaceBackground p-1.5 text-ui-neutralSurfaceOnColor">
              <span className="text-xs font-medium">
                +{attendees.length - 4}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
