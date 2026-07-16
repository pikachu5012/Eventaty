import React from 'react';

interface AboutCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  allign?: string;
  backgroundColor?: string;
}

export default function AboutCard({ icon, title, description, allign, backgroundColor }: AboutCardProps) {
  return (
    <div style={{ backgroundColor }} className={`py-8 px-6 flex flex-col items-${allign === 'center' ? 'center' : 'start'} gap-y-4 h-full rounded-xl bg-card border border-slate-200 dark:border-slate-800`}>
      <div className="w-12 h-12 rounded-full flex items-center justify-center bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 shrink-0">
        {icon}
      </div>
      <h2 className={`text-base font-bold text-primary ${allign === 'center' ? 'text-center' : 'text-start'}`}>{title}</h2>
      <p className={`text-muted-foreground text-sm leading-relaxed font-light ${allign === 'center' ? 'text-center' : 'text-start'}`}>
        {description}
      </p>
    </div>
  );
}
