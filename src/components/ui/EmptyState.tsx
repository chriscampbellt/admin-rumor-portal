'use client';

import Image from 'next/image';

interface EmptyStateProps {
  title: string;
  description?: string;
  image?: string;
  radius?: number;
  tryNow?: string;
  onTryNowClick?: () => void;
}

export function EmptyState({
  title,
  description,
  image,
  radius = 24,
  tryNow,
  onTryNowClick,
}: EmptyStateProps) {
  return (
    <div
      className={`scrollbar-hidden h-full rounded-[${radius}px] bg-white`}
      style={{ scrollbarWidth: 'none' }}
    >
      <div className="flex h-full min-h-[calc(100vh-300px)] flex-col items-center justify-center">
        {image && (
          <Image
            src={image || '/images/maintenance.svg'}
            alt="Empty illustration"
            width={180}
            height={180}
            className="mx-auto mb-6 h-40 w-40 object-contain"
            onError={e => {
              e.currentTarget.src = image || '/images/maintenance.svg';
            }}
          />
        )}
        <h2 className="-mt-5 text-center font-romie text-2xl font-bold text-ui-neutralSurfaceOnColor sm:text-3xl md:text-4xl lg:text-[40px]">
          {title}
        </h2>
        <p className="text-center font-diatype text-sm text-ui-neutralContentBody">
          {description}
        </p>
        {tryNow && (
          <button
            onClick={onTryNowClick}
            className="mt-4 rounded-full bg-ui-neutralSurfaceOnColor px-6 py-2 font-diatype text-sm font-medium text-white hover:opacity-90"
          >
            {tryNow}
          </button>
        )}
      </div>
    </div>
  );
}
