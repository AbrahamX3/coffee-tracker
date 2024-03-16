export default function FormShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col rounded-md border border-dashed p-4 animate-in fade-in-50">
      {children}
    </div>
  );
}
