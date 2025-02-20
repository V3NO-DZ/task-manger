import "@/app/globals.css"; // Import global styles
import Navbar from "@/components/Navbar"; // Import Navbar

export const metadata = {
  title: "Task Manager",
  description: "Manage your daily tasks efficiently",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Navbar /> {/* Navbar will always be visible */}
        <main>{children}</main> {/* Page content */}
      </body>
    </html>
  );
}
