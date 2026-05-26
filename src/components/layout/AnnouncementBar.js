'use client';

import { useState, useEffect } from 'react';
import { announcements } from '@/lib/mockData';

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIndex((i) => (i + 1) % announcements.length);
        setVisible(true);
      }, 300);
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-slate-950 text-center py-2.5 px-4 text-xs tracking-wide">
      <span
        className="text-teal-400 font-medium transition-opacity duration-300"
        style={{ opacity: visible ? 1 : 0 }}
      >
        {announcements[index]}
      </span>
    </div>
  );
}
