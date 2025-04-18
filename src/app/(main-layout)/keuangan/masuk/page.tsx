"use client";

import { useState } from "react";
import { DollarSign, Pencil, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
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
import { Label } from "@/components/ui/label";

export default function KeuanganMasukPage() {
    const router = useRouter();
    const [selectedMonth, setSelectedMonth] = useState("April");

    const data = [
        {
            no: 1,
            tanggal: "20 April 2025",
            sumber: "Universitas Muhammadiyah Yogyakarta",
            nominal: 9500000,
            keterangan: "Pendanaan Alat",
        },
        {
            no: 2,
            tanggal: "11 Maret 2025",
            sumber: "Kementrian Pendidikan",
            nominal: 25000000,
            keterangan: "Pengembangan Lab",
        },
        {
            no: 3,
            tanggal: "12 Juni 2025",
            sumber: "Fakultas Teknik",
            nominal: 1800000,
            keterangan: "Pendanaan Kompetisi Inovasi",
        },
        {
            no: 4,
            tanggal: "12 Juni 2025",
            sumber: "Universitas Muhammadiyah Yogyakarta",
            nominal: 5800000,
            keterangan: "Bantuan Pemeliharaan Alat",
        },
        {
            no: 5,
            tanggal: "12 Juni 2025",
            sumber: "Universitas Muhammadiyah Yogyakarta",
            nominal: 3500000,
            keterangan: "Bantuan Peralatan Praktikum",
        },
        {
            no: 6,
            tanggal: "12 Juni 2025",
            sumber: "Fakultas Teknik",
            nominal: 4000000,
            keterangan: "Pendanaan untuk Penelitian",
        },
    ];

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <DollarSign className="w-5 h-5" />
                    Manajemen Keuangan Masuk
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">

                <div className="flex flex-col gap-4 mb-4">
                    {/* Baris Atas: Filter & Button */}
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-white">
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
                            onClick={() => router.push("/keuangan/masuk/add")}
                            className="bg-blue-600 text-white"
                        >
                            + Tambah Transaksi
                        </Button>
                    </div>

                    {/* Baris Bawah: Search */}
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
                    <CardContent className="overflow-auto px-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">No</th>
                                    <th className="p-4">Tanggal</th>
                                    <th className="p-4">Sumber Dana</th>
                                    <th className="p-4">Nominal</th>
                                    <th className="p-4">Keterangan</th>
                                    <th className="p-4">Invoice</th>
                                    <th className="p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data.map((item) => (
                                    <tr key={item.no} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.no}</td>
                                        <td className="p-4">{item.tanggal}</td>
                                        <td className="p-4">{item.sumber}</td>
                                        <td className="p-4">Rp {item.nominal.toLocaleString()}</td>
                                        <td className="p-4">{item.keterangan}</td>
                                        <td className="p-4">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                className="bg-gray-100 hover:bg-gray-200"
                                            >
                                                <Upload size={16} />
                                            </Button>
                                        </td>
                                        <td className="p-4 flex items-center gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                                            >
                                                <Pencil size={16} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="bg-red-100 hover:bg-red-200 text-red-600"
                                            >
                                                <Trash2 size={16} />
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 py-4">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">
                            &lt;
                        </Button>
                        <Button size="sm" className="bg-red-700 text-white rounded-full h-7 w-7 text-xs font-medium">
                            01
                        </Button>
                        <Button variant="link" size="sm">02</Button>
                        <Button variant="link" size="sm">03</Button>
                        <span className="text-sm text-gray-500">...</span>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">
                            &gt;
                        </Button>
                    </div>
                </Card>
            </div>
        </div>
    );
}
