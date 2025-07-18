export function Dialog({ children }: { children: React.ReactNode }) {
  return <div className="fixed bg-white p-6 shadow-lg rounded">{children}</div>;
}

export function DialogTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-lg font-bold">{children}</h3>;
}

export function DialogDescription({ children }: { children: React.ReactNode }) {
  return <p className="text-gray-600">{children}</p>;
}

export const DialogTrigger = () => { /* ... */ };
export const DialogContent = () => { /* ... */ };
export const DialogHeader = () => { /* ... */ };