'use client';

import { useRef } from 'react';
import { useInView } from 'framer-motion';
import CountUp from 'react-countup';

interface AnimatedCounterProps {
  value: number;
  label: string;
  prefix?: string;
  suffix?: string;
  delay?: number;
}

export default function AnimatedCounter({ value, label, prefix = '', suffix = '', delay = 0 }: AnimatedCounterProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <div ref={ref} className="stat-card">
      <p className="text-sm text-white/60 mb-1">{label}</p>
      <p className="text-3xl font-bold font-['Satoshi'] text-white">
        {prefix}
        {inView ? <CountUp end={value} duration={2} delay={delay} /> : '0'}
        {suffix}
      </p>
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-[#ffde22] to-[#ff414e] transform scale-x-0 transition-transform duration-700 group-hover:scale-x-100" />
    </div>
  );
}