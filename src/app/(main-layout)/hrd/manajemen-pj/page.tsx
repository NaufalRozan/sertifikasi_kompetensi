"use client";

import { useState } from "react";
import { UserCog } from "lucide-react";
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

export default function ManajemenPenannggungJawabPage() {
    const [selectedSertifikasi, setSelectedSertifikasi] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const data = [
        {
            nip: "PG001",
            nama: "Dedi Susanto",
            email: "dedi.pengurus@gmail.com",
            whatsapp: "081234567800",
            jabatan: "Direktur",
            unit: "Divisi A",
            sertifikasi: "K3 Umum",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "12.111.222.3-444.000",
            namaBank: "Bank BRI",
            rekening: "1122334455",
        },
        {
            nip: "PG002",
            nama: "Wulandari",
            email: "wulan.pengurus@gmail.com",
            whatsapp: "081234567801",
            jabatan: "Komisaris",
            unit: "Divisi B",
            sertifikasi: "K3 Mekanik",
            status: "Nonaktif",
            notifikasi: "Belum",
            npwp: "44.555.666.7-888.000",
            namaBank: "Bank BNI",
            rekening: "2233445566",
        },
        {
            nip: "PG003",
            nama: "Hendri Kurniawan",
            email: "hendri.kurnia@gmail.com",
            whatsapp: "081234567802",
            jabatan: "Pengurus",
            unit: "Divisi C",
            sertifikasi: "K3 Engineering",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "77.888.999.0-111.000",
            namaBank: "Bank Mandiri",
            rekening: "3344556677",
        },
        {
            nip: "PG004",
            nama: "Lina Kusuma",
            email: "lina.kusuma@gmail.com",
            whatsapp: "081234567803",
            jabatan: "Manager",
            unit: "Divisi D",
            sertifikasi: "NDT Level II",
            status: "Aktif",
            notifikasi: "Belum",
            npwp: "88.999.000.1-222.000",
            namaBank: "Bank BCA",
            rekening: "4455667788",
        },
        {
            nip: "PG005",
            nama: "Bambang Hartono",
            email: "bambang.h@gmail.com",
            whatsapp: "081234567804",
            jabatan: "Supervisor",
            unit: "Divisi E",
            sertifikasi: "Welding Inspector (CWI)",
            status: "Nonaktif",
            notifikasi: "Terkirim",
            npwp: "99.000.111.2-333.000",
            namaBank: "Bank CIMB",
            rekening: "5566778899",
        },
        {
            nip: "PG006",
            nama: "Sri Wahyuni",
            email: "sri.wahyuni@gmail.com",
            whatsapp: "081234567805",
            jabatan: "Direktur",
            unit: "Divisi F",
            sertifikasi: "K3 Umum",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "10.111.222.3-444.000",
            namaBank: "Bank BRI",
            rekening: "6677889900",
        },
        {
            nip: "PG007",
            nama: "Joko Mulyono",
            email: "joko.mulyono@gmail.com",
            whatsapp: "081234567806",
            jabatan: "Manager",
            unit: "Divisi G",
            sertifikasi: "K3 Mekanik",
            status: "Nonaktif",
            notifikasi: "Belum",
            npwp: "11.222.333.4-555.000",
            namaBank: "Bank Mandiri",
            rekening: "7788990011",
        },
        {
            nip: "PG008",
            nama: "Dian Fitriani",
            email: "dian.fitri@gmail.com",
            whatsapp: "081234567807",
            jabatan: "Pengurus",
            unit: "Divisi H",
            sertifikasi: "K3 Engineering",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "12.333.444.5-666.000",
            namaBank: "Bank BNI",
            rekening: "8899001122",
        },
        {
            nip: "PG009",
            nama: "Ahmad Yusuf",
            email: "ahmad.yusuf@gmail.com",
            whatsapp: "081234567808",
            jabatan: "Supervisor",
            unit: "Divisi I",
            sertifikasi: "NDT Level II",
            status: "Nonaktif",
            notifikasi: "Belum",
            npwp: "13.444.555.6-777.000",
            namaBank: "Bank BCA",
            rekening: "9900112233",
        },
        {
            nip: "PG010",
            nama: "Sinta Melati",
            email: "sinta.melati@gmail.com",
            whatsapp: "081234567809",
            jabatan: "Komisaris",
            unit: "Divisi J",
            sertifikasi: "Welding Inspector (CWI)",
            status: "Aktif",
            notifikasi: "Terkirim",
            npwp: "14.555.666.7-888.000",
            namaBank: "Bank CIMB",
            rekening: "0011223344",
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
                    <UserCog className="w-5 h-5" />
                    Manajemen Penanggung Jawab
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
                {/* Filter dan Jumlah */}
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
                            Jumlah Penanggung Jawab:{" "}
                            <span className="font-bold">{searchedData.length}</span>
                        </div>
                    </div>

                    <Input
                        type="text"
                        placeholder="Cari penanggung jawab..."
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
