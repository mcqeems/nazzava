import type { Metadata } from 'next';
import { Poppins, Pixelify_Sans } from 'next/font/google';
import './globals.css';
import 'aos/dist/aos.css';
import { ScanProvider } from './context/scanContext';
import { ThemeProvider } from './context/themeContext';
import InitialLoadGate from '@/components/ui/InitialLoadGate';
import AOSInit from '@/components/AOSInit';

const poppins = Poppins({
  variable: '--font-poppins',
  subsets: ['latin'],
  weight: ['100', '200', '300', '400', '500', '600', '700', '800'],
});

const pixelify = Pixelify_Sans({
  variable: '--font-pixelify',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

export const metadata: Metadata = {
  title: 'Nazzava - Kurangi Jejak Karbonmu',
  description:
    'Nazzava membantu kamu mengurangi jejak karbon dengan tips, artikel, dan alat interaktif untuk gaya hidup rendah emisi.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="overflow-x-hidden" lang="en" style={{ scrollBehavior: 'smooth' }}>
      <head>
        <link href="https://unpkg.com/boxicons@2.1.4/css/boxicons.min.css" rel="stylesheet" />
      </head>
      <body className={`${poppins.variable} ${pixelify.variable} overflow-x-hidden antialiased`}>
        <ThemeProvider>
          <ScanProvider>
            <InitialLoadGate>{children}</InitialLoadGate>
          </ScanProvider>
        </ThemeProvider>
        <AOSInit />
      </body>
    </html>
  );
}
