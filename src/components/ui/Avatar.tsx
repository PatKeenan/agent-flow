import React from 'react';

interface AvatarProps {
  src: string;
  alt: string;
  size?: 'sm' | 'md' | 'lg';
}

const sizes = {
  sm: 'w-8 h-8',
  md: 'w-10 h-10',
  lg: 'w-12 h-12',
};

export default function Avatar({ src, alt, size = 'md' }: AvatarProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={`${sizes[size]} rounded-full object-cover`}
    />
  );
}