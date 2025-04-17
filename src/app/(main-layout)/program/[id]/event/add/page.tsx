"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function AddEventPage() {
    const { id } = useParams();
    const router = useRouter();

    const jenisOptions = ["Seminar", "Workshop", "Kompetisi", "Pelatihan"];

    const [nama, setNama] = useState("");
    const [tanggalAwal, setTanggalAwal] = useState("");
    const [tanggalAkhir, setTanggalAkhir] = useState("");
    const [jenis, setJenis] = useState(jenisOptions[0]);
    const [harga, setHarga] = useState("");
    const [tempat, setTempat] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const eventData = {
            nama,
            periode: `${tanggalAwal} - ${tanggalAkhir}`,
            jenis,
            harga: Number(harga),
            tempat,
        };
        console.log("Event Baru:", eventData);
        alert("Event berhasil ditambahkan!");
        router.push(`/program/${id}/event`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Event
                </div>
            </div>

            {/* Form */}
            <div className="w-full max-w-xl -mt-24 z-10 relative mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Event</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nama */}
                            <div className="space-y-1">
                                <Label>Nama Event</Label>
                                <Input
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Periode */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>Tanggal Awal</Label>
                                    <Input
                                        type="date"
                                        value={tanggalAwal}
                                        onChange={(e) => setTanggalAwal(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label>Tanggal Akhir</Label>
                                    <Input
                                        type="date"
                                        value={tanggalAkhir}
                                        onChange={(e) => setTanggalAkhir(e.target.value)}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Jenis */}
                            <div className="space-y-1">
                                <Label>Jenis Event</Label>
                                <Select value={jenis} onValueChange={setJenis}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jenis" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jenisOptions.map((item, i) => (
                                            <SelectItem key={i} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>

                            {/* Harga */}
                            <div className="space-y-1">
                                <Label>Harga</Label>
                                <Input
                                    type="number"
                                    value={harga}
                                    onChange={(e) => setHarga(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Tempat */}
                            <div className="space-y-1">
                                <Label>Tempat</Label>
                                <Input
                                    value={tempat}
                                    onChange={(e) => setTempat(e.target.value)}
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
