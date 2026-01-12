'use client';

import { DashboardCardProps } from '@/types';
import Link from 'next/link';
import React from 'react';



export const DashboardCard: React.FC<DashboardCardProps> = ({
  title,
  description,
  href,
  icon,
  colorClass = 'text-gray-500',
}) => {
  return (
    <Link href={href} className="group">
      <div className="cursor-pointer w-80 p-8 bg-white shadow-lg rounded-xl transform hover:-translate-y-2 hover:shadow-2xl transition duration-300 flex flex-col items-center text-center">
        <div className={`${colorClass} w-12 h-12 mb-4`}>
          {icon}
        </div>
        <h2 className="text-2xl font-semibold mb-2 text-gray-800 group-hover:text-current">
          {title}
        </h2>
        <p className="text-gray-500">
          {description}
        </p>
      </div>
    </Link>
  );
};
