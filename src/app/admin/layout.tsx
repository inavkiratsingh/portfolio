import './globals.css'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        

        <div className="relative">
          {children}
        </div>

      </body>
    </html>
  );
}
