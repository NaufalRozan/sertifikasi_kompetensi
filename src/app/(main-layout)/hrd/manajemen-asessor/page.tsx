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
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const data = [
        {
            nip: "AS001",
            nama: "Rama Dwipa",
            email: "rama.asessor@gmail.com",
            whatsapp: "081234567880",
            sertifikasi: "K3 Umum",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "33.444.555.6-789.000",
            namaBank: "Bank Mandiri",
            rekening: "5544332211",
        },
        {
            nip: "AS002",
            nama: "Lia Santika",
            email: "lia.santika@gmail.com",
            whatsapp: "081234567881",
            sertifikasi: "K3 Engineering",
            status: "Nonaktif",
            notifikasi: "Belum",
            npwp: "88.999.111.2-345.000",
            namaBank: "Bank BCA",
            rekening: "6677889900",
        },
        {
            nip: "AS003",
            nama: "Johan Siregar",
            email: "johan.siregar@gmail.com",
            whatsapp: "081234567882",
            sertifikasi: "Welding Inspector (CWI)",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "77.888.222.1-654.000",
            namaBank: "Bank BCA",
            rekening: "4433221100",
        },
        {
            nip: "AS004",
            nama: "Intan Permata",
            email: "intan.permata@gmail.com",
            whatsapp: "081234567883",
            sertifikasi: "NDT Level II",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "99.111.222.3-123.000",
            namaBank: "Bank BRI",
            rekening: "3322110099",
        },
        {
            nip: "AS005",
            nama: "Agus Prabowo",
            email: "agus.prabowo@gmail.com",
            whatsapp: "081234567884",
            sertifikasi: "K3 Mekanik",
            status: "Nonaktif",
            notifikasi: "Belum",
            npwp: "11.222.333.4-456.000",
            namaBank: "Bank Mandiri",
            rekening: "2211009988",
        },
        {
            nip: "AS006",
            nama: "Dewi Kartika",
            email: "dewi.kartika@gmail.com",
            whatsapp: "081234567885",
            sertifikasi: "K3 Umum",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "22.333.444.5-567.000",
            namaBank: "Bank BCA",
            rekening: "1100998877",
        },
        {
            nip: "AS007",
            nama: "Rudi Wijaya",
            email: "rudi.wijaya@gmail.com",
            whatsapp: "081234567886",
            sertifikasi: "K3 Engineering",
            status: "Nonaktif",
            notifikasi: "Belum",
            npwp: "55.666.777.8-901.000",
            namaBank: "Bank BNI",
            rekening: "0099887766",
        },
        {
            nip: "AS008",
            nama: "Mega Sari",
            email: "mega.sari@gmail.com",
            whatsapp: "081234567887",
            sertifikasi: "K3 Mekanik",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "66.777.888.9-012.000",
            namaBank: "Bank BRI",
            rekening: "9988776655",
        },
        {
            nip: "AS009",
            nama: "Taufik Hidayat",
            email: "taufik.h@gmail.com",
            whatsapp: "081234567888",
            sertifikasi: "Welding Inspector (CWI)",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "77.888.999.0-123.000",
            namaBank: "Bank CIMB",
            rekening: "8877665544",
        },
        {
            nip: "AS010",
            nama: "Sinta Lestari",
            email: "sinta.lestari@gmail.com",
            whatsapp: "081234567889",
            sertifikasi: "NDT Level II",
            status: "Nonaktif",
            notifikasi: "Belum",
            npwp: "88.999.000.1-234.000",
            namaBank: "Bank Mandiri",
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

    const searchedData = filteredData.filter(
        (item) =>
            item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(searchedData.length / itemsPerPage);
    const paginatedData = searchedData.slice(
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
                    <BadgeCheck className="w-5 h-5" />
                    Manajemen Asessor
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
                                onValueChange={(value) => {
                                    setSelectedSertifikasi(value);
                                    setCurrentPage(1);
                                }}
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
                            Jumlah Asessor:{" "}
                            <span className="font-bold">{searchedData.length}</span>
                        </div>
                    </div>

                    <Input
                        type="text"
                        placeholder="Cari asessor..."
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
                                <th className="p-4">NIP</th>
                                <th className="p-4">Nama</th>
                                <th className="p-4">Email</th>
                                <th className="p-4">Whatsapp</th>
                                <th className="p-4">Sertifikasi</th>
                                <th className="p-4">NPWP</th>
                                <th className="p-4">Nama Bank</th>
                                <th className="p-4">No. Rekening</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Notifikasi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedData.map((item, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.nip}</td>
                                    <td className="p-4">{item.nama}</td>
                                    <td className="p-4">{item.email}</td>
                                    <td className="p-4">{item.whatsapp}</td>
                                    <td className="p-4">{item.sertifikasi}</td>
                                    <td className="p-4">{item.npwp}</td>
                                    <td className="p-4">{item.namaBank}</td>
                                    <td className="p-4">{item.rekening}</td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(
                                                item.status
                                            )}`}
                                        >
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(
                                                item.notifikasi
                                            )}`}
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
