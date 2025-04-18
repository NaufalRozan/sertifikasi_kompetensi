"use client";

import { useState } from "react";
import { Pencil, Trash2, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SertifikasiPage() {
    const router = useRouter();
    const [selectedSertifikasi, setSelectedSertifikasi] = useState("Semua");

    const data = [
        { no: 1, kode: "CERT-011", nama: "K3 Mekanik", tersertifikasi: 15, terdaftar: 36 },
        { no: 2, kode: "CERT-012", nama: "K3 Lingkungan Kerja", tersertifikasi: 13, terdaftar: 25 },
        { no: 3, kode: "CERT-013", nama: "K3 Engineering", tersertifikasi: 20, terdaftar: 28 },
        { no: 4, kode: "CERT-014", nama: "K3 Umum", tersertifikasi: 19, terdaftar: 22 },
        { no: 5, kode: "CERT-015", nama: "Welding Inspector (CWI)", tersertifikasi: 27, terdaftar: 31 },
        { no: 6, kode: "CERT-016", nama: "NDT Level II", tersertifikasi: 28, terdaftar: 29 },
    ];

    const uniqueNama = Array.from(new Set(data.map((item) => item.nama)));

    const filteredData =
        selectedSertifikasi === "Semua"
            ? data
            : data.filter((item) => item.nama === selectedSertifikasi);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Book className="w-5 h-5" />
                    Manajemen Sertifikasi
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative px-4 pb-10">
                {/* Filter dan Tambah */}
                <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-2 text-sm text-white">
                        <Label htmlFor="sertifikasi" className="text-white">
                            Nama Sertifikasi:
                        </Label>
                        <Select value={selectedSertifikasi} onValueChange={setSelectedSertifikasi}>
                            <SelectTrigger className="w-[250px] bg-white text-black">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Semua">Semua</SelectItem>
                                {uniqueNama.map((nama) => (
                                    <SelectItem key={nama} value={nama}>
                                        {nama}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={() => router.push("/manajemen-sertifikasi/add")}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        + Tambah Sertifikasi
                    </Button>
                </div>

                {/* Tabel Sertifikasi */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">No</th>
                                <th className="p-4">Kode</th>
                                <th className="p-4">Nama</th>
                                <th className="p-4">Tersertifikasi</th>
                                <th className="p-4">Terdaftar</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((item) => (
                                <tr key={item.no} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.no}</td>
                                    <td className="p-4">{item.kode}</td>
                                    <td className="p-4">{item.nama}</td>
                                    <td className="p-4">{item.tersertifikasi}</td>
                                    <td className="p-4">{item.terdaftar}</td>
                                    <td className="p-4 space-x-2 flex items-center">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // logic edit
                                            }}
                                        >
                                            <Pencil size={16} />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                // logic delete
                                            }}
                                        >
                                            <Trash2 size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 py-4">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">&lt;</Button>
                        <Button size="sm" className="bg-red-700 text-white text-xs">01</Button>
                        <Button variant="link" size="sm">02</Button>
                        <Button variant="link" size="sm">03</Button>
                        <span className="text-sm text-gray-500">...</span>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">&gt;</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
