"use client";

import { useState } from "react";
import { DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export default function TransaksiSemuaPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedBulan, setSelectedBulan] = useState(() => {
        const now = new Date();
        return String(now.getMonth() + 1).padStart(2, "0"); // ex: "04"
    });

    const transaksiMasuk = [
        { tanggal: "2025-01-15", jenis: "Masuk", pihak: "Donatur A", nominal: 1200000, keterangan: "Donasi Buku" },
        { tanggal: "2025-02-01", jenis: "Masuk", pihak: "Sponsor X", nominal: 4000000, keterangan: "Sponsor Event" },
        { tanggal: "2025-03-10", jenis: "Masuk", pihak: "PT ABC", nominal: 5000000, keterangan: "CSR Program" },
        { tanggal: "2025-04-20", jenis: "Masuk", pihak: "Universitas Muhammadiyah Yogyakarta", nominal: 9500000, keterangan: "Pendanaan Alat" },
        { tanggal: "2025-05-25", jenis: "Masuk", pihak: "Alumni FT", nominal: 7500000, keterangan: "Bantuan Alumni" },
        { tanggal: "2025-06-03", jenis: "Masuk", pihak: "Dikti", nominal: 10000000, keterangan: "Hibah Penelitian" },
        { tanggal: "2025-07-12", jenis: "Masuk", pihak: "Yayasan ABC", nominal: 3000000, keterangan: "Bantuan Sosial" },
        { tanggal: "2025-08-18", jenis: "Masuk", pihak: "Sponsor Y", nominal: 2000000, keterangan: "Pendanaan Lomba" },
        { tanggal: "2025-09-05", jenis: "Masuk", pihak: "Kementerian", nominal: 8000000, keterangan: "Pendanaan Digitalisasi" },
        { tanggal: "2025-10-11", jenis: "Masuk", pihak: "PT XYZ", nominal: 6000000, keterangan: "Pelatihan SDM" },
    ];

    const transaksiKeluar = [
        { tanggal: "2025-01-20", jenis: "Keluar", pihak: "Pembelian Buku", nominal: 1000000, keterangan: "Kebutuhan Perpustakaan" },
        { tanggal: "2025-02-14", jenis: "Keluar", pihak: "Biaya Event", nominal: 2500000, keterangan: "Dekorasi & Konsumsi" },
        { tanggal: "2025-03-11", jenis: "Keluar", pihak: "Kementrian Pendidikan", nominal: 25000000, keterangan: "Pengembangan Lab" },
        { tanggal: "2025-04-28", jenis: "Keluar", pihak: "Vendor Mesin", nominal: 15000000, keterangan: "Pembelian CNC" },
        { tanggal: "2025-05-30", jenis: "Keluar", pihak: "Workshop", nominal: 5000000, keterangan: "Pelatihan Mahasiswa" },
        { tanggal: "2025-06-12", jenis: "Keluar", pihak: "Fakultas Teknik", nominal: 4000000, keterangan: "Pendanaan Penelitian" },
        { tanggal: "2025-06-12", jenis: "Keluar", pihak: "Pengadaan Suku Cadang", nominal: 3500000, keterangan: "Alat Praktikum" },
        { tanggal: "2025-07-01", jenis: "Keluar", pihak: "PT Pembersih", nominal: 3000000, keterangan: "Cleaning Service" },
        { tanggal: "2025-08-22", jenis: "Keluar", pihak: "Internet & IT", nominal: 7000000, keterangan: "Upgrade Infrastruktur" },
        { tanggal: "2025-09-13", jenis: "Keluar", pihak: "Pelatihan", nominal: 3500000, keterangan: "Workshop SDM" },
    ];

    const semuaTransaksi = [...transaksiMasuk, ...transaksiKeluar]
        .sort((a, b) => new Date(a.tanggal).getTime() - new Date(b.tanggal).getTime())
        .map((item, index) => ({ no: index + 1, ...item }));

    const filteredData = semuaTransaksi.filter((item) => {
        const cocokSearch =
            item.pihak.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.keterangan.toLowerCase().includes(searchQuery.toLowerCase());

        const itemMonth = new Date(item.tanggal).getMonth() + 1;
        const itemBulanStr = String(itemMonth).padStart(2, "0");

        const cocokBulan = selectedBulan === "Semua" || itemBulanStr === selectedBulan;

        return cocokSearch && cocokBulan;
    });

    const totalMasuk = filteredData
        .filter((item) => item.jenis === "Masuk")
        .reduce((sum, item) => sum + item.nominal, 0);

    const totalKeluar = filteredData
        .filter((item) => item.jenis === "Keluar")
        .reduce((sum, item) => sum + item.nominal, 0);

    const totalSaldo = totalMasuk - totalKeluar;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <DollarSign className="w-5 h-5" />
                    Semua Transaksi Keuangan
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10 space-y-6">
                {/* Filter dan Search */}
                <div className="flex flex-col lg:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-2 text-sm flex-wrap w-full lg:w-auto">
                        <Select value={selectedBulan} onValueChange={setSelectedBulan}>
                            <SelectTrigger className="w-[160px] bg-white text-black">
                                <SelectValue placeholder="Bulan" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Semua">Semua</SelectItem>
                                <SelectItem value="01">Januari</SelectItem>
                                <SelectItem value="02">Februari</SelectItem>
                                <SelectItem value="03">Maret</SelectItem>
                                <SelectItem value="04">April</SelectItem>
                                <SelectItem value="05">Mei</SelectItem>
                                <SelectItem value="06">Juni</SelectItem>
                                <SelectItem value="07">Juli</SelectItem>
                                <SelectItem value="08">Agustus</SelectItem>
                                <SelectItem value="09">September</SelectItem>
                                <SelectItem value="10">Oktober</SelectItem>
                                <SelectItem value="11">November</SelectItem>
                                <SelectItem value="12">Desember</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <Input
                        type="text"
                        placeholder="Cari transaksi..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                    />
                </div>

                {/* Tabel */}
                <Card>
                    <CardHeader>
                        <CardTitle className="text-red-700">Daftar Semua Transaksi</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-auto px-0">
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">No</th>
                                    <th className="p-4">Tanggal</th>
                                    <th className="p-4">Jenis</th>
                                    <th className="p-4">Pihak Terkait</th>
                                    <th className="p-4">Keterangan</th>
                                    <th className="p-4">Nominal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredData.map((item) => (
                                    <tr key={item.no} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.no}</td>
                                        <td className="p-4">{item.tanggal}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${item.jenis === "Masuk" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                {item.jenis}
                                            </span>
                                        </td>
                                        <td className="p-4">{item.pihak}</td>
                                        <td className="p-4">{item.keterangan}</td>
                                        <td className="p-4">Rp {item.nominal.toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="bg-gray-100 font-semibold text-sm">
                                    <td className="p-4 text-center" colSpan={5}>
                                        Total Bulan Ini
                                    </td>
                                    <td className="p-4">
                                        <div className={`font-bold ${totalSaldo >= 0 ? "text-green-700" : "text-red-700"}`}>
                                            = Rp {totalSaldo.toLocaleString()}
                                        </div>
                                    </td>
                                </tr>
                            </tfoot>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
