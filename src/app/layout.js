import { Inter } from "next/font/google";
import "./globals.css";
import CurrencySliderHeader from "@/components/currencySliderHeader";

const interFont = Inter({
  variable: '--font-inter',
  subsets: ["latin"],
})

export const metadata = {
  title: "xChange Rate",
  description: "Quick exchange rate for all currencies",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${interFont.variable} antialiased`}
      >
        <CurrencySliderHeader/>
        {children}
      </body>
    </html>
  );
}
