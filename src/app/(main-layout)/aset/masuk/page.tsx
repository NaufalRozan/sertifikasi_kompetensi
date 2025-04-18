"use client";

import { useState } from "react";
import { Bookmark, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AsetMasukPage() {
    const router = useRouter();
    const [selectedMonth, setSelectedMonth] = useState("Juni");

    const data = [
        {
            no: 1,
            nama: "Mesin Bubut",
            tanggal: "20 April 2025",
            vendor: "PT. Mesin Jaya",
            stok: 2,
            satuan: "Unit",
        },
        {
            no: 2,
            nama: "Oli Hidrolik",
            tanggal: "09 April 2025",
            vendor: "PT. Fluida Mesin",
            stok: 30,
            satuan: "Liter",
        },
        {
            no: 3,
            nama: "Baut & Mur",
            tanggal: "29 April 2025",
            vendor: "CV. Baja Kuat",
            stok: 200,
            satuan: "Pcs",
        },
        {
            no: 4,
            nama: "Kompresor Udara",
            tanggal: "09 Mei 2025",
            vendor: "CV. Udara Power",
            stok: 30,
            satuan: "Liter",
        },
        {
            no: 5,
            nama: "Bor Duduk",
            tanggal: "14 Juni 2025",
            vendor: "UD. Perkakas",
            stok: 5,
            satuan: "Unit",
        },
        {
            no: 6,
            nama: "Bearing SKF",
            tanggal: "23 Juli 2025",
            vendor: "PT. Bearing Indo",
            stok: 30,
            satuan: "Pcs",
        },
        {
            no: 7,
            nama: "Tangki Oli",
            tanggal: "09 Mei 2025",
            vendor: "PT. Pelumas Indo",
            stok: 10,
            satuan: "Liter",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-between items-center text-xl font-semibold">
                    <div className="flex items-center gap-2">
                        <Bookmark className="w-5 h-5" />
                        Manajemen Aset Masuk
                    </div>
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative px-4 pb-10">
                {/* Filter & Tambah */}
                <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2 text-white text-sm">
                        <Label htmlFor="bulan" className="text-white">
                            Bulan:
                        </Label>
                        <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                            <SelectTrigger className="w-[140px] bg-white text-black">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="April">April</SelectItem>
                                <SelectItem value="Mei">Mei</SelectItem>
                                <SelectItem value="Juni">Juni</SelectItem>
                                <SelectItem value="Juli">Juli</SelectItem>
                                <SelectItem value="Agustus">Agustus</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Button
                        onClick={() => router.push("/aset/masuk/add")}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        + Tambah Aset
                    </Button>
                </div>

                {/* Tabel */}
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">No</th>
                                <th className="p-4">Nama Aset</th>
                                <th className="p-4">Tanggal Masuk</th>
                                <th className="p-4">Vendor</th>
                                <th className="p-4">Stok</th>
                                <th className="p-4">Satuan</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.no} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.no}</td>
                                    <td className="p-4">{item.nama}</td>
                                    <td className="p-4">{item.tanggal}</td>
                                    <td className="p-4">{item.vendor}</td>
                                    <td className="p-4">{item.stok}</td>
                                    <td className="p-4">{item.satuan}</td>
                                    <td className="p-4 flex items-center gap-2">
                                        <Button variant="ghost" size="icon">
                                            <Pencil size={16} className="text-yellow-600" />
                                        </Button>
                                        <Button variant="ghost" size="icon">
                                            <Trash2 size={16} className="text-red-600" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 py-4">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">
                            &lt;
                        </Button>
                        <Button size="sm" className="bg-red-700 text-white text-xs">01</Button>
                        <Button variant="link" size="sm">02</Button>
                        <Button variant="link" size="sm">03</Button>
                        <span className="text-sm text-gray-500">...</span>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">
                            &gt;
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
