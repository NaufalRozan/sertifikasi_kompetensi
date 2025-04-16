"use client";

import { useState } from "react";
import { Pencil, Trash2, Calendar } from "lucide-react";

export default function ProgramPage() {
    const [selectedMonth, setSelectedMonth] = useState("Maret");

    const data = [
        { no: 1, tanggal: "20 April 2025", notulen: "Rapat persiapan kompetensi...", peserta: 12, status: "Selesai" },
        { no: 2, tanggal: "28 Juni 2025", notulen: "Evaluasi Proyek Mesin", peserta: 8, status: "Proses" },
        { no: 3, tanggal: "12 Juli 2025", notulen: "Pengadaan Alat Bengkel", peserta: 15, status: "Selesai" },
        { no: 4, tanggal: "19 April 2025", notulen: "Rapat Kolaborasi dengan Industri Otomotif", peserta: 10, status: "Selesai" },
        { no: 5, tanggal: "03 Mei 2025", notulen: "Workshop 3D Printing", peserta: 20, status: "Dijadwalkan" },
        { no: 6, tanggal: "20 Mei 2025", notulen: "Rapat Evaluasi Magang", peserta: 25, status: "Selesai" },
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
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Calendar className="w-5 h-5" />
                    Program
                </div>
            </div>

            {/* Konten Utama */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative">
                {/* Filter Bulan di kiri */}
                <div className="flex justify-start mb-4">
                    <div className="text-sm flex items-center gap-2">
                        <label htmlFor="bulan" className="font-medium text-white">Bulan :</label>
                        <select
                            id="bulan"
                            className="text-black border border-gray-300 rounded px-3 py-1 text-sm"
                            value={selectedMonth}
                            onChange={(e) => setSelectedMonth(e.target.value)}
                        >
                            <option>Maret</option>
                            <option>April</option>
                            <option>Mei</option>
                            <option>Juni</option>
                            <option>Juli</option>
                        </select>
                    </div>
                </div>

                {/* Tabel */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">No</th>
                                <th className="p-4">Tanggal Rapat</th>
                                <th className="p-4">Notulen</th>
                                <th className="p-4">Peserta</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.no} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.no}</td>
                                    <td className="p-4">{item.tanggal}</td>
                                    <td className="p-4 truncate max-w-xs">{item.notulen}</td>
                                    <td className="p-4">{item.peserta}</td>
                                    <td className="p-4">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${getStatusStyle(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4 space-x-2 flex items-center">
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
