"use client";

import { useState } from "react";
import { Building2, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

export default function VendorPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");

    const data = [
        {
            no: 1,
            nama: "PT. Mesin Jaya",
            email: "mesinjaya@email.com",
            telepon: "021-12345678",
            alamat: "Jl. Industri No. 10, Jakarta",
        },
        {
            no: 2,
            nama: "CV. Baja Kuat",
            email: "bajakuat@email.com",
            telepon: "021-22334455",
            alamat: "Jl. Baja Raya No. 5, Surabaya",
        },
        {
            no: 3,
            nama: "UD. Perkakas",
            email: "perkakas@ud.com",
            telepon: "031-99887766",
            alamat: "Jl. Alat No. 2, Bandung",
        },
        {
            no: 4,
            nama: "PT. Pelumas Indo",
            email: "pelumasindo@pt.com",
            telepon: "022-55667788",
            alamat: "Jl. Pelumas No. 77, Bekasi",
        },
        {
            no: 5,
            nama: "CV. Udara Power",
            email: "udarapower@cv.com",
            telepon: "0341-1239876",
            alamat: "Jl. Kompresor No. 8, Malang",
        },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-between items-center text-xl font-semibold">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Manajemen Vendor
                    </div>
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">

                {/* Filter dan Tambah */}
                <div className="flex flex-col gap-4 mb-4">
                    {/* Baris Atas: Button Tambah */}
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div />
                        <Button
                            onClick={() => router.push("/vendor/add")}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            + Tambah Vendor
                        </Button>
                    </div>

                    {/* Baris Bawah: Search */}
                    <Input
                        type="text"
                        placeholder="Cari vendor..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                    />
                </div>

                {/* Tabel */}
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">No</th>
                                <th className="p-4">Nama Vendor</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Telepon</th>
                                <th className="p-4">Alamat</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {data
                                .filter((vendor) =>
                                    vendor.nama.toLowerCase().includes(searchQuery.toLowerCase())
                                )
                                .map((vendor) => (
                                    <tr key={vendor.no} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{vendor.no}</td>
                                        <td className="p-4">{vendor.nama}</td>
                                        <td className="p-4">{vendor.email}</td>
                                        <td className="p-4">{vendor.telepon}</td>
                                        <td className="p-4">{vendor.alamat}</td>
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

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 py-4">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">
                            &lt;
                        </Button>
                        <Button size="sm" className="bg-red-700 text-white text-xs">01</Button>
                        <Button variant="link" size="sm">02</Button>
                        <Button variant="link" size="sm">03</Button>
                        <span className="text-sm text-gray-500">...</span>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">
                            &gt;
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
