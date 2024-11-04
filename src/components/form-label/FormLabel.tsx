import { twMerge } from 'tailwind-merge';

interface FormLabelProps {
  label: string;
  children: React.ReactNode;
  className: string;
}

export default function FormLabel({
  label,
  children,
  className,
}: FormLabelProps) {
  return (
    <div className={twMerge('flex flex-col gap-1', className)}>
      <label className="text-xs font-normal">{label}</label>
      {children}
    </div>
  );
}
