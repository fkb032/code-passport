interface StepHeaderProps {
  title: string;
  subtitle?: string;
}

export function StepHeader({ title, subtitle }: StepHeaderProps) {
  return (
    <div className="mb-8">
      <h2
        className="text-2xl font-bold tracking-tight text-slate-900"
        style={{ fontFamily: "'General Sans', sans-serif" }}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-2 text-sm text-slate-500 leading-relaxed max-w-xl">
          {subtitle}
        </p>
      )}
    </div>
  );
}
