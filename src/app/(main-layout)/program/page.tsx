"use client";

import { useState } from "react";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function ProgramPage() {
    const router = useRouter();
    const [selectedMonth, setSelectedMonth] = useState("Maret");

    const data = [
        { id: 1, tanggal: "20 April 2025", notulen: "Rapat persiapan kompetensi...", peserta: 12, status: "Selesai" },
        { id: 2, tanggal: "28 Juni 2025", notulen: "Evaluasi Proyek Mesin", peserta: 8, status: "Proses" },
        { id: 3, tanggal: "12 Juli 2025", notulen: "Pengadaan Alat Bengkel", peserta: 15, status: "Selesai" },
        { id: 4, tanggal: "19 April 2025", notulen: "Rapat Kolaborasi dengan Industri Otomotif", peserta: 10, status: "Selesai" },
        { id: 5, tanggal: "03 Mei 2025", notulen: "Workshop 3D Printing", peserta: 20, status: "Dijadwalkan" },
        { id: 6, tanggal: "20 Mei 2025", notulen: "Rapat Evaluasi Magang", peserta: 25, status: "Selesai" },
    ];

    const getStatusStyle = (status: string) => {
        switch (status) {
            case "Selesai":
                return "bg-green-100 text-green-700";
            case "Proses":
                return "bg-yellow-100 text-yellow-700";
            case "Dijadwalkan":
                return "bg-blue-100 text-blue-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Calendar className="w-5 h-5" />
                    Program
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative px-4 pb-10">
                {/* Filter dan Tambah */}
                <div className="flex justify-between items-center mb-6">
                    {/* Filter bulan */}
                    <div className="flex items-center gap-2 text-sm text-white">
                        <Label htmlFor="bulan" className="text-white">Bulan :</Label>
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-[140px] bg-white text-black">
                                <SelectValue placeholder="Pilih bulan" />
                            </SelectTrigger>
                            <SelectContent>
                                {["Maret", "April", "Mei", "Juni", "Juli"].map((bulan, i) => (
                                    <SelectItem key={i} value={bulan}>
                                        {bulan}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Tombol tambah */}
                    <Button
                        onClick={() => router.push("/program/add")}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        + Tambah Program
                    </Button>
                </div>

                {/* Card Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item) => (
                        <Card
                            key={item.id}
                            onClick={() => router.push(`/program/${item.id}/subprogram`)}
                            className="cursor-pointer hover:shadow-md transition"
                        >
                            <CardHeader className="pb-2">
                                <CardTitle className="text-red-700 text-lg">{item.tanggal}</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                <div className="text-xs text-gray-500">#{item.id}</div>
                                <div className="text-sm text-gray-700">{item.notulen}</div>
                                <div className="text-sm text-gray-500">Peserta: {item.peserta}</div>
                                <div className="mt-1">
                                    <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(item.status)}`}>
                                        {item.status}
                                    </span>
                                </div>
                                <div className="flex gap-2 justify-end pt-3">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Edit logic here
                                        }}
                                    >
                                        <Pencil size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // Delete logic here
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
