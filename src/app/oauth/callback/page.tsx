"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function OAuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        if (token) {
            localStorage.setItem("token", token); // atau bisa simpan cookie
            router.push("/"); // redirect ke home / dashboard
        }
    }, [router, searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-600">Menyelesaikan proses login...</p>
        </div>
    );
}
