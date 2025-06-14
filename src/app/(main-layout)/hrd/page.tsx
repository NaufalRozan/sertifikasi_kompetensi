"use client";

import { useState, useEffect } from "react";
import { Users } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { BASE_URL } from "@/constant/BaseURL";

interface RawEmployee {
    id: string;
    name: string;
    role: "Staff" | "Trainer" | "PJ" | "Assessor";
    unit: string;
}

const roleLabels: Record<RawEmployee["role"], string> = {
    Staff: "Staf",
    Trainer: "Trainer",
    PJ: "Pengurus",
    Assessor: "Asessor",
};

export default function ManajemenHRDPage() {
    const router = useRouter();

    const [employees, setEmployees] = useState<RawEmployee[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        const fetchEmployees = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await axios.get<{ data: RawEmployee[] }>(
                    `${BASE_URL}/employees/`,
                    { withCredentials: true }
                );
                setEmployees(res.data.data);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat data karyawan.");
                toast.error("Gagal memuat data karyawan.");
            } finally {
                setLoading(false);
            }
        };
        fetchEmployees();
    }, []);

    // hitung statistik per role
    const countPeserta = 0; // belum ada API peserta
    const countTrainer = employees.filter((e) => e.role === "Trainer").length;
    const countPenanggungJawab = employees.filter((e) => e.role === "PJ").length;
    const countStaf = employees.filter((e) => e.role === "Staff").length;; // belum ada API struktur
    const countAssessor = employees.filter((e) => e.role === "Assessor").length;

    // filter + search
    const filtered = employees.filter((e) =>
        e.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // pagination
    const totalPages = Math.ceil(filtered.length / itemsPerPage);
    const paginated = filtered.slice(
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
                <div className="w-full max-w-7xl text-white flex items-center gap-2 text-xl font-semibold">
                    <Users className="w-5 h-5" />
                    Manajemen HRD
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10 space-y-6">
                <div className="flex justify-end">
                    <Button
                        onClick={() => router.push("/hrd/add")}
                        className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
                    >
                        + Tambah Pengurus
                    </Button>
                </div>

                {/* Statistik */}
                <Card className="shadow-md">
                    <CardContent className="py-6 flex justify-between items-center gap-6 flex-wrap">
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Total Peserta</p>
                            <p className="text-3xl font-semibold text-gray-700">
                                {countPeserta}
                            </p>
                        </div>
                        <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Total Trainer</p>
                            <p className="text-3xl font-semibold text-gray-700">
                                {countTrainer}
                            </p>
                        </div>
                        <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Total Penanggung Jawab</p>
                            <p className="text-3xl font-semibold text-gray-700">
                                {countPenanggungJawab}
                            </p>
                        </div>
                        <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Total Staf</p>
                            <p className="text-3xl font-semibold text-gray-700">
                                {countStaf}
                            </p>
                        </div>
                        <div className="h-[120px] w-px bg-gray-300 hidden lg:block" />
                        <div className="flex-1 text-center">
                            <p className="text-sm text-gray-500">Total Asessor</p>
                            <p className="text-3xl font-semibold text-gray-700">
                                {countAssessor}
                            </p>
                        </div>
                    </CardContent>
                </Card>

                {/* Search */}
                <Input
                    type="text"
                    placeholder="Cari nama..."
                    value={searchQuery}
                    onChange={(e) => {
                        setSearchQuery(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                />

                {/* Tabel HRD */}
                <Card className="shadow-lg">
                    <CardHeader>
                        <CardTitle className="text-red-700">Data HRD</CardTitle>
                    </CardHeader>
                    <CardContent className="overflow-x-auto p-0">
                        {loading ? (
                            <div className="p-4 text-center text-gray-500">
                                Memuat data HRD...
                            </div>
                        ) : error ? (
                            <div className="p-4 text-center text-red-500">{error}</div>
                        ) : employees.length === 0 ? (
                            <div className="p-10 text-center text-gray-500 italic">
                                Belum ada data karyawan.
                            </div>
                        ) : (
                            <>
                                <table className="w-full text-sm text-left">
                                    <thead className="text-red-700 font-semibold border-b">
                                        <tr>
                                            <th className="p-4">No</th>
                                            <th className="p-4">Nama</th>
                                            <th className="p-4">Peran</th>
                                            <th className="p-4">Unit</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {paginated.map((e, idx) => (
                                            <tr
                                                key={e.id}
                                                className="border-b hover:bg-gray-50"
                                            >
                                                <td className="p-4">
                                                    {(currentPage - 1) * itemsPerPage + idx + 1}
                                                </td>
                                                <td className="p-4">{e.name}</td>
                                                <td className="p-4">{roleLabels[e.role]}</td>
                                                <td className="p-4">{e.unit}</td>
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
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
