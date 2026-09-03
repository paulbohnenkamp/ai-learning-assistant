import type { ReactNode } from "react";
import "./globals.css";

export const metadata = {
  title: "DevCoach AI | Learning assistant",
  description: "A local-first AI learning assistant demo for learners and trainers.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
