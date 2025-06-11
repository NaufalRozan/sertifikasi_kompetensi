"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { BASE_URL } from "@/constant/BaseURL";

export default function AddSertifikasiPage() {
    const router = useRouter();
    const [kode, setKode] = useState("");
    const [nama, setNama] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const payload = {
            code: kode,
            name: nama,
        };

        try {
            toast.promise(
                axios.post(`${BASE_URL}/sertifikasi`, payload, {
                    withCredentials: true, // sesuai kebutuhan CORS/auth
                }),
                {
                    loading: "Menyimpan sertifikasi...",
                    success: () => {
                        // setelah sukses, redirect
                        router.push("/manajemen-sertifikasi");
                        return "Berhasil menambahkan sertifikasi!";
                    },
                    error: (err) => {
                        const msg = err?.response?.data?.message || err.message;
                        return `Gagal menambahkan: ${msg}`;
                    },
                }
            );
        } catch (error) {
            console.error("[AddSertifikasi]", error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Sertifikasi
                </div>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Sertifikasi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Kode */}
                            <div className="space-y-1">
                                <Label>Kode Sertifikasi</Label>
                                <Input
                                    type="text"
                                    value={kode}
                                    onChange={(e) => setKode(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Nama */}
                            <div className="space-y-1">
                                <Label>Nama Sertifikasi</Label>
                                <Input
                                    type="text"
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex justify-end pt-4">
                                <Button type="submit">Simpan</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
