"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function OAuthCallbackPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        const user = searchParams.get("user");

        if (token && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", user); // ⬅️ Simpan user ke localStorage
            router.push("/");
        }
    }, [searchParams, router]);

    return (
        <div className="min-h-screen flex items-center justify-center">
            <p className="text-gray-600">Menyelesaikan proses login...</p>
        </div>
    );
}
