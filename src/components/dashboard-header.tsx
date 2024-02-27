interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
}

export function DashboardHeader({
  heading,
  text,
  children,
}: DashboardHeaderProps) {
  return (
    <div className="flex flex-col items-center justify-between gap-4 pb-4 text-center sm:flex-row sm:text-left md:flex-row">
      <div className="grid gap-1">
        <h1 className="font-heading text-3xl md:text-4xl">{heading}</h1>
        {text && (
          <p className="text-sm text-muted-foreground md:text-lg">{text}</p>
        )}
      </div>
      {children}
    </div>
  );
}
