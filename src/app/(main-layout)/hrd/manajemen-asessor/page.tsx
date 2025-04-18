"use client";

import { useState } from "react";
import { BadgeCheck } from "lucide-react";
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

export default function ManajemenAsessorPage() {
    const [selectedSertifikasi, setSelectedSertifikasi] = useState("Semua");

    const data = [
        {
            nip: "AS001",
            nama: "Rama Dwipa",
            email: "rama.asessor@gmail.com",
            whatsapp: "081234567880",
            sertifikasi: "K3 Umum",
            status: "Aktif",
            notifikasi: "Terkirim",
        },
        {
            nip: "AS002",
            nama: "Lia Santika",
            email: "lia.santika@gmail.com",
            whatsapp: "081234567881",
            sertifikasi: "K3 Engineering",
            status: "Nonaktif",
            notifikasi: "Belum",
        },
        {
            nip: "AS003",
            nama: "Johan Siregar",
            email: "johan.siregar@gmail.com",
            whatsapp: "081234567882",
            sertifikasi: "Welding Inspector (CWI)",
            status: "Aktif",
            notifikasi: "Terkirim",
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
            case "Nonaktif":
            case "Belum":
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
                    <BadgeCheck className="w-5 h-5" />
                    Manajemen Asessor
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
                {/* Filter & Search */}
                <div className="flex flex-col gap-4 mb-4">
                    {/* Baris Atas */}
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
                            Jumlah Asessor: <span className="font-bold">{searchedData.length}</span>
                        </div>
                    </div>

                    {/* Search */}
                    <Input
                        type="text"
                        placeholder="Cari asessor..."
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
                                <th className="p-4">Sertifikasi</th>
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
                                    <td className="p-4">{item.sertifikasi}</td>
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
