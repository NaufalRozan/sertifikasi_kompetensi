"use client";

import { useState } from "react";
import { DollarSign, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function TransaksiSemuaPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedJenis, setSelectedJenis] = useState("Semua");

    const transaksiMasuk = [
        {
            tanggal: "20 April 2025",
            jenis: "Masuk",
            pihak: "Universitas Muhammadiyah Yogyakarta",
            nominal: 9500000,
            keterangan: "Pendanaan Alat",
        },
        {
            tanggal: "11 Maret 2025",
            jenis: "Masuk",
            pihak: "Kementrian Pendidikan",
            nominal: 25000000,
            keterangan: "Pengembangan Lab",
        },
    ];

    const transaksiKeluar = [
        {
            tanggal: "12 Juni 2025",
            jenis: "Keluar",
            pihak: "Fakultas Teknik",
            nominal: 4000000,
            keterangan: "Pendanaan Penelitian",
        },
        {
            tanggal: "12 Juni 2025",
            jenis: "Keluar",
            pihak: "Pengadaan Suku Cadang",
            nominal: 3500000,
            keterangan: "Alat Praktikum",
        },
    ];

    const semuaTransaksi = [...transaksiMasuk, ...transaksiKeluar]
        .sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime())
        .map((item, index) => ({ no: index + 1, ...item }));

    const filteredData = semuaTransaksi.filter((item) => {
        const cocokSearch =
            item.pihak.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.keterangan.toLowerCase().includes(searchQuery.toLowerCase());
        const cocokJenis =
            selectedJenis === "Semua" || item.jenis === selectedJenis;

        return cocokSearch && cocokJenis;
    });

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <DollarSign className="w-5 h-5" />
                    Semua Transaksi Keuangan
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10 space-y-6">
                {/* Filter dan Search */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm w-full lg:w-auto">
                        <Select value={selectedJenis} onValueChange={setSelectedJenis}>
                            <SelectTrigger className="w-[160px] bg-white text-black">
                                <SelectValue placeholder="Jenis Transaksi" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Semua">Semua</SelectItem>
                                <SelectItem value="Masuk">Masuk</SelectItem>
                                <SelectItem value="Keluar">Keluar</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Input
                        type="text"
                        placeholder="Cari transaksi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                    />
                </div>

                {/* Tabel */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-red-700">Daftar Semua Transaksi</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-auto px-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">No</th>
                                    <th className="p-4">Tanggal</th>
                                    <th className="p-4">Jenis</th>
                                    <th className="p-4">Pihak Terkait</th>
                                    <th className="p-4">Nominal</th>
                                    <th className="p-4">Keterangan</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.no} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.no}</td>
                                        <td className="p-4">{item.tanggal}</td>
                                        <td className="p-4">
                                            <span
                                                className={`px-3 py-1 text-xs font-medium rounded-full ${item.jenis === "Masuk"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.jenis}
                                            </span>
                                        </td>
                                        <td className="p-4">{item.pihak}</td>
                                        <td className="p-4">Rp {item.nominal.toLocaleString()}</td>
                                        <td className="p-4">{item.keterangan}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
