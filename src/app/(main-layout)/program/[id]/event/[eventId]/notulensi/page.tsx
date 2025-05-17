"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Pencil, Trash2, Calendar } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import {
    Card,
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

export default function NotulensiEventPage() {
    const router = useRouter();
    const { id: programId, eventId } = useParams();
    const [notulensiData, setNotulensiData] = useState<any[]>([]);
    const [eventData, setEventData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNotulensi = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/notulensi?eventId=${eventId}`, {
                    withCredentials: true,
                });
                setNotulensiData(res.data.data || []);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat notulensi.");
            } finally {
                setLoading(false);
            }
        };

        const fetchEvent = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/events/${eventId}`, {
                    withCredentials: true,
                });
                setEventData(res.data.data);
            } catch (err) {
                console.error("Gagal memuat event", err);
            }
        };

        if (eventId) {
            fetchNotulensi();
            fetchEvent();
        }
    }, [eventId]);

    const handleDeleteNotulensi = async (notulensiId: string) => {
        await toast.promise(
            axios.delete(`${BASE_URL}/notulensi/${notulensiId}`, {
                withCredentials: true,
            }),
            {
                loading: "Menghapus notulensi...",
                success: () => {
                    setNotulensiData((prev) => prev.filter((n) => n.id !== notulensiId));
                    return "Notulensi berhasil dihapus!";
                },
                error: "Gagal menghapus notulensi.",
            }
        );
    };

    if (loading) return <p className="text-center mt-10 text-gray-500">Memuat notulensi...</p>;
    if (error) return <p className="text-center mt-10 text-red-500">{error}</p>;

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Calendar className="w-5 h-5" />
                    Notulensi Event
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10 space-y-6">
                {/* Info Event */}
                {eventData && (
                    <div className="bg-white rounded-xl shadow px-6 py-4">
                        <h2 className="text-xl font-bold text-red-700 mb-2">{eventData.name}</h2>
                        <p className="text-sm text-gray-600">{eventData.description}</p>
                        <p className="text-sm mt-1 text-gray-500">
                            {new Date(eventData.startDate).toLocaleDateString("id-ID")} -{" "}
                            {new Date(eventData.endDate).toLocaleDateString("id-ID")}
                        </p>
                    </div>
                )}

                {/* Tombol Tambah */}
                <div className="flex justify-end">
                    <Button
                        onClick={() => router.push(`/program/${programId}/event/${eventId}/notulensi/add`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        + Tambah Notulensi
                    </Button>
                </div>

                {/* Tabel Notulensi */}
                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
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
                            {notulensiData.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="p-4 italic text-gray-500 text-center">
                                        Belum ada notulensi.
                                    </td>
                                </tr>
                            ) : (
                                notulensiData.map((item: any) => (
                                    <tr key={item.id} className="border-b hover:bg-gray-50">
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
                                                onClick={() =>
                                                    router.push(`/program/${programId}/event/${eventId}/notulensi/edit/${item.id}`)
                                                }
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
                                                            Apakah kamu yakin ingin menghapus notulensi ini? Tindakan ini tidak bisa dibatalkan.
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
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
