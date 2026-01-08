import type { Metadata } from 'next';
import { Geist, Geist_Mono, Inter } from 'next/font/google';
import '@/shared/styles/globals.css';
import { ThemeProvider } from '@/features/theme/components/ThemeProvider';
import { ThemeToggle } from '@/features/theme/components/ThemeToggle';

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
        <ThemeProvider attribute='class' defaultTheme='system' enableSystem>
          <div className='fixed w-full z-10'>
            <div className='flex items-center justify-end w-full h-16 max-w-full px-5'>
              {/* <span>vendee</span> */}
              <ThemeToggle />
            </div>
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
