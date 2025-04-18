"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

export default function AddTransaksiMasukPage() {
    const router = useRouter();

    const [tanggal, setTanggal] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [nominal, setNominal] = useState(0);
    const [keterangan, setKeterangan] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { tanggal, deskripsi, nominal, keterangan };
        console.log("Transaksi Masuk:", data);
        alert("Transaksi masuk berhasil ditambahkan!");
        router.push("/keuangan/masuk");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Transaksi Masuk
                </div>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-xl -mt-52 z-10 relative p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Form Transaksi Masuk</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="space-y-1">
                                <Label htmlFor="tanggal">Tanggal</Label>
                                <Input
                                    type="date"
                                    id="tanggal"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="deskripsi">Sumber Dana</Label>
                                <Input
                                    id="deskripsi"
                                    value={deskripsi}
                                    onChange={(e) => setDeskripsi(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="nominal">Nominal</Label>
                                <Input
                                    type="number"
                                    id="nominal"
                                    value={nominal}
                                    onChange={(e) => setNominal(parseInt(e.target.value))}
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="keterangan">Keterangan</Label>
                                <Textarea
                                    id="keterangan"
                                    rows={3}
                                    value={keterangan}
                                    onChange={(e) => setKeterangan(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="flex justify-end pt-2">
                                <Button type="submit">Simpan</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
