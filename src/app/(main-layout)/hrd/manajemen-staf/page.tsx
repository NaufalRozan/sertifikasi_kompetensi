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
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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
        {
            nip: "ST004",
            nama: "Yudi Pratama",
            email: "yudi.pratama@gmail.com",
            whatsapp: "081234567808",
            jabatan: "Staff K3",
            unit: "Divisi Umum",
            sertifikasi: "Welding Inspector (CWI)",
            status: "Aktif",
            notifikasi: "Belum",
            npwp: "22.333.444.5-678.000",
            namaBank: "Bank Mandiri",
            rekening: "6655443322",
        },
        {
            nip: "ST005",
            nama: "Rina Kartika",
            email: "rina.kartika@gmail.com",
            whatsapp: "081234567809",
            jabatan: "Koordinator",
            unit: "Divisi Keselamatan",
            sertifikasi: "NDT Level II",
            status: "Nonaktif",
            notifikasi: "Terkirim",
            npwp: "33.444.555.6-789.000",
            namaBank: "Bank BRI",
            rekening: "5544332211",
        },
        {
            nip: "ST006",
            nama: "Agus Salim",
            email: "agus.salim@gmail.com",
            whatsapp: "081234567810",
            jabatan: "Staff K3",
            unit: "Divisi Operasional",
            sertifikasi: "K3 Umum",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "44.555.666.7-890.000",
            namaBank: "Bank BCA",
            rekening: "4433221100",
        },
        {
            nip: "ST007",
            nama: "Desy Marlina",
            email: "desy.marlina@gmail.com",
            whatsapp: "081234567811",
            jabatan: "Manager",
            unit: "Divisi Teknik",
            sertifikasi: "K3 Mekanik",
            status: "Nonaktif",
            notifikasi: "Belum",
            npwp: "55.666.777.8-901.000",
            namaBank: "Bank Mandiri",
            rekening: "3322110099",
        },
        {
            nip: "ST008",
            nama: "Fajar Nugroho",
            email: "fajar.n@gmail.com",
            whatsapp: "081234567812",
            jabatan: "Koordinator",
            unit: "Divisi Proyek",
            sertifikasi: "K3 Engineering",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "66.777.888.9-012.000",
            namaBank: "Bank BNI",
            rekening: "2211009988",
        },
        {
            nip: "ST009",
            nama: "Sari Melati",
            email: "sari.melati@gmail.com",
            whatsapp: "081234567813",
            jabatan: "Supervisor",
            unit: "Divisi Umum",
            sertifikasi: "NDT Level II",
            status: "Nonaktif",
            notifikasi: "Belum",
            npwp: "77.888.999.0-123.000",
            namaBank: "Bank CIMB",
            rekening: "1100998877",
        },
        {
            nip: "ST010",
            nama: "Andi Saputra",
            email: "andi.saputra@gmail.com",
            whatsapp: "081234567814",
            jabatan: "Staff",
            unit: "Divisi Keselamatan",
            sertifikasi: "Welding Inspector (CWI)",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "88.999.000.1-234.000",
            namaBank: "Bank BCA",
            rekening: "0099887766",
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
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Layers className="w-5 h-5" />
                    Manajemen Staf
                </div>
            </div>

            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
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
                            Jumlah Staf: <span className="font-bold">{searchedData.length}</span>
                        </div>
                    </div>

                    <Input
                        type="text"
                        placeholder="Cari struktur..."
                        value={searchQuery}
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                    />
                </div>

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
                            {paginatedData.map((item, idx) => (
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
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(item.notifikasi)}`}>
                                            {item.notifikasi}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {/* Pagination */}
                    <div className="flex justify-center items-center gap-2 py-4">
                        <Button variant="ghost" size="sm" onClick={() => handlePageChange(currentPage - 1)}>
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
                        <Button variant="ghost" size="sm" onClick={() => handlePageChange(currentPage + 1)}>
                            &gt;
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
