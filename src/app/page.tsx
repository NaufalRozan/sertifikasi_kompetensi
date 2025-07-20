import Link from "next/link";
import { PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-red-100 via-white to-red-200 dark:from-red-900 dark:via-black dark:to-red-800">
      <main className="flex-1 flex items-center justify-center">
        <section className="text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight tracking-tight text-red-700 dark:text-red-300">
            Selamat Datang di <br className="hidden md:inline" />
            <span className="text-primary">SIM CV Metric</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto mt-4">
            Sistem Informasi Manajemen Kompetensi dan Sertifikasi.
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
            <Button variant="default" asChild>
              <Link href="/login">Login Peserta</Link>
            </Button>
            <Button variant="outline" asChild>
              <Link href="/auth">Login Admin</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}
