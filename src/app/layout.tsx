import type { Metadata, Viewport } from "next";
import { Fraunces, Geist, JetBrains_Mono } from "next/font/google";
import { ProgressProvider } from "@/components/progress-provider";
import "./globals.css";

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  style: ["normal", "italic"],
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Python do Zero — aprende sem dor de cabeça",
  description:
    "Curso de Python pra quem nunca programou na vida. Explicado fácil, com desenho animado e umas piadas. Do print() até listas e tuplas.",
  openGraph: {
    title: "Python do Zero",
    description:
      "Aprende Python do zero com desenho animado e zero enrolação. Feito pra celular.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
  width: "device-width",
  initialScale: 1,
  // deixa o usuário dar pinch-zoom se quiser (acessibilidade), mas começa em 1
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${sans.variable} ${serif.variable} ${mono.variable} dark`}
      suppressHydrationWarning
    >
      <body
        className="font-sans antialiased min-h-screen bg-background text-foreground"
        suppressHydrationWarning
      >
        <ProgressProvider>{children}</ProgressProvider>
      </body>
    </html>
  );
}
