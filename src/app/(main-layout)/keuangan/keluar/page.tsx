"use client";

import { useState } from "react";
import { DollarSign, Pencil, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function KeuanganKeluarPage() {
    const router = useRouter();
    const [selectedMonth, setSelectedMonth] = useState("April");

    const data = [
        {
            no: 1,
            tanggal: "20 April 2025",
            deskripsi: "Pembelian peralatan Lab",
            nominal: 9500000,
            keterangan: "Pendanaan Alat",
        },
        {
            no: 2,
            tanggal: "11 Maret 2025",
            deskripsi: "Perawatan Mesin",
            nominal: 25000000,
            keterangan: "Pengembangan Lab",
        },
        {
            no: 3,
            tanggal: "12 Juni 2025",
            deskripsi: "Biaya Registrasi Lomba",
            nominal: 1800000,
            keterangan: "Pendanaan Kompetisi Inovasi",
        },
        {
            no: 4,
            tanggal: "12 Juni 2025",
            deskripsi: "Universitas Muhammadiyah Yogyakarta",
            nominal: 5800000,
            keterangan: "Bantuan Pemeliharaan Alat",
        },
        {
            no: 5,
            tanggal: "12 Juni 2025",
            deskripsi: "Pengadaan Suku Cadang",
            nominal: 3500000,
            keterangan: "Bantuan Peralatan Praktikum",
        },
        {
            no: 6,
            tanggal: "12 Juni 2025",
            deskripsi: "Pengadaan Material Praktikum",
            nominal: 4000000,
            keterangan: "Pendanaan untuk Penelitian",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-between items-center text-xl font-semibold">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Manajemen Keuangan Keluar
                    </div>
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative">
                {/* Filter */}
                <div className="flex justify-between mb-4">
                    <div className="flex justify-start text-white text-sm mb-2">
                        <label htmlFor="bulan" className="mr-2 font-medium">
                            Bulan :
                        </label>
                        <select
                            id="bulan"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                            className="text-black border border-gray-300 rounded px-3 py-1"
                        >
                            <option>Januari</option>
                            <option>Februari</option>
                            <option>Maret</option>
                            <option>April</option>
                            <option>Mei</option>
                            <option>Juni</option>
                        </select>
                    </div>

                    <button
                        onClick={() => router.push("/keuangan/keluar/add")}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium shadow transition duration-200"
                    >
                        + Tambah Transaksi
                    </button>
                </div>

                {/* Tabel */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">No</th>
                                <th className="p-4">Tanggal</th>
                                <th className="p-4">Deskripsi</th>
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
                                    <td className="p-4">{item.deskripsi}</td>
                                    <td className="p-4">Rp {item.nominal.toLocaleString()}</td>
                                    <td className="p-4">{item.keterangan}</td>
                                    <td className="p-4">
                                        <button className="bg-gray-100 p-2 rounded hover:bg-gray-200">
                                            <Upload size={16} />
                                        </button>
                                    </td>
                                    <td className="p-4 flex items-center gap-2">
                                        <button className="p-1 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200">
                                            <Pencil size={16} />
                                        </button>
                                        <button className="p-1 rounded-full bg-red-100 text-red-600 hover:bg-red-200">
                                            <Trash2 size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 py-4">
                        <button className="text-gray-500 hover:text-red-700">&lt;</button>
                        <button className="w-7 h-7 rounded-full bg-red-700 text-white text-xs font-medium">01</button>
                        <button className="text-sm hover:underline">02</button>
                        <button className="text-sm hover:underline">03</button>
                        <span className="text-sm text-gray-500">...</span>
                        <button className="text-gray-500 hover:text-red-700">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
