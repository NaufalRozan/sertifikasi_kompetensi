"use client";

import { Box } from "lucide-react";
import { useRouter } from "next/navigation";

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

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Box className="w-5 h-5" />
                    Manajemen Aset
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative space-y-6">
                {/* Statistik dan Tombol */}
                <div className="flex justify-between items-center bg-white shadow-md rounded-2xl p-6">
                    <div className="flex gap-12 items-center text-center w-full">
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">Aset masuk bulan ini</p>
                            <p className="text-3xl font-semibold text-gray-700">93</p>
                        </div>
                        <div className="w-[1px] h-12 bg-gray-200" />
                        <div className="flex-1">
                            <p className="text-sm text-gray-500">Aset keluar bulan ini</p>
                            <p className="text-3xl font-semibold text-gray-700">43</p>
                        </div>
                        <div className="w-[1px] h-12 bg-gray-200" />
                        <div className="flex flex-col gap-2">
                            <button
                                onClick={() => router.push("/aset/masuk")}
                                className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700"
                            >
                                Aset Masuk
                            </button>
                            <button
                                onClick={() => router.push("/aset/keluar")}
                                className="bg-blue-600 text-white px-4 py-2 text-sm rounded-md hover:bg-blue-700"
                            >
                                Aset Keluar
                            </button>
                        </div>
                    </div>
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
                        <button className="text-gray-500 hover:text-red-700">&lt;</button>
                        <button className="w-7 h-7 rounded-full bg-red-700 text-white text-xs font-medium">
                            01
                        </button>
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
