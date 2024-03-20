import { Icons } from "./icons";

interface DashboardHeaderProps {
  heading: string;
  text?: string;
  children?: React.ReactNode;
  icon?: Icons;
}

export function DashboardHeader({
  heading,
  text,
  children,
  icon,
}: DashboardHeaderProps) {
  const HeaderIcon = icon && Icons[icon];

  return (
    <div className="flex flex-col items-center justify-between gap-4 pb-4 text-center sm:flex-row sm:text-left md:flex-row">
      <div className="grid gap-1">
        <div className="flex items-center justify-center gap-2 align-middle sm:justify-start">
          <h1 className="font-heading sm:flex-start text-3xl font-bold leading-snug tracking-wide md:text-4xl">
            {heading}
          </h1>
          {HeaderIcon && <HeaderIcon name={icon} className="h-8 w-8" />}
        </div>
        {text && (
          <p className="text-balance text-sm text-muted-foreground md:text-lg">
            {text}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}
