"use client";

import { useState } from "react";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";

export default function ManajemenHRDPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const data = [
        { no: 1, nama: "Ahmad Zaky", peran: "Peserta", unit: "Divisi A" },
        { no: 2, nama: "Rina Kartika", peran: "Trainer", unit: "Divisi B" },
        { no: 3, nama: "Budi Santoso", peran: "Pengurus", unit: "Divisi C" },
        { no: 4, nama: "Tari Widya", peran: "Struktur", unit: "Divisi D" },
        { no: 5, nama: "Anwar Yusuf", peran: "Asessor", unit: "Divisi E" },
        { no: 6, nama: "Lia Amalia", peran: "Trainer", unit: "Divisi F" },
        { no: 7, nama: "Fahmi Rahman", peran: "Peserta", unit: "Divisi A" },
        { no: 8, nama: "Dian Sari", peran: "Struktur", unit: "Divisi G" },
        { no: 9, nama: "Yusuf Hidayat", peran: "Pengurus", unit: "Divisi H" },
        { no: 10, nama: "Nina Syafira", peran: "Asessor", unit: "Divisi I" },
    ];

    const filteredData = data.filter((item) =>
        item.nama.toLowerCase().includes(searchQuery.toLowerCase())
    );

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
                <div className="w-full max-w-7xl text-white flex items-center gap-2 text-xl font-semibold">
                    <Users className="w-5 h-5" />
                    Manajemen HRD
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10 space-y-6">
                {/* Statistik */}
                <Card className="shadow-md">
                    <CardContent className="py-6 flex justify-between items-center gap-6 flex-wrap">
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Total Peserta</p>
                            <p className="text-3xl font-semibold text-gray-700">120</p>
                        </div>
                        <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Total Trainer</p>
                            <p className="text-3xl font-semibold text-gray-700">12</p>
                        </div>
                        <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Total Pengurus</p>
                            <p className="text-3xl font-semibold text-gray-700">8</p>
                        </div>
                        <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Total Struktur</p>
                            <p className="text-3xl font-semibold text-gray-700">4</p>
                        </div>
                        <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Total Asessor</p>
                            <p className="text-3xl font-semibold text-gray-700">6</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Search */}
                <Input
                    type="text"
                    placeholder="Cari nama..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                />

                {/* Tabel HRD */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-red-700">Data HRD</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto p-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">No</th>
                                    <th className="p-4">Nama</th>
                                    <th className="p-4">Peran</th>
                                    <th className="p-4">Unit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => (
                                    <tr key={item.no} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.no}</td>
                                        <td className="p-4">{item.nama}</td>
                                        <td className="p-4">{item.peran}</td>
                                        <td className="p-4">{item.unit}</td>
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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
