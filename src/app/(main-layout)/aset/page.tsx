"use client";

import { useState } from "react";
import { Box } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

export default function ManajemenAsetPage() {
    const router = useRouter();

    const data = [
        {
            no: 1,
            nama: "Mesin Bubut",
            tanggal: "20 April 2025",
            vendor: "PT. Mesin Jaya",
            satuan: "Unit",
            stok: 2,
        },
        {
            no: 2,
            nama: "Oli Hidrolik",
            tanggal: "09 April 2025",
            vendor: "PT. Fluida Mesin",
            satuan: "Liter",
            stok: 30,
        },
        {
            no: 3,
            nama: "Baut & Mur",
            tanggal: "29 April 2025",
            vendor: "CV. Baja Kuat",
            satuan: "Pcs",
            stok: 200,
        },
        {
            no: 4,
            nama: "Kompresor Udara",
            tanggal: "09 Mei 2025",
            vendor: "CV. Udara Power",
            satuan: "Liter",
            stok: 30,
        },
    ];

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex items-center gap-2 text-xl font-semibold">
                    <Box className="w-5 h-5" />
                    Manajemen Aset
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10 space-y-6">
                {/* Statistik */}
                <Card className="shadow-md">
                    <CardContent className="py-6 flex justify-between items-center gap-6 flex-wrap">
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Aset masuk bulan ini</p>
                            <p className="text-3xl font-semibold text-gray-700">93</p>
                        </div>
                        <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Aset keluar bulan ini</p>
                            <p className="text-3xl font-semibold text-gray-700">43</p>
                        </div>
                        <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />
                        <div className="flex flex-col items-center justify-center text-red-700 gap-2 w-full lg:w-1/4">
                            <p className="text-md font-semibold">Menu Lainnya</p>
                            <Button onClick={() => router.push("/aset/masuk")} className="bg-blue-600 hover:bg-blue-700 text-white">
                                Aset Masuk
                            </Button>
                            <Button onClick={() => router.push("/aset/keluar")} className="bg-blue-600 hover:bg-blue-700 text-white">
                                Aset Keluar
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Baris Bawah: Search */}
                <Input
                    type="text"
                    placeholder="Cari aset..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                />

                {/* Tabel Aset */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-red-700">Daftar Aset</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto p-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">No</th>
                                    <th className="p-4">Nama Aset</th>
                                    <th className="p-4">Tanggal Masuk</th>
                                    <th className="p-4">Vendor</th>
                                    <th className="p-4">Stok</th>
                                    <th className="p-4">Satuan</th>
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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
