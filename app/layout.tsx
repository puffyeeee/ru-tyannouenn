import './globals.css';

export const metadata = {
  title: 'Next.js App',
  description: 'Generated with Next.js'
};

export default function RootLayout({ children }) {
  return (
    <html>
      <body>{children}</body>
    </html>
  );
}
