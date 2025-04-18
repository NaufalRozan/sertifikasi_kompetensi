"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function AddSertifikasiPage() {
    const router = useRouter();
    const [kode, setKode] = useState("");
    const [nama, setNama] = useState("");
    const [tersertifikasi, setTersertifikasi] = useState(0);
    const [terdaftar, setTerdaftar] = useState(0);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const data = { kode, nama, tersertifikasi, terdaftar };
        console.log("Data Sertifikasi Baru:", data);
        alert("Data sertifikasi berhasil ditambahkan!");
        // TODO: Kirim ke API atau redirect
        router.push("/manajemen-sertifikasi");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Sertifikasi
                </div>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-xl -mt-24 z-10 relative mx-auto">
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

                            {/* Tersertifikasi */}
                            <div className="space-y-1">
                                <Label>Jumlah Peserta Tersertifikasi</Label>
                                <Input
                                    type="number"
                                    value={tersertifikasi}
                                    onChange={(e) => setTersertifikasi(parseInt(e.target.value) || 0)}
                                />
                            </div>

                            {/* Terdaftar */}
                            <div className="space-y-1">
                                <Label>Jumlah Peserta Terdaftar</Label>
                                <Input
                                    type="number"
                                    value={terdaftar}
                                    onChange={(e) => setTerdaftar(parseInt(e.target.value) || 0)}
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
