"use client";

import { useState } from "react";
import { Pencil, Trash2, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function SertifikasiPage() {
    const router = useRouter();
    const [selectedSertifikasi, setSelectedSertifikasi] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const data = [
        { no: 1, kode: "CERT-011", nama: "K3 Mekanik", tersertifikasi: 15, terdaftar: 36 },
        { no: 2, kode: "CERT-012", nama: "K3 Lingkungan Kerja", tersertifikasi: 13, terdaftar: 25 },
        { no: 3, kode: "CERT-013", nama: "K3 Engineering", tersertifikasi: 20, terdaftar: 28 },
        { no: 4, kode: "CERT-014", nama: "K3 Umum", tersertifikasi: 19, terdaftar: 22 },
        { no: 5, kode: "CERT-015", nama: "Welding Inspector (CWI)", tersertifikasi: 27, terdaftar: 31 },
        { no: 6, kode: "CERT-016", nama: "NDT Level II", tersertifikasi: 28, terdaftar: 29 },
        { no: 7, kode: "CERT-017", nama: "ISO 9001 Auditor", tersertifikasi: 12, terdaftar: 18 },
        { no: 8, kode: "CERT-018", nama: "ISO 14001 Auditor", tersertifikasi: 14, terdaftar: 20 },
        { no: 9, kode: "CERT-019", nama: "First Aid Training", tersertifikasi: 17, terdaftar: 24 },
        { no: 10, kode: "CERT-020", nama: "Fire Safety", tersertifikasi: 16, terdaftar: 22 },
    ];

    const uniqueNama = Array.from(new Set(data.map((item) => item.nama)));

    const filteredData = data.filter((item) => {
        const matchesNama =
            selectedSertifikasi === "Semua" || item.nama === selectedSertifikasi;
        const matchesSearch =
            item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.kode.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesNama && matchesSearch;
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
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Book className="w-5 h-5" />
                    Manajemen Sertifikasi
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
                {/* Filter dan Tambah */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-white">
                            <Label htmlFor="sertifikasi" className="text-white whitespace-nowrap">
                                Nama Sertifikasi:
                            </Label>
                            <Select value={selectedSertifikasi} onValueChange={(value) => { setSelectedSertifikasi(value); setCurrentPage(1); }}>
                                <SelectTrigger className="w-[250px] bg-white text-black">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Semua">Semua</SelectItem>
                                    {uniqueNama.map((nama) => (
                                        <SelectItem key={nama} value={nama}>
                                            {nama}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button
                            onClick={() => router.push("/manajemen-sertifikasi/add")}
                            className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                        >
                            + Tambah Sertifikasi
                        </Button>
                    </div>
                    <Input
                        type="text"
                        placeholder="Cari sertifikasi..."
                        value={searchQuery}
                        onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                        className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                    />
                </div>

                {/* Tabel */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">No</th>
                                <th className="p-4">Kode</th>
                                <th className="p-4">Nama</th>
                                <th className="p-4">Tersertifikasi</th>
                                <th className="p-4">Terdaftar</th>
                                <th className="p-4">Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item) => (
                                <tr key={item.no} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.no}</td>
                                    <td className="p-4">{item.kode}</td>
                                    <td className="p-4">{item.nama}</td>
                                    <td className="p-4">{item.tersertifikasi}</td>
                                    <td className="p-4">{item.terdaftar}</td>
                                    <td className="p-4 flex items-center gap-2">
                                        <Button size="icon" variant="ghost" className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600">
                                            <Pencil size={16} />
                                        </Button>
                                        <Button size="icon" variant="ghost" className="bg-red-100 hover:bg-red-200 text-red-600">
                                            <Trash2 size={16} />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 py-4">
                        <Button variant="ghost" size="sm" onClick={() => handlePageChange(currentPage - 1)}>&lt;</Button>
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
                        <Button variant="ghost" size="sm" onClick={() => handlePageChange(currentPage + 1)}>&gt;</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
