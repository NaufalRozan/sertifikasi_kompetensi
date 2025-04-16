"use client";

import { useRouter } from "next/navigation";
import { DollarSign, Pencil, Trash2 } from "lucide-react";

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

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <DollarSign className="w-5 h-5" />
                    Manajemen Keuangan
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative space-y-6">
                {/* Admin Menu Button */}
                <div className="flex justify-end">
                    <button
                        onClick={() => router.push("/keuangan/admin")}
                        className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-4 py-2 rounded-lg font-medium shadow"
                    >
                        Admin Menu
                    </button>
                </div>

                {/* Ringkasan dan Akses Menu */}
                <div className="bg-white shadow-md rounded-2xl p-6 flex justify-between items-center">
                    {/* Kiri - Saldo dan Bar */}
                    <div className="flex flex-col gap-4 text-red-700 w-full max-w-[70%]">
                        <div className="text-xl font-bold">TOTAL SALDO : <span className="text-2xl">25.000.000</span></div>

                        {/* Pemasukan */}
                        <div className="flex items-center gap-4">
                            <span className="w-24 font-semibold">Pemasukan</span>
                            <div className="flex-1 h-4 rounded-full bg-gradient-to-r from-white via-red-200 to-red-700" />
                            <span className="w-28 text-end font-semibold">50.000.000</span>
                        </div>

                        {/* Pengeluaran */}
                        <div className="flex items-center gap-4">
                            <span className="w-24 font-semibold">Pengeluaran</span>
                            <div className="flex-1 h-4 rounded-full bg-gradient-to-r from-white via-red-200 to-red-700 opacity-70" />
                            <span className="w-28 text-end font-semibold">25.000.000</span>
                        </div>
                    </div>

                    {/* Divider */}
                    <div className="h-28 w-px bg-gray-300 mx-6" />

                    {/* Kanan - Menu Lainnya */}
                    <div className="flex flex-col items-center justify-center text-red-700 h-full">
                        <p className="text-md font-semibold mb-2">Menu Lainnya</p>
                        <button
                            onClick={() => router.push("/keuangan/masuk")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-xl w-full mb-2"
                        >
                            Transaksi Masuk
                        </button>
                        <button
                            onClick={() => router.push("/keuangan/keluar")}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm rounded-xl w-full"
                        >
                            Transaksi Keluar
                        </button>
                    </div>
                </div>


                {/* Tabel Transaksi */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                                            <button className="bg-blue-500 text-white text-xs px-3 py-1 rounded-full hover:bg-blue-600">
                                                Lihat Bukti
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-xs">-</span>
                                        )}
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
