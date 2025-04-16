"use client";

import { useState } from "react";
import { Pencil, Trash2, Book } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SertifikasiPage() {
    const router = useRouter();
    const [selectedSertifikasi, setSelectedSertifikasi] = useState("K3 Mekanik");

    const data = [
        { no: 1, kode: "CERT-011", nama: "K3 Mekanik", tersertifikasi: 15, terdaftar: 36 },
        { no: 2, kode: "CERT-012", nama: "K3 Lingkungan Kerja", tersertifikasi: 13, terdaftar: 25 },
        { no: 3, kode: "CERT-013", nama: "K3 Engineering", tersertifikasi: 20, terdaftar: 28 },
        { no: 4, kode: "CERT-014", nama: "K3 Umum", tersertifikasi: 19, terdaftar: 22 },
        { no: 5, kode: "CERT-015", nama: "Welding Inspector (CWI)", tersertifikasi: 27, terdaftar: 31 },
        { no: 6, kode: "CERT-016", nama: "NDT Level II", tersertifikasi: 28, terdaftar: 29 },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Book className="w-5 h-5" />
                    Manajemen Sertifikasi
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative">
                {/* Filter sertifikasi */}
                <div className="flex justify-between mb-4">
                    <div className="text-sm flex items-center gap-2 text-white">
                        <label htmlFor="sertifikasi" className="font-medium">Nama Sertifikasi :</label>
                        <select
                            id="sertifikasi"
                            className="text-black border border-gray-300 rounded px-3 py-1 text-sm"
                            value={selectedSertifikasi}
                            onChange={(e) => setSelectedSertifikasi(e.target.value)}
                        >
                            <option>K3 Mekanik</option>
                            <option>K3 Lingkungan Kerja</option>
                            <option>K3 Engineering</option>
                            <option>K3 Umum</option>
                            <option>Welding Inspector (CWI)</option>
                            <option>NDT Level II</option>
                        </select>
                    </div>

                    {/* Tombol Tambah Sertifikasi */}
                    <button
                        onClick={() => router.push("/manajemen-sertifikasi/add")}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium shadow transition duration-200"
                    >
                        + Tambah Sertifikasi
                    </button>
                </div>

                {/* Tabel */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">No</th>
                                <th className="p-4">Kode</th>
                                <th className="p-4">Nama</th>
                                <th className="p-4">Peserta Tersertifikasi</th>
                                <th className="p-4">Peserta Terdaftar</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item) => (
                                <tr key={item.no} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.no}</td>
                                    <td className="p-4">{item.kode}</td>
                                    <td className="p-4">{item.nama}</td>
                                    <td className="p-4">{item.tersertifikasi}</td>
                                    <td className="p-4">{item.terdaftar}</td>
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
