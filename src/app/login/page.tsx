"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { LogIn, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/constant/BaseURL";

export default function LoginPage() {
    const router = useRouter();

    // Optional: handle redirect jika user sudah login
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            router.push("/"); // arahkan ke home atau dashboard jika sudah login
        }
    }, [router]);

    const handleGoogleLogin = () => {
        window.location.href = `${process.env.NEXT_PUBLIC_DOMAIN}/oauth2/google`;
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-4">
            <Card className="w-full max-w-md shadow-md">
                <CardHeader>
                    <div className="flex items-center gap-2">
                        <ShieldCheck className="w-5 h-5 text-red-700" />
                        <CardTitle className="text-xl">Login Peserta</CardTitle>
                    </div>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p className="text-sm text-gray-600">Login untuk mengakses sistem sebagai peserta.</p>
                    <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={handleGoogleLogin}
                    >
                        <LogIn className="w-4 h-4 mr-2" />
                        Login dengan Google
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
