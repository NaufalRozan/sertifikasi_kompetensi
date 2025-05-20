"use client";

import { useState, useEffect } from "react";
import { DollarSign, Pencil, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Transaksi {
    no: number;
    tanggal: string;
    deskripsi: string;
    nominal: number;
    approval1: string;
    approval2: string;
}

export default function OtoritasKeuanganPage() {
    const router = useRouter();

    const initialData: Transaksi[] = Array.from({ length: 20 }, (_, i) => ({
        no: i + 1,
        tanggal: `2025-06-${String((i % 28) + 1).padStart(2, "0")}`,
        deskripsi: `Pengeluaran ${i + 1}`,
        nominal: 1000000 * (i + 1),
        approval1: i % 3 === 0 ? "Ditolak" : "Diterima",
        approval2: i % 4 === 0 ? "Ditolak" : "Diterima",
    }));

    const [data, setData] = useState<Transaksi[]>(initialData);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const handleApprovalChange = (
        index: number,
        field: "approval1" | "approval2",
        value: string
    ) => {
        const newData = [...data];
        newData[index][field] = value;
        setData(newData);
    };

    const filteredData = data.filter(
        (item) =>
            item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.tanggal.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-between items-center text-xl font-semibold">
                    <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5" />
                        Manajemen Keuangan
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative space-y-4 px-4 pb-10">
                <h2 className="text-lg font-semibold text-white">Otoritas Keuangan</h2>
                <Input
                    type="text"
                    placeholder="Cari..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                />

                <Card>
                    <CardContent className="overflow-auto px-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">No</th>
                                    <th className="p-4">Tanggal</th>
                                    <th className="p-4">Deskripsi</th>
                                    <th className="p-4">Nominal</th>
                                    <th className="p-4">Approval Komisaris</th>
                                    <th className="p-4">Approval Direktur</th>
                                    <th className="p-4">Receipt</th>
                                    <th className="p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item, i) => (
                                    <tr key={item.no} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.no}</td>
                                        <td className="p-4">{item.tanggal}</td>
                                        <td className="p-4">{item.deskripsi}</td>
                                        <td className="p-4">Rp {item.nominal.toLocaleString()}</td>
                                        <td className="p-4">
                                            <select
                                                value={item.approval1}
                                                onChange={(e) =>
                                                    handleApprovalChange(
                                                        data.indexOf(item),
                                                        "approval1",
                                                        e.target.value
                                                    )
                                                }
                                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                                            >
                                                <option value="Diterima">Diterima</option>
                                                <option value="Ditolak">Ditolak</option>
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <select
                                                value={item.approval2}
                                                onChange={(e) =>
                                                    handleApprovalChange(
                                                        data.indexOf(item),
                                                        "approval2",
                                                        e.target.value
                                                    )
                                                }
                                                className="border border-gray-300 rounded px-2 py-1 text-sm"
                                            >
                                                <option value="Diterima">Diterima</option>
                                                <option value="Ditolak">Ditolak</option>
                                            </select>
                                        </td>
                                        <td className="p-4">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="bg-gray-100 hover:bg-gray-200"
                                            >
                                                <Upload size={16} />
                                            </Button>
                                        </td>
                                        <td className="p-4 flex items-center gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="bg-yellow-100 text-yellow-600 hover:bg-yellow-200"
                                            >
                                                <Pencil size={16} />
                                            </Button>
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                className="bg-red-100 text-red-600 hover:bg-red-200"
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
                                disabled={currentPage === 1}
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
                                disabled={currentPage === totalPages}
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
