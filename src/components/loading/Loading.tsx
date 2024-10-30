import { Spinner } from '@phosphor-icons/react';
import { twMerge } from 'tailwind-merge';

export default function Loading({ className }: { className?: string }) {
  return (
    <div
      className={twMerge(
        'w-12 h-12 rounded bg-[#282a36]/70 z-[1000] grid grid-cols-1 gap-4 place-items-center justify-center',
        className,
      )}
    >
      <Spinner size={60} className="animate-spin" />
    </div>
  );
}
