"use client";

import { useState } from "react";
import { Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

export default function ManajemenIStafPage() {
    const [selectedSertifikasi, setSelectedSertifikasi] = useState("Semua");

    const data = [
        {
            nip: "ST001",
            nama: "Putri Anggraeni",
            email: "putri.struktur@gmail.com",
            whatsapp: "081234567805",
            jabatan: "Manager K3",
            unit: "Divisi Keselamatan",
            sertifikasi: "K3 Umum",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "45.678.123.9-001.000",
            namaBank: "Bank BCA",
            rekening: "9988776655",
        },
        {
            nip: "ST002",
            nama: "Ahmad Firdaus",
            email: "ahmad.firdaus@gmail.com",
            whatsapp: "081234567806",
            jabatan: "Supervisor",
            unit: "Divisi Operasional",
            sertifikasi: "K3 Engineering",
            status: "Nonaktif",
            notifikasi: "Belum",
            npwp: "55.999.888.1-002.000",
            namaBank: "Bank BRI",
            rekening: "8877665544",
        },
        {
            nip: "ST003",
            nama: "Nadia Kamila",
            email: "nadia.kamila@gmail.com",
            whatsapp: "081234567807",
            jabatan: "Koordinator K3",
            unit: "Divisi Proyek",
            sertifikasi: "K3 Mekanik",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "11.222.333.4-567.000",
            namaBank: "Bank BNI",
            rekening: "7766554433",
        },
    ];

    const sertifikasiOptions = [
        "Semua",
        "K3 Umum",
        "K3 Mekanik",
        "K3 Engineering",
        "NDT Level II",
        "Welding Inspector (CWI)",
    ];

    const getBadgeStyle = (value: string) => {
        switch (value) {
            case "Aktif":
            case "Terkirim":
                return "bg-green-100 text-green-700";
            case "Belum":
            case "Nonaktif":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-500";
        }
    };

    const filteredData =
        selectedSertifikasi === "Semua"
            ? data
            : data.filter((item) => item.sertifikasi === selectedSertifikasi);

    const [searchQuery, setSearchQuery] = useState("");

    const searchedData = filteredData.filter(
        (item) =>
            item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Layers className="w-5 h-5" />
                    Manajemen Staf
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
                {/* Filter & Search */}
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div className="flex items-center gap-2 text-sm text-white">
                            <Label htmlFor="sertifikasi" className="text-white">
                                Sertifikasi:
                            </Label>
                            <Select
                                value={selectedSertifikasi}
                                onValueChange={setSelectedSertifikasi}
                            >
                                <SelectTrigger className="w-[250px] bg-white text-black">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {sertifikasiOptions.map((option) => (
                                        <SelectItem key={option} value={option}>
                                            {option}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="text-sm font-semibold text-white">
                            Jumlah Staf: <span className="font-bold">{searchedData.length}</span>
                        </div>
                    </div>

                    <Input
                        type="text"
                        placeholder="Cari struktur..."
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
                                <th className="p-4">NIP</th>
                                <th className="p-4">Nama</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Whatsapp</th>
                                <th className="p-4">Jabatan</th>
                                <th className="p-4">Unit</th>
                                <th className="p-4">Sertifikasi</th>
                                <th className="p-4">NPWP</th>
                                <th className="p-4">Nama Bank</th>
                                <th className="p-4">No. Rekening</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Notifikasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {searchedData.map((item, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.nip}</td>
                                    <td className="p-4">{item.nama}</td>
                                    <td className="p-4">{item.email}</td>
                                    <td className="p-4">{item.whatsapp}</td>
                                    <td className="p-4">{item.jabatan}</td>
                                    <td className="p-4">{item.unit}</td>
                                    <td className="p-4">{item.sertifikasi}</td>
                                    <td className="p-4">{item.npwp}</td>
                                    <td className="p-4">{item.namaBank}</td>
                                    <td className="p-4">{item.rekening}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(item.status)}`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(item.notifikasi)}`}
                                        >
                                            {item.notifikasi}
                                        </span>
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
