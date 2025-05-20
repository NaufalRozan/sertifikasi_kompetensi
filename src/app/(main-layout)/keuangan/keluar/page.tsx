"use client";

import { useState, useEffect } from "react";
import { DollarSign, Pencil, Trash2, Upload } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
} from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { jsPDF } from "jspdf";

interface Pengeluaran {
    no: number;
    tanggal: string;
    deskripsi: string;
    nominal: number;
    keterangan: string;
}

export default function KeuanganKeluarPage() {
    const router = useRouter();
    const [selectedMonth, setSelectedMonth] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const data: Pengeluaran[] = [
        { no: 1, tanggal: "2025-04-20", deskripsi: "Pembelian Lab", nominal: 9500000, keterangan: "Alat Laboratorium" },
        { no: 2, tanggal: "2025-03-11", deskripsi: "Perawatan Mesin", nominal: 25000000, keterangan: "Servis Mesin CNC" },
        { no: 3, tanggal: "2025-06-12", deskripsi: "Biaya Lomba", nominal: 1800000, keterangan: "Inovasi Mahasiswa" },
        { no: 4, tanggal: "2025-06-13", deskripsi: "Pemeliharaan Alat", nominal: 5800000, keterangan: "Preventive Maintenance" },
        { no: 5, tanggal: "2025-06-14", deskripsi: "Suku Cadang", nominal: 3500000, keterangan: "Penggantian Sparepart" },
        { no: 6, tanggal: "2025-06-15", deskripsi: "Material Praktikum", nominal: 4000000, keterangan: "Bahan Praktikum" },
        { no: 7, tanggal: "2025-05-22", deskripsi: "Maintenance Software", nominal: 8000000, keterangan: "Perpanjangan Lisensi" },
        { no: 8, tanggal: "2025-05-30", deskripsi: "Pembersihan Lab", nominal: 7000000, keterangan: "Cleaning Service" },
        { no: 9, tanggal: "2025-07-01", deskripsi: "Upgrade Jaringan", nominal: 12000000, keterangan: "Infrastruktur IT" },
        { no: 10, tanggal: "2025-07-03", deskripsi: "Pelatihan SDM", nominal: 9500000, keterangan: "Workshop Internal" },
    ];

    const monthNameToNumber: Record<string, number> = {
        Januari: 1, Februari: 2, Maret: 3, April: 4, Mei: 5,
        Juni: 6, Juli: 7, Agustus: 8, September: 9, Oktober: 10,
        November: 11, Desember: 12,
    };

    const filterByMonth = (data: Pengeluaran[]) => {
        if (selectedMonth === "Semua") return data;
        const monthNumber = monthNameToNumber[selectedMonth];
        return data.filter((item) => {
            const date = new Date(item.tanggal);
            return date.getMonth() + 1 === monthNumber;
        });
    };

    const filteredData = filterByMonth(data).filter(
        (item) =>
            item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.keterangan.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredData.length / itemsPerPage);
    const paginatedData = filteredData.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery, selectedMonth]);

    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) setCurrentPage(page);
    };

    // Fungsi PDF tidak diubah
    const previewExpenseInvoicePDF = (transaction: Pengeluaran) => {
        const doc = new jsPDF();
        const marginX = 20;
        let currentY = 20;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(14);
        doc.text("UNIVERSITAS MUHAMMADIYAH YOGYAKARTA", 105, currentY, { align: "center" });
        currentY += 7;
        doc.setFontSize(11);
        doc.setFont("helvetica", "normal");
        doc.text("Jl. Brawijaya, Kasihan, Bantul, Yogyakarta", 105, currentY, { align: "center" });

        currentY += 10;
        doc.setLineWidth(0.5);
        doc.line(marginX, currentY, 210 - marginX, currentY);
        currentY += 10;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("INVOICE PENGELUARAN DANA", 105, currentY, { align: "center" });
        currentY += 10;
        doc.line(marginX, currentY, 210 - marginX, currentY);
        currentY += 10;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        const info = [
            ["Tanggal", transaction.tanggal],
            ["Deskripsi", transaction.deskripsi],
            ["Nominal", `Rp ${transaction.nominal.toLocaleString()}`],
            ["Keterangan", transaction.keterangan],
        ];

        const labelX = marginX;
        const valueX = marginX + 45;

        info.forEach(([label, value]) => {
            doc.text(`${label}`, labelX, currentY);
            doc.text(":", labelX + 30, currentY);
            doc.text(`${value}`, valueX, currentY);
            currentY += 8;
        });

        currentY += 10;
        doc.line(marginX, currentY, 210 - marginX, currentY);
        currentY += 10;

        doc.text(`Yogyakarta, ${new Date().toLocaleDateString()}`, 140, currentY);
        currentY += 25;
        doc.text("________________________", 140, currentY);
        currentY += 7;
        doc.text("Tanda Tangan", 155, currentY);

        const blob = doc.output("blob");
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <DollarSign className="w-5 h-5" />
                    Manajemen Keuangan Keluar
                </div>
            </div>

            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
                {/* Filter */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-white">
                            <Label htmlFor="bulan" className="text-white">Bulan:</Label>
                            <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                                <SelectTrigger className="w-[160px] bg-white text-black">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Semua">Semua</SelectItem>
                                    {Object.keys(monthNameToNumber).map((bulan) => (
                                        <SelectItem key={bulan} value={bulan}>{bulan}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <Button onClick={() => router.push("/keuangan/keluar/add")} className="bg-blue-600 text-white">
                            + Tambah Transaksi
                        </Button>
                    </div>

                    <Input
                        type="text"
                        placeholder="Cari transaksi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 px-4 text-sm text-gray-700 bg-white border border-gray-300 rounded-md"
                    />
                </div>

                <Card>
                    <CardContent className="overflow-auto px-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">No</th>
                                    <th className="p-4">Tanggal</th>
                                    <th className="p-4">Deskripsi</th>
                                    <th className="p-4">Nominal</th>
                                    <th className="p-4">Keterangan</th>
                                    <th className="p-4">Invoice</th>
                                    <th className="p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {paginatedData.map((item) => (
                                    <tr key={item.no} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.no}</td>
                                        <td className="p-4">{item.tanggal}</td>
                                        <td className="p-4">{item.deskripsi}</td>
                                        <td className="p-4">Rp {item.nominal.toLocaleString()}</td>
                                        <td className="p-4">{item.keterangan}</td>
                                        <td className="p-4">
                                            <Button
                                                variant="outline"
                                                size="icon"
                                                onClick={() => previewExpenseInvoicePDF(item)}
                                                className="bg-gray-100 hover:bg-gray-200"
                                            >
                                                <Upload size={16} />
                                            </Button>
                                        </td>
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
                            <Button variant="ghost" size="sm" onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
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
                            <Button variant="ghost" size="sm" onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                                &gt;
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
