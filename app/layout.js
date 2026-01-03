import "./globals.css";
import { Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

const brandFont = Poppins({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

/* ✅ Metadata (App Router way) */
export const metadata = {
  title: "Robomanthan Leave Management System",
  description: "Leave & Employee Management System",
  icons: {
    icon: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={brandFont.className}>
        {children}
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
