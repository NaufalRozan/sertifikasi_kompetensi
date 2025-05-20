"use client";

import { useState } from "react";
import { Bookmark, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function AsetKeluarPage() {
    const router = useRouter();
    const [selectedMonth, setSelectedMonth] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const allMonths = [
        "Semua", "Januari", "Februari", "Maret", "April", "Mei", "Juni",
        "Juli", "Agustus", "September", "Oktober", "November", "Desember"
    ];

    const data = [
        {
            no: 1,
            nama: "Mesin Bubut",
            tanggal: "20 April 2025",
            distributor: "PT. Mesin Jaya",
            deskripsi: "Mesin bubut CNC untuk pemesinan presisi.",
            stok: 2,
            satuan: "Unit",
        },
        {
            no: 2,
            nama: "Oli Hidrolik",
            tanggal: "09 April 2025",
            distributor: "PT. Fluida Mesin",
            deskripsi: "Oli hidrolik untuk mesin industri.",
            stok: 30,
            satuan: "Liter",
        },
        {
            no: 3,
            nama: "Baut & Mur",
            tanggal: "29 April 2025",
            distributor: "CV. Baja Kuat",
            deskripsi: "Baut dan mur untuk mesin industri.",
            stok: 200,
            satuan: "Pcs",
        },
        {
            no: 4,
            nama: "Kompresor Udara",
            tanggal: "09 Mei 2025",
            distributor: "CV. Udara Power",
            deskripsi: "Kompresor udara untuk industri.",
            stok: 30,
            satuan: "Liter",
        },
        {
            no: 5,
            nama: "Bor Duduk",
            tanggal: "14 Juni 2025",
            distributor: "UD. Perkakas",
            deskripsi: "Bor duduk untuk pengeboran presisi.",
            stok: 5,
            satuan: "Unit",
        },
        {
            no: 6,
            nama: "Bearing SKF",
            tanggal: "23 Juli 2025",
            distributor: "PT. Bearing Indo",
            deskripsi: "Bearing berkualitas tinggi untuk mesin.",
            stok: 30,
            satuan: "Pcs",
        },
        {
            no: 7,
            nama: "Tangki Oli",
            tanggal: "09 Mei 2025",
            distributor: "PT. Pelumas Indo",
            deskripsi: "Tangki untuk menyimpan oli.",
            stok: 10,
            satuan: "Liter",
        },
        {
            no: 8,
            nama: "Gerinda Tangan",
            tanggal: "12 Juni 2025",
            distributor: "Toko Teknik Maju",
            deskripsi: "Gerinda tangan untuk pemotongan logam.",
            stok: 8,
            satuan: "Unit",
        },
        {
            no: 9,
            nama: "Palu Besi",
            tanggal: "03 Juni 2025",
            distributor: "CV. Perkakas Kuat",
            deskripsi: "Palu besi untuk keperluan bengkel.",
            stok: 20,
            satuan: "Unit",
        },
        {
            no: 10,
            nama: "Kunci Inggris",
            tanggal: "21 Juni 2025",
            distributor: "UD. Peralatan Teknik",
            deskripsi: "Kunci inggris untuk perakitan mesin.",
            stok: 15,
            satuan: "Unit",
        },
    ];

    const filteredData = data.filter((item) => {
        const matchMonth =
            selectedMonth === "Semua" ||
            item.tanggal.toLowerCase().includes(selectedMonth.toLowerCase());

        const matchSearch =
            item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.distributor.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase());

        return matchMonth && matchSearch;
    });

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-between items-center text-xl font-semibold">
                    <div className="flex items-center gap-2">
                        <Bookmark className="w-5 h-5" />
                        Manajemen Aset Keluar
                    </div>
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
                {/* Filter dan Tambah */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-white">
                            <Label htmlFor="bulan" className="text-white">
                                Bulan:
                            </Label>
                            <Select
                                value={selectedMonth}
                                onValueChange={(value) => {
                                    setSelectedMonth(value);
                                    setCurrentPage(1);
                                }}
                            >
                                <SelectTrigger className="w-[160px] bg-white text-black">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {allMonths.map((bulan) => (
                                        <SelectItem key={bulan} value={bulan}>
                                            {bulan}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={() => router.push("/aset/keluar/add")}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            + Tambah Aset
                        </Button>
                    </div>

                    <Input
                        type="text"
                        placeholder="Cari aset..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                    />
                </div>

                {/* Tabel */}
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">No</th>
                                <th className="p-4">Nama Aset</th>
                                <th className="p-4">Tanggal Keluar</th>
                                <th className="p-4">Distributor</th>
                                <th className="p-4">Deskripsi</th>
                                <th className="p-4">Stok</th>
                                <th className="p-4">Satuan</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item) => (
                                <tr key={item.no} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.no}</td>
                                    <td className="p-4">{item.nama}</td>
                                    <td className="p-4">{item.tanggal}</td>
                                    <td className="p-4">{item.distributor}</td>
                                    <td className="p-4">{item.deskripsi}</td>
                                    <td className="p-4">{item.stok}</td>
                                    <td className="p-4">{item.satuan}</td>
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
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePageChange(currentPage - 1)}
                        >
                            &lt;
                        </Button>
                        {Array.from({ length: totalPages }, (_, i) => (
                            <Button
                                key={i}
                                size="sm"
                                variant={currentPage === i + 1 ? "default" : "link"}
                                className={currentPage === i + 1 ? "bg-red-700 text-white text-xs" : ""}
                                onClick={() => handlePageChange(i + 1)}
                            >
                                {String(i + 1).padStart(2, "0")}
                            </Button>
                        ))}
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handlePageChange(currentPage + 1)}
                        >
                            &gt;
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
