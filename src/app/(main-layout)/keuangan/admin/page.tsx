"use client";

import { useState } from "react";
import { DollarSign, Pencil, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";

export default function AdminMenuPage() {
    const router = useRouter();
    const [selectedMonth, setSelectedMonth] = useState("April");

    const [data, setData] = useState([
        {
            no: 1,
            tanggal: "20 April 2025",
            deskripsi: "Pembelian peralatan Lab",
            nominal: 10500000,
            approval: "Diterima",
        },
        {
            no: 2,
            tanggal: "11 Maret 2025",
            deskripsi: "Perawatan Mesin",
            nominal: 5000000,
            approval: "Ditolak",
        },
        {
            no: 3,
            tanggal: "12 Juni 2025",
            deskripsi: "Biaya Registrasi Lomba",
            nominal: 1800000,
            approval: "Diterima",
        },
        {
            no: 4,
            tanggal: "12 Juni 2025",
            deskripsi: "Universitas Muhammadiyah Yogyakarta",
            nominal: 5800000,
            approval: "Diterima",
        },
        {
            no: 5,
            tanggal: "12 Juni 2025",
            deskripsi: "Pengadaan Suku Cadang",
            nominal: 3500000,
            approval: "Diterima",
        },
        {
            no: 6,
            tanggal: "12 Juni 2025",
            deskripsi: "Pengadaan Material Praktikum",
            nominal: 4000000,
            approval: "Diterima",
        },
    ]);

    const handleApprovalChange = (index: number, value: string) => {
        const newData = [...data];
        newData[index].approval = value;
        setData(newData);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-between items-center text-xl font-semibold">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Manajemen Keuangan
                    </div>
                    {/* Optional: Add a button if needed */}
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative space-y-4">
                {/* Judul Menu */}
                <h2 className="text-lg font-semibold text-red-700 px-2">Admin Menu</h2>

                {/* Tabel */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">No</th>
                                <th className="p-4">Tanggal</th>
                                <th className="p-4">Deskripsi</th>
                                <th className="p-4">Nominal</th>
                                <th className="p-4">Approval</th>
                                <th className="p-4">Receipt</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, i) => (
                                <tr key={item.no} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.no}</td>
                                    <td className="p-4">{item.tanggal}</td>
                                    <td className="p-4">{item.deskripsi}</td>
                                    <td className="p-4">Rp {item.nominal.toLocaleString()}</td>
                                    <td className="p-4">
                                        <select
                                            value={item.approval}
                                            onChange={(e) => handleApprovalChange(i, e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 text-sm"
                                        >
                                            <option value="Diterima">Diterima</option>
                                            <option value="Ditolak">Ditolak</option>
                                        </select>
                                    </td>
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
