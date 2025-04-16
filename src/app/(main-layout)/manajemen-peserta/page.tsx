"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ManajemenPesertaPage() {
    const [selectedSertifikasi, setSelectedSertifikasi] = useState("K3 Umum");

    const data = [
        {
            nim: "20220140177",
            nama: "Rudi Saputra",
            email: "rudi@gmail.com",
            whatsapp: "081338283838",
            sertifikasi: "K3 Mekanik",
            status: "Lulus",
            pdf: true,
            notifikasi: "Terkirim",
        },
        {
            nim: "20220140011",
            nama: "Bayu Pratama",
            email: "bayu@gmail.com",
            whatsapp: "081338283838",
            sertifikasi: "K3 Mekanik",
            status: "-",
            pdf: false,
            notifikasi: "Belum",
        },
        {
            nim: "20220140122",
            nama: "Siti Rahayu",
            email: "siti@gmail.com",
            whatsapp: "081338283838",
            sertifikasi: "K3 Umum",
            status: "Selesai",
            pdf: true,
            notifikasi: "Terkirim",
        },
        {
            nim: "20220140133",
            nama: "Dimas Prasetyo",
            email: "dimas@gmail.com",
            whatsapp: "081338283838",
            sertifikasi: "K3 Engineering",
            status: "Selesai",
            pdf: true,
            notifikasi: "Terkirim",
        },
        {
            nim: "20220140144",
            nama: "Fajar Maulana",
            email: "fajar@gmail.com",
            whatsapp: "081338283838",
            sertifikasi: "NDT Level II",
            status: "Selesai",
            pdf: true,
            notifikasi: "Terkirim",
        },
        {
            nim: "20220140155",
            nama: "Nita Kurniawan",
            email: "nita@gmail.com",
            whatsapp: "081338283838",
            sertifikasi: "Welding Inspector (CWI)",
            status: "-",
            pdf: false,
            notifikasi: "Belum",
        },
    ];

    const getBadgeStyle = (value: string) => {
        switch (value) {
            case "Lulus":
            case "Selesai":
                return "bg-green-100 text-green-700";
            case "Terkirim":
                return "bg-green-100 text-green-700";
            case "Belum":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-500";
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <User className="w-5 h-5" />
                    Manajemen Peserta
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative">
                {/* Filter dan Total */}
                <div className="flex justify-between items-center mb-4">
                    <div className="text-sm flex items-center gap-2 text-white">
                        <label htmlFor="sertifikasi" className="font-medium">
                            Nama Sertifikasi :
                        </label>
                        <select
                            id="sertifikasi"
                            className="text-black border border-gray-300 rounded px-3 py-1 text-sm"
                            value={selectedSertifikasi}
                            onChange={(e) => setSelectedSertifikasi(e.target.value)}
                        >
                            <option>K3 Umum</option>
                            <option>K3 Mekanik</option>
                            <option>K3 Engineering</option>
                            <option>NDT Level II</option>
                            <option>Welding Inspector (CWI)</option>
                        </select>
                    </div>

                    {/* Jumlah Peserta */}
                    <div className="text-sm font-semibold text-white">
                        Jumlah Peserta: <span className="font-bold">{data.length}</span>
                    </div>
                </div>


                {/* Tabel */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">NIM</th>
                                <th className="p-4">Nama</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Whatsapp</th>
                                <th className="p-4">Sertifikasi Terdaftar</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Pdf Sertifikat</th>
                                <th className="p-4">Notifikasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.nim}</td>
                                    <td className="p-4">{item.nama}</td>
                                    <td className="p-4">{item.email}</td>
                                    <td className="p-4">{item.whatsapp}</td>
                                    <td className="p-4">{item.sertifikasi}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(
                                                item.status
                                            )}`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        {item.pdf ? (
                                            <span className="text-red-600 font-semibold text-xs flex items-center gap-1">
                                                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">PDF</span>
                                            </span>
                                        ) : (
                                            "-"
                                        )}
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(
                                                item.notifikasi
                                            )}`}
                                        >
                                            {item.notifikasi}
                                        </span>
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
