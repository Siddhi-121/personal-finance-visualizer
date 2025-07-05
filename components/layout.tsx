import { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans">
      <header className="bg-primary text-primary-foreground px-6 py-4 shadow">
        <h1 className="text-xl font-bold">💰 Personal Finance Visualizer</h1>
      </header>
      <main className="flex-grow px-4 py-6">{children}</main>
      <footer className="bg-muted text-muted-foreground py-3 text-center text-sm">
        Built with Next.js & Tailwind · 2025
      </footer>
    </div>
  );
}
