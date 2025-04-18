"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function ManajemenKeuanganPage() {
    const router = useRouter();

    const transaksi = [
        {
            no: 1,
            tanggal: "20 April 2025",
            jenis: "Masuk",
            sumber: "Universitas Muhammadiyah Yogyakarta",
            deskripsi: "Pendanaan Alat",
            nominal: 2500000,
            status: "Diterima",
            receipt: true,
        },
        {
            no: 2,
            tanggal: "20 Juni 2025",
            jenis: "Keluar",
            sumber: "Peralatan CNC",
            deskripsi: "Pembelian Peralatan Lab CNC",
            nominal: 4500000,
            status: "Belum",
            receipt: false,
        },
        {
            no: 3,
            tanggal: "10 April 2025",
            jenis: "Keluar",
            sumber: "Perawatan Mesin",
            deskripsi: "Biaya perawatan mesin uji tarik",
            nominal: 2500000,
            status: "Diterima",
            receipt: true,
        },
    ];

    const [searchQuery, setSearchQuery] = useState("");

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <DollarSign className="w-5 h-5" />
                    Manajemen Keuangan
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative space-y-6 px-4 pb-10">
                {/* Admin Menu */}
                <div className="flex justify-end">
                    <Button onClick={() => router.push("/keuangan/admin")} className="bg-blue-600">
                        Admin Menu
                    </Button>
                </div>

                {/* Summary & Menu */}
                <Card className="flex flex-col lg:flex-row justify-between items-center gap-6 p-6">
                    {/* Left */}
                    <div className="flex flex-col gap-4 text-red-700 w-full lg:w-[70%]">
                        <div className="text-xl font-bold">
                            TOTAL SALDO : <span className="text-2xl">25.000.000</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-24 font-semibold">Pemasukan</span>
                            <div className="flex-1 h-4 rounded-full bg-gradient-to-r from-white via-red-200 to-red-700" />
                            <span className="w-28 text-end font-semibold">50.000.000</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-24 font-semibold">Pengeluaran</span>
                            <div className="flex-1 h-4 rounded-full bg-gradient-to-r from-white via-red-200 to-red-700 opacity-70" />
                            <span className="w-28 text-end font-semibold">25.000.000</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />

                    {/* Right */}
                    <div className="flex flex-col items-center justify-center text-red-700 gap-2 w-full lg:w-1/4">
                        <p className="text-md font-semibold">Menu Lainnya</p>
                        <Button
                            onClick={() => router.push("/keuangan/masuk")}
                            className="w-full bg-blue-600"
                        >
                            Transaksi Masuk
                        </Button>
                        <Button
                            onClick={() => router.push("/keuangan/keluar")}
                            className="w-full bg-blue-600"
                        >
                            Transaksi Keluar
                        </Button>
                    </div>
                </Card>

                {/* Baris Bawah: Search */}
                <Input
                    type="text"
                    placeholder="Cari transaksi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                />

                {/* Table */}
                <Card>
                    <CardContent className="overflow-auto px-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">No</th>
                                    <th className="p-4">Tanggal</th>
                                    <th className="p-4">Jenis Transaksi</th>
                                    <th className="p-4">Sumber/Destinasi</th>
                                    <th className="p-4">Deskripsi</th>
                                    <th className="p-4">Nominal</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Receipt</th>
                                    <th className="p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaksi.map((item) => (
                                    <tr key={item.no} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.no}</td>
                                        <td className="p-4">{item.tanggal}</td>
                                        <td className="p-4">{item.jenis}</td>
                                        <td className="p-4">{item.sumber}</td>
                                        <td className="p-4">{item.deskripsi}</td>
                                        <td className="p-4">Rp {item.nominal.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span
                                                className={`text-xs px-3 py-1 font-medium rounded-full ${item.status === "Diterima"
                                                    ? "bg-green-100 text-green-700"
                                                    : "bg-red-100 text-red-700"
                                                    }`}
                                            >
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {item.receipt ? (
                                                <Button variant="secondary" className="text-xs px-3 py-1">
                                                    Lihat Bukti
                                                </Button>
                                            ) : (
                                                <span className="text-gray-400 text-xs">-</span>
                                            )}
                                        </td>
                                        <td className="p-4 flex items-center gap-2">
                                            <Button size="icon" variant="ghost" className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600">
                                                <Pencil size={16} />
                                            </Button>
                                            <Button size="icon" variant="ghost" className="bg-red-100 hover:bg-red-200 text-red-600">
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
