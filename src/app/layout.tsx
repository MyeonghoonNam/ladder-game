'use client';

// import { Metadata } from 'next';
import { Providers } from 'providers';

interface RootLayoutProps {
  children: React.ReactNode;
}

// export const metadata: Metadata = {
//   title: 'Ladder Game',
//   description: 'A ladder game is interactive CLI Application based on nodejs and PC/MO WebApp with Next.js',
// };

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
