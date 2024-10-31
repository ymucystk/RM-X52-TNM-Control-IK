import { Inter } from "next/font/google";
import 'bootstrap/dist/css/bootstrap.min.css'
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "RM-X52-TNM-Control-IK",
};

export default function RootLayout({ children }) {
  return (
    <html lang="jp">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
