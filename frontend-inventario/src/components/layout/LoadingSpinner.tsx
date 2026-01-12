'use client';

import React from 'react';

interface LoadingSpinnerProps {
  size?: number; // tamaño en px
  color?: string; // clase de Tailwind para color
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 20, color = 'border-white' }) => {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-t-transparent ${color}`}
      style={{ width: size, height: size }}
    />
  );
};

export default LoadingSpinner;
