import { cn } from "~/lib/utils";

type DashboardShellProps = React.HTMLAttributes<HTMLDivElement>;

export function DashboardShell({
  children,
  className,
  ...props
}: DashboardShellProps) {
  return (
    <div className={cn("flex w-full flex-col p-2", className)} {...props}>
      {children}
    </div>
  );
}
