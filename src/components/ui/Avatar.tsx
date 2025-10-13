'use client';

import * as React from 'react';

import Image from 'next/image';

import { cn } from '@/lib/utils';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export function Avatar({ className, children, ...props }: AvatarProps) {
  return (
    <div
      className={cn(
        'relative flex h-10 w-10 shrink-0 overflow-hidden rounded-full bg-muted',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export interface AvatarImageProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> {
  src?: string;
  fallbackSrc?: string;
  width?: number;
  height?: number;
}

export function AvatarImage({
  className,
  src,
  fallbackSrc = '/images/maintenance.svg',
  alt = 'Avatar icon',
  width = 500,
  height = 500,
  ...props
}: AvatarImageProps) {
  const [imgSrc, setImgSrc] = React.useState(src || fallbackSrc);
  const [key, setKey] = React.useState(0);

  // Check if URL is external
  const isExternal = imgSrc?.startsWith('http');

  if (isExternal) {
    return (
      <img
        key={key}
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        className={cn('h-full w-full object-cover', className)}
        onError={() => {
          if (imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
            setKey(prev => prev + 1);
          }
        }}
        {...props}
      />
    );
  }

  // Local images (use Next.js Image)
  return (
    <Image
      key={key}
      src={imgSrc || fallbackSrc}
      alt={alt}
      width={width}
      height={height}
      className={cn('h-full w-full object-cover', className)}
      onError={() => {
        if (imgSrc !== fallbackSrc) {
          setImgSrc(fallbackSrc);
          setKey(prev => prev + 1);
        }
      }}
      {...props}
    />
  );
}

export interface AvatarFallbackProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  className?: string;
}

export function AvatarFallback({
  className,
  children,
  ...props
}: AvatarFallbackProps) {
  return (
    <span
      className={cn(
        'flex h-full w-full items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground',
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
