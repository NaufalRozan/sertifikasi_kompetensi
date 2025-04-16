"use client";

import { useState } from "react";
import { Bookmark, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

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
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-between items-center text-xl font-semibold">
                    <div className="flex items-center gap-2">
                        <Bookmark className="w-5 h-5" />
                        Manajemen Aset Masuk
                    </div>
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative">
                {/* Filter Bulan */}
                <div className="flex justify-between mb-4">
                    <div className="text-sm flex items-center gap-2 text-white">
                        <label htmlFor="bulan" className="font-medium">
                            Bulan :
                        </label>
                        <select
                            id="bulan"
                            className="text-black border border-gray-300 rounded px-3 py-1 text-sm"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            <option>April</option>
                            <option>Mei</option>
                            <option>Juni</option>
                            <option>Juli</option>
                            <option>Agustus</option>
                        </select>
                    </div>
                    <button
                        onClick={() => router.push("/aset/masuk/add")}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium shadow transition duration-200"
                    >
                        + Tambah Aset
                    </button>
                </div>

                {/* Tabel */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
