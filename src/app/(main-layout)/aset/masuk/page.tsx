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

export default function AsetMasukPage() {
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
            vendor: "PT. Mesin Jaya",
            stok: 2,
            satuan: "Unit",
            expired: "20 April 2030",
            lokasi: "Gudang A",
            kondisi: "Tidak Rusak",
            harga: "Rp 25.000.000",
        },
        {
            no: 2,
            nama: "Oli Hidrolik",
            tanggal: "09 April 2025",
            vendor: "PT. Fluida Mesin",
            stok: 30,
            satuan: "Liter",
            expired: "09 April 2026",
            lokasi: "Rak B3",
            kondisi: "Tidak Rusak",
            harga: "Rp 150.000",
        },
        {
            no: 3,
            nama: "Baut & Mur",
            tanggal: "29 April 2025",
            vendor: "CV. Baja Kuat",
            stok: 200,
            satuan: "Pcs",
            expired: "-",
            lokasi: "Rak C2",
            kondisi: "Tidak Rusak",
            harga: "Rp 500",
        },
        {
            no: 4,
            nama: "Kompresor Udara",
            tanggal: "09 Mei 2025",
            vendor: "CV. Udara Power",
            stok: 30,
            satuan: "Liter",
            expired: "09 Mei 2028",
            lokasi: "Gudang B",
            kondisi: "Rusak",
            harga: "Rp 8.000.000",
        },
        {
            no: 5,
            nama: "Bor Duduk",
            tanggal: "14 Juni 2025",
            vendor: "UD. Perkakas",
            stok: 5,
            satuan: "Unit",
            expired: "-",
            lokasi: "Workshop",
            kondisi: "Tidak Rusak",
            harga: "Rp 3.500.000",
        },
        {
            no: 6,
            nama: "Bearing SKF",
            tanggal: "23 Juli 2025",
            vendor: "PT. Bearing Indo",
            stok: 30,
            satuan: "Pcs",
            expired: "23 Juli 2027",
            lokasi: "Rak D1",
            kondisi: "Tidak Rusak",
            harga: "Rp 80.000",
        },
        {
            no: 7,
            nama: "Tangki Oli",
            tanggal: "09 Mei 2025",
            vendor: "PT. Pelumas Indo",
            stok: 10,
            satuan: "Liter",
            expired: "-",
            lokasi: "Gudang C",
            kondisi: "Rusak",
            harga: "Rp 1.000.000",
        },
        {
            no: 8,
            nama: "Kunci Inggris",
            tanggal: "05 Juni 2025",
            vendor: "Toko Teknik Maju",
            stok: 15,
            satuan: "Unit",
            expired: "-",
            lokasi: "Rak A1",
            kondisi: "Tidak Rusak",
            harga: "Rp 250.000",
        },
        {
            no: 9,
            nama: "Palu Besi",
            tanggal: "18 Juni 2025",
            vendor: "CV. Baja Kuat",
            stok: 10,
            satuan: "Unit",
            expired: "-",
            lokasi: "Rak B1",
            kondisi: "Tidak Rusak",
            harga: "Rp 150.000",
        },
        {
            no: 10,
            nama: "Tang Kombinasi",
            tanggal: "25 Juni 2025",
            vendor: "UD. Perkakas",
            stok: 12,
            satuan: "Unit",
            expired: "-",
            lokasi: "Rak A3",
            kondisi: "Tidak Rusak",
            harga: "Rp 120.000",
        },
    ];

    const filteredData = data.filter((item) => {
        const matchMonth =
            selectedMonth === "Semua" ||
            item.tanggal.toLowerCase().includes(selectedMonth.toLowerCase());

        const matchSearch =
            item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.vendor.toLowerCase().includes(searchQuery.toLowerCase());

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
                        Manajemen Aset Masuk
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
                                    {allMonths.map((month) => (
                                        <SelectItem key={month} value={month}>
                                            {month}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <Button
                            onClick={() => router.push("/aset/masuk/add")}
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
                                <th className="p-4">Tanggal Masuk</th>
                                <th className="p-4">Tanggal Expired</th>
                                <th className="p-4">Vendor</th>
                                <th className="p-4">Lokasi</th>
                                <th className="p-4">Kondisi</th>
                                <th className="p-4">Harga</th>
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
                                    <td className="p-4">{item.expired}</td>
                                    <td className="p-4">{item.vendor}</td>
                                    <td className="p-4">{item.lokasi}</td>
                                    <td className="p-4">{item.kondisi}</td>
                                    <td className="p-4">{item.harga}</td>
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
