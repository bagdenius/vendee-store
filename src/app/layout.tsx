import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';

import { ThemeProvider } from '@/features/theme/components/ThemeProvider';
import { Toaster } from '@/shared/components/ui/Sonner';

import '@/shared/styles/globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: '',
  description: '',
  icons: '',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute='class' defaultTheme='dark' enableSystem>
          <Toaster position='top-center' />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
