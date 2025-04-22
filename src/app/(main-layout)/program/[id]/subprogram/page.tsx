"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import {
    CalendarDays,
    ClipboardList,
    Users,
    UserCog,
    Calendar,
    Trash2,
    Pencil,
} from "lucide-react";
import {
    Card,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { BASE_URL } from "@/constant/BaseURL";


export default function SubProgramView() {
    const router = useRouter();
    const params = useParams();
    const programId = params.id;

    const [eventData, setEventData] = useState([]);
    const [notulensiData, setNotulensiData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const jenisEventMap: Record<string, string> = {
        "1": "Tes Jenis",
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/programs/${programId}`, {
                    withCredentials: true,
                });

                const program = response.data.data;
                setEventData(program.Event || []);
                setNotulensiData(program.Notulensi || []);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat data program.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [programId]);

    const handleDeleteEvent = async (eventId: string) => {
        if (!confirm("Yakin ingin menghapus event ini?")) return;

        try {
            await axios.delete(`${BASE_URL}/events/${eventId}`, {
                withCredentials: true,
            });

            toast.success("Event berhasil dihapus!");

            // refresh data setelah hapus
            setEventData((prev) => prev.filter((e: any) => e.id !== eventId));
        } catch (err) {
            console.error(err);
            toast.error("Gagal menghapus event.");
        }
    };

    const handleDeleteNotulensi = async (notulensiId: string) => {
        try {
            await toast.promise(
                axios.delete(`${BASE_URL}/notulensi/${notulensiId}`, {
                    withCredentials: true,
                }),
                {
                    loading: "Menghapus notulensi...",
                    success: "Notulensi berhasil dihapus!",
                    error: "Gagal menghapus notulensi.",
                }
            );

            // update data setelah dihapus
            setNotulensiData((prev) => prev.filter((n: any) => n.id !== notulensiId));
        } catch (err) {
            console.error(err);
        }
    };



    const topRow = [
        {
            title: "Event",
            icon: <CalendarDays className="w-6 h-6" />,
            description: "Kelola jadwal dan rincian event program.",
            link: `/program/${programId}/event//add`,
        },
        {
            title: "Notulensi",
            icon: <ClipboardList className="w-6 h-6" />,
            description: "Catatan rapat dan dokumentasi kegiatan.",
            link: `/program/${programId}/notulensi/add`,
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

    function getBadgeStyle(status: string) {
        switch (status?.toLowerCase()) {
            case "aktif":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "batal":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    }

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Memuat data...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
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
                    {eventData.length === 0 ? (
                        <p className="px-4 pb-4 text-gray-600 italic">Belum ada event yang ditambahkan.</p>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">Nama</th>
                                    <th className="p-4">Periode</th>
                                    <th className="p-4">Deskripsi</th>
                                    <th className="p-4">Jenis</th>
                                    <th className="p-4">Harga</th>
                                    <th className="p-4">Tempat</th>
                                    <th className="p-4 text-right">Aksi</th>

                                </tr>
                            </thead>
                            <tbody>
                                {eventData.map((item: any, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.name}</td>
                                        <td className="p-4">
                                            {new Date(item.startDate).toLocaleDateString("id-ID")} -{" "}
                                            {new Date(item.endDate).toLocaleDateString("id-ID")}
                                        </td>
                                        <td className="p-4">{item.description}</td>
                                        <td className="p-4">{jenisEventMap[item.jenisEventId] || "Tidak diketahui"}</td>

                                        <td className="p-4">Rp{item.harga.toLocaleString()}</td>
                                        <td className="p-4">{item.tempat}</td>
                                        <td className="p-4 flex gap-2 justify-end">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => router.push(`/program/${programId}/event/edit/${item.id}`)}
                                                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="bg-red-100 hover:bg-red-200 text-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Hapus Event</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Apakah kamu yakin ingin menghapus event ini? Tindakan ini tidak dapat dibatalkan.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteEvent(item.id)}
                                                            className="bg-red-600 hover:bg-red-700 text-white"
                                                        >
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>

                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>


                {/* Tabel Notulensi */}
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto mt-8">
                    <h2 className="text-xl font-semibold mb-4 text-red-700 px-4 pt-4">Daftar Notulensi</h2>
                    {notulensiData.length === 0 ? (
                        <p className="px-4 pb-4 text-gray-600 italic">Belum ada notulensi.</p>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">Topik</th>
                                    <th className="p-4">Tanggal</th>
                                    <th className="p-4">File</th>
                                    <th className="p-4 text-right">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {notulensiData.map((item: any, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.name}</td>
                                        <td className="p-4">
                                            {new Date(item.tanggal).toLocaleDateString("id-ID", {
                                                day: "numeric",
                                                month: "long",
                                                year: "numeric",
                                            })}
                                        </td>
                                        <td className="p-4 space-y-2">
                                            {item.File && item.File.length > 0 ? (
                                                item.File.map((file: any, index: number) => (
                                                    <div key={index}>
                                                        <a
                                                            href={`${BASE_URL}/notulensi/doc/${file.id}`}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-blue-600 hover:underline"
                                                        >
                                                            📄 {file.originalName || file.filename}
                                                        </a>
                                                    </div>
                                                ))
                                            ) : (
                                                <span className="text-gray-500 italic">Tidak ada file</span>
                                            )}
                                        </td>
                                        <td className="p-4 flex justify-end gap-2">
                                            <Button
                                                size="icon"
                                                variant="ghost"
                                                onClick={() => router.push(`/program/${programId}/notulensi/edit/${item.id}`)}
                                                className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>

                                            <AlertDialog>
                                                <AlertDialogTrigger asChild>
                                                    <Button
                                                        size="icon"
                                                        variant="ghost"
                                                        className="bg-red-100 hover:bg-red-200 text-red-600"
                                                    >
                                                        <Trash2 className="w-4 h-4" />
                                                    </Button>
                                                </AlertDialogTrigger>
                                                <AlertDialogContent>
                                                    <AlertDialogHeader>
                                                        <AlertDialogTitle>Hapus Notulensi</AlertDialogTitle>
                                                        <AlertDialogDescription>
                                                            Apakah kamu yakin ingin menghapus notulensi ini? Tindakan ini tidak dapat dibatalkan.
                                                        </AlertDialogDescription>
                                                    </AlertDialogHeader>
                                                    <AlertDialogFooter>
                                                        <AlertDialogCancel>Batal</AlertDialogCancel>
                                                        <AlertDialogAction
                                                            onClick={() => handleDeleteNotulensi(item.id)}
                                                            className="bg-red-600 hover:bg-red-700 text-white"
                                                        >
                                                            Hapus
                                                        </AlertDialogAction>
                                                    </AlertDialogFooter>
                                                </AlertDialogContent>
                                            </AlertDialog>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>

                        </table>
                    )}

                </div>
            </div>
        </div>
    );
}
