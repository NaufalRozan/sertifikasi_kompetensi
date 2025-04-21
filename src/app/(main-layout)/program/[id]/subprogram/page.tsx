"use client";

import { useRouter, useParams } from "next/navigation";
import {
    CalendarDays,
    ClipboardList,
    Users,
    UserCog,
    Calendar,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";

export default function SubProgramView() {
    const router = useRouter();
    const params = useParams();
    const programId = params.id;

    const topRow = [
        {
            title: "Event",
            icon: <CalendarDays className="w-6 h-6" />,
            description: "Kelola jadwal dan rincian event program.",
            link: `/program/${programId}/event`,
        },
        {
            title: "Notulensi",
            icon: <ClipboardList className="w-6 h-6" />,
            description: "Catatan rapat dan dokumentasi kegiatan.",
            link: `/program/${programId}/notulensi`,
        },
    ];

    const bottomRow = [
        {
            title: "Peserta",
            icon: <Users className="w-6 h-6" />,
            description: "Data peserta yang mengikuti program.",
            link: `/program/${programId}/peserta`,
        },
        {
            title: "Panitia",
            icon: <UserCog className="w-6 h-6" />,
            description: "Anggota tim pelaksana program.",
            link: `/program/${programId}/panitia`,
        },
    ];

    const eventData = [
        {
            title: "Workshop React",
            date: "12 April 2025 - 13 April 2025",
            jenis: "Workshop",
            harga: 150000,
            location: "Gedung A",
            status: "Aktif",
        },
        {
            title: "Pelatihan UI/UX",
            date: "20 April 2025 - 21 April 2025",
            jenis: "Pelatihan",
            harga: 100000,
            location: "Ruang 204",
            status: "Pending",
        },
    ];

    const notulensiData = [
        {
            nama: "Koordinasi Program",
            tanggal: "2025-04-10",
            fileName: "koordinasi-program.pdf",
        },
        {
            nama: "Evaluasi Event",
            tanggal: "2025-04-18",
            fileName: "evaluasi-event.pdf",
        },
    ];


    function getBadgeStyle(status: string) {
        switch (status.toLowerCase()) {
            case "aktif":
            case "terkirim":
                return "bg-green-100 text-green-800";
            case "pending":
            case "menunggu":
                return "bg-yellow-100 text-yellow-800";
            case "batal":
            case "gagal":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Calendar className="w-5 h-5" />
                    Sub Program
                </div>
            </div>

            {/* Content */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative p-4 space-y-6">
                {/* Top Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {topRow.map((item, index) => (
                        <Card
                            key={index}
                            onClick={() => router.push(item.link)}
                            className="cursor-pointer hover:shadow-md transition"
                        >
                            <CardHeader className="flex flex-col gap-2">
                                <div className="text-red-700">{item.icon}</div>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                {/* Bottom Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {bottomRow.map((item, index) => (
                        <Card
                            key={index}
                            onClick={() => router.push(item.link)}
                            className="cursor-pointer hover:shadow-md transition"
                        >
                            <CardHeader className="flex flex-col gap-2">
                                <div className="text-red-700">{item.icon}</div>
                                <CardTitle>{item.title}</CardTitle>
                                <CardDescription>{item.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>

                {/* Tabel Event */}
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                    <h2 className="text-xl font-semibold mb-4 text-red-700 px-4 pt-4">Daftar Event</h2>
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">Nama</th>
                                <th className="p-4">Periode</th>
                                <th className="p-4">Jenis</th>
                                <th className="p-4">Harga</th>
                                <th className="p-4">Tempat</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {eventData.map((item, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.title}</td>
                                    <td className="p-4">{item.date}</td>
                                    <td className="p-4">{item.jenis}</td>
                                    <td className="p-4">Rp{item.harga.toLocaleString()}</td>
                                    <td className="p-4">{item.location}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(item.status)}`}>
                                            {item.status}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Tabel Notulensi */}
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-red-700 px-4 pt-4">Daftar Notulensi</h2>
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">Topik</th>
                                <th className="p-4">Tanggal</th>
                                <th className="p-4">File</th>
                            </tr>
                        </thead>
                        <tbody>
                            {notulensiData.map((item, idx) => (
                                <tr key={idx} className="border-b hover:bg-gray-50">
                                    <td className="p-4">{item.nama}</td>
                                    <td className="p-4">{item.tanggal}</td>
                                    <td className="p-4">
                                        <a href="#" className="text-blue-600 underline">{item.fileName}</a>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    );
}
