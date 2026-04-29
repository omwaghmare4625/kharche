import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export const metadata = {
  title: "Kharche – Smart Student Expense Tracker",
  description:
    "Track your daily expenses, set monthly budgets, and manage your pocket money wisely with Kharche.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-bg text-text font-sans">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
