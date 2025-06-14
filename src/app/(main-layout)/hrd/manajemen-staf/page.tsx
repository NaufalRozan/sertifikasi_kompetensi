"use client";

import { useState, useEffect } from "react";
import { Layers } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

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
import { BASE_URL } from "@/constant/BaseURL";

interface RawEmployee {
    id: string;
    role: string;
    sertifikasiId: string;
    name: string;
    NIP: string;
    email: string;
    phone: string;
    NPWP?: string;
    namaBank?: string;
    noRek?: string;
    status: string;
    notifikasi: string;
    jabatan: string;
    unit: string;
}
interface RawSertifikasi {
    id: string;
    name: string;
    code: string;
    Employee: any[];
}

interface Staff {
    id: string;
    nip: string;
    nama: string;
    email: string;
    whatsapp: string;
    jabatan: string;
    unit: string;
    sertifikasi: string;
    status: string;
    notifikasi: string;
    npwp: string;
    namaBank: string;
    rekening: string;
}

export default function ManajemenStafPage() {
    const [data, setData] = useState<Staff[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedSertifikasi, setSelectedSertifikasi] = useState("Semua");
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

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

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            setError(null);
            try {
                const [sertRes, empRes] = await Promise.all([
                    axios.get<{ data: RawSertifikasi[] }>(
                        `${BASE_URL}/sertifikasi/`,
                        { withCredentials: true }
                    ),
                    axios.get<{ data: RawEmployee[] }>(
                        `${BASE_URL}/employees/`,
                        { withCredentials: true }
                    ),
                ]);

                const sertList = sertRes.data.data;
                // hanya staff
                const staffList = empRes.data.data.filter((e) => e.role === "Staff");

                const mapped: Staff[] = staffList.map((e) => ({
                    id: e.id,
                    nip: e.NIP,
                    nama: e.name,
                    email: e.email,
                    whatsapp: e.phone,
                    jabatan: e.jabatan,
                    unit: e.unit,
                    sertifikasi:
                        sertList.find((s) => s.id === e.sertifikasiId)?.name ?? "-",
                    status: e.status,
                    notifikasi: e.notifikasi,
                    npwp: e.NPWP ?? "",
                    namaBank: e.namaBank ?? "",
                    rekening: e.noRek ?? "",
                }));

                setData(mapped);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat data staf.");
                toast.error("Gagal memuat data staf.");
            } finally {
                setLoading(false);
            }
        };

        fetchAll();
    }, []);

    const sertifikasiOptions = [
        "Semua",
        ...Array.from(new Set(data.map((d) => d.sertifikasi))).filter(
            (v) => v && v !== "-"
        ),
    ];

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
                    <Layers className="w-5 h-5" />
                    Manajemen Staf
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
                            Jumlah Staf: <span className="font-bold">{searchedData.length}</span>
                        </div>
                    </div>

                    <Input
                        type="text"
                        placeholder="Cari staf..."
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
                    {loading ? (
                        <div className="p-4 text-center text-gray-500">
                            Memuat data staf...
                        </div>
                    ) : error ? (
                        <div className="p-4 text-center text-red-500">{error}</div>
                    ) : data.length === 0 ? (
                        <div className="p-10 text-center text-gray-500 italic">
                            Belum ada staf yang ditambahkan.
                        </div>
                    ) : (
                        <>
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
                                    {paginatedData.map((item) => (
                                        <tr key={item.id} className="border-b hover:bg-gray-50">
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
                                                    className={`whitespace-nowrap px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(
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
                                        className={
                                            currentPage === i + 1
                                                ? "bg-red-700 text-white text-xs"
                                                : ""
                                        }
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
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
