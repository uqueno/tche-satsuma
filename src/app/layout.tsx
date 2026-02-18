import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tche Satsuma - Sistema de Gerenciamento',
  description: 'Sistema de gerenciamento de membros e eventos para Tche Satsuma - Kagoshima RS',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
