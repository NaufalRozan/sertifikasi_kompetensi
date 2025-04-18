"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { DollarSign, Pencil, Trash2, TrendingUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardContent,
    CardTitle,
    CardHeader,
    CardFooter,
} from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@/components/ui/chart";
import {
    BarChart,
    Bar,
    CartesianGrid,
    XAxis,
    YAxis,
} from "recharts";

export default function ManajemenKeuanganPage() {
    const router = useRouter();

    const transaksi = [
        {
            no: 1,
            tanggal: "2025-04-20",
            jenis: "Masuk",
            sumber: "Universitas Muhammadiyah Yogyakarta",
            deskripsi: "Pendanaan Alat",
            nominal: 25000000,
            status: "Diterima",
            receipt: true,
        },
        {
            no: 2,
            tanggal: "2025-06-20",
            jenis: "Keluar",
            sumber: "Peralatan CNC",
            deskripsi: "Pembelian Peralatan Lab CNC",
            nominal: 4500000,
            status: "Belum",
            receipt: false,
        },
        {
            no: 3,
            tanggal: "2025-04-10",
            jenis: "Keluar",
            sumber: "Perawatan Mesin",
            deskripsi: "Biaya perawatan mesin uji tarik",
            nominal: 2000000,
            status: "Diterima",
            receipt: true,
        },
    ];

    const [searchQuery, setSearchQuery] = useState("");
    const [periode, setPeriode] = useState("Bulan");

    const filteredTransaksi = transaksi.filter(
        (item) =>
            item.sumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.deskripsi.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalMasuk = transaksi
        .filter((t) => t.jenis === "Masuk")
        .reduce((sum, t) => sum + t.nominal, 0);

    const totalKeluar = transaksi
        .filter((t) => t.jenis === "Keluar")
        .reduce((sum, t) => sum + t.nominal, 0);

    const totalSaldo = totalMasuk - totalKeluar;
    const statusKeuangan = totalSaldo >= 0 ? "Keuntungan" : "Kerugian";

    const filterByPeriode = (tanggal: string) => {
        const date = new Date(tanggal);
        const now = new Date();
        const currentMonth = now.getMonth();
        const currentYear = now.getFullYear();

        if (periode === "Bulan") {
            return date.getMonth() === currentMonth && date.getFullYear() === currentYear;
        } else if (periode === "6 Bulan") {
            const sixMonthsAgo = new Date(currentYear, currentMonth - 5, 1);
            return date >= sixMonthsAgo && date <= now;
        } else if (periode === "Tahun") {
            return date.getFullYear() === currentYear;
        }
        return true;
    };

    const filteredByPeriode = transaksi.filter((t) =>
        filterByPeriode(t.tanggal)
    );

    const totalMasukPeriode = filteredByPeriode
        .filter((t) => t.jenis === "Masuk")
        .reduce((sum, t) => sum + t.nominal, 0);

    const totalKeluarPeriode = filteredByPeriode
        .filter((t) => t.jenis === "Keluar")
        .reduce((sum, t) => sum + t.nominal, 0);

    const saldoPeriode = totalMasukPeriode - totalKeluarPeriode;
    const statusPeriode = saldoPeriode >= 0 ? "Keuntungan" : "Kerugian";

    const chartData = [
        { bulan: "Jan", masuk: 10_000_000, keluar: 6_000_000 },
        { bulan: "Feb", masuk: 12_000_000, keluar: 8_000_000 },
        { bulan: "Mar", masuk: 15_000_000, keluar: 9_000_000 },
        { bulan: "Apr", masuk: 25_000_000, keluar: 5_000_000 },
        { bulan: "Mei", masuk: 18_000_000, keluar: 7_000_000 },
        { bulan: "Jun", masuk: 22_000_000, keluar: 10_000_000 },
    ];

    const chartConfig = {
        masuk: {
            label: "Pemasukan",
            color: "#3B82F6",
        },
        keluar: {
            label: "Pengeluaran",
            color: "#EF4444",
        },
    } satisfies ChartConfig;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <DollarSign className="w-5 h-5" />
                    Manajemen Keuangan
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative space-y-6 px-4 pb-10">
                {/* Admin Menu */}
                <div className="flex justify-end">
                    <Button
                        onClick={() => router.push("/keuangan/admin")}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        Admin Menu
                    </Button>
                </div>

                {/* Card: Saldo & Menu */}
                <Card className="flex flex-col lg:flex-row justify-between items-center gap-6 p-6">
                    <div className="flex flex-col gap-4 text-red-700 w-full lg:w-[70%]">
                        <div className="text-xl font-bold">
                            TOTAL SALDO:{" "}
                            <span className="text-2xl">
                                Rp {totalSaldo.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-24 font-semibold">Pemasukan</span>
                            <div className="flex-1 h-4 rounded-full bg-gradient-to-r from-white via-red-200 to-red-700" />
                            <span className="w-28 text-end font-semibold">
                                Rp {totalMasuk.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-4">
                            <span className="w-24 font-semibold">Pengeluaran</span>
                            <div className="flex-1 h-4 rounded-full bg-gradient-to-r from-white via-red-200 to-red-700 opacity-70" />
                            <span className="w-28 text-end font-semibold">
                                Rp {totalKeluar.toLocaleString()}
                            </span>
                        </div>
                        <div
                            className={`text-md font-semibold mt-2 ${totalSaldo >= 0 ? "text-green-600" : "text-red-600"
                                }`}
                        >
                            Status Cashflow: <span className="font-bold">{statusKeuangan}</span>
                        </div>
                    </div>

                    <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />

                    <div className="flex flex-col items-center justify-center text-red-700 gap-2 w-full lg:w-1/4">
                        <p className="text-md font-semibold">Menu Lainnya</p>
                        <Button onClick={() => router.push("/keuangan/masuk")} className="w-full bg-blue-600">Transaksi Masuk</Button>
                        <Button onClick={() => router.push("/keuangan/keluar")} className="w-full bg-blue-600">Transaksi Keluar</Button>
                        <Button onClick={() => router.push("/keuangan/cashflow")} className="w-full bg-blue-600">Cashflow</Button>
                    </div>
                </Card>

                {/* Card: Statistik Laba/Rugi Periode */}
                <Card className="p-6">
                    <div className="flex justify-between items-center mb-4">
                        <CardTitle className="text-red-700 text-lg">Statistik Laba/Rugi (Berdasarkan Periode)</CardTitle>
                        <Select value={periode} onValueChange={setPeriode}>
                            <SelectTrigger className="w-[140px] bg-white text-black text-sm">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Bulan">Per Bulan</SelectItem>
                                <SelectItem value="6 Bulan">Per 6 Bulan</SelectItem>
                                <SelectItem value="Tahun">Pertahun</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                        <div><span className="font-medium">Total Pemasukan:</span> <span className="text-green-600 font-semibold">Rp {totalMasukPeriode.toLocaleString()}</span></div>
                        <div><span className="font-medium">Total Pengeluaran:</span> <span className="text-red-600 font-semibold">Rp {totalKeluarPeriode.toLocaleString()}</span></div>
                        <div><span className="font-medium">Status:</span>{" "}
                            <span className={`font-bold ${saldoPeriode >= 0 ? "text-green-700" : "text-red-700"}`}>
                                {statusPeriode} (Rp {Math.abs(saldoPeriode).toLocaleString()})
                            </span>
                        </div>
                    </div>
                </Card>

                {/* Chart */}
                <Card>
                    <CardHeader>
                        <CardTitle>Statistik Grafik Keuangan</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <ChartContainer config={chartConfig}>
                            <BarChart data={chartData}>
                                <CartesianGrid vertical={false} />
                                <XAxis
                                    dataKey="bulan"
                                    tickLine={false}
                                    axisLine={false}
                                    tickMargin={10}
                                />
                                <YAxis
                                    tickFormatter={(value) => `Rp ${value / 1_000_000}jt`}
                                    tickLine={false}
                                    axisLine={false}
                                    width={80}
                                />
                                <ChartTooltip content={<ChartTooltipContent indicator="dashed" />} />
                                <Bar dataKey="masuk" fill="#3B82F6" radius={4} />
                                <Bar dataKey="keluar" fill="#EF4444" radius={4} />
                            </BarChart>

                        </ChartContainer>

                    </CardContent>
                    <CardFooter className="flex-col items-start gap-2 text-sm">
                        <div className="flex gap-2 font-medium leading-none">
                            Tren Keuangan Stabil <TrendingUp className="h-4 w-4" />
                        </div>
                        <p className="text-muted-foreground">Data Januari - Juni 2025</p>
                    </CardFooter>
                </Card>

                {/* Search */}
                <Input
                    type="text"
                    placeholder="Cari transaksi..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                />

                {/* Table */}
                <Card>
                    <CardContent className="overflow-auto px-0">
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
                                {filteredTransaksi.map((item) => (
                                    <tr key={item.no} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.no}</td>
                                        <td className="p-4">{item.tanggal}</td>
                                        <td className="p-4">{item.jenis}</td>
                                        <td className="p-4">{item.sumber}</td>
                                        <td className="p-4">{item.deskripsi}</td>
                                        <td className="p-4">Rp {item.nominal.toLocaleString()}</td>
                                        <td className="p-4">
                                            <span className={`text-xs px-3 py-1 font-medium rounded-full ${item.status === "Diterima" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            {item.receipt ? (
                                                <Button variant="secondary" className="text-xs px-3 py-1">Lihat Bukti</Button>
                                            ) : (
                                                <span className="text-gray-400 text-xs">-</span>
                                            )}
                                        </td>
                                        <td className="p-4 flex items-center gap-2">
                                            <Button size="icon" variant="ghost" className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600"><Pencil size={16} /></Button>
                                            <Button size="icon" variant="ghost" className="bg-red-100 hover:bg-red-200 text-red-600"><Trash2 size={16} /></Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
