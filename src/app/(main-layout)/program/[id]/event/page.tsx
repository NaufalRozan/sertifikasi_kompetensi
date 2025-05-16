"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";
import { Calendar, Trash2, Pencil, Eye } from "lucide-react";
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

export default function EventListPage() {
    const router = useRouter();
    const { id: programId } = useParams();
    const [eventData, setEventData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/programs/${programId}`, {
                    withCredentials: true,
                });
                const program = response.data.data;
                setEventData(program.Event || []);
            } catch (err) {
                console.error(err);
                setError("Gagal memuat data event.");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [programId]);

    const handleDeleteEvent = async (eventId: string) => {
        try {
            await axios.delete(`${BASE_URL}/events/${eventId}`, {
                withCredentials: true,
            });
            setEventData((prev) => prev.filter((e: any) => e.id !== eventId));
            toast.success("Event berhasil dihapus!");
        } catch (err) {
            console.error(err);
            toast.error("Gagal menghapus event.");
        }
    };

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Memuat data...</p>;
    }

    if (error) {
        return <p className="text-center mt-10 text-red-500">{error}</p>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Calendar className="w-5 h-5" />
                    Event
                </div>
            </div>

            <div className="w-full max-w-7xl -mt-52 z-10 relative p-4 space-y-6">
                <div className="flex justify-end mb-4">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => router.push(`/program/${programId}/event/add`)}
                    >
                        + Tambah Event
                    </Button>
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
                    <table className="w-full text-sm text-left">
                        <thead className="text-red-700 font-semibold border-b">
                            <tr>
                                <th className="p-4">Nama</th>
                                <th className="p-4">Periode</th>
                                <th className="p-4">Deskripsi</th>
                                <th className="p-4">Aksi</th>
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
                                    <td className="p-4 flex items-center gap-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => router.push(`/program/${programId}/event/${item.id}`)}
                                            className="bg-blue-100 hover:bg-blue-200 text-blue-600"
                                        >
                                            <Eye size={16} />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => router.push(`/program/${programId}/event/edit/${item.id}`)}
                                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                                        >
                                            <Pencil size={16} />
                                        </Button>
                                        <AlertDialog>
                                            <AlertDialogTrigger asChild>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="bg-red-100 hover:bg-red-200 text-red-600"
                                                >
                                                    <Trash2 size={16} />
                                                </Button>
                                            </AlertDialogTrigger>
                                            <AlertDialogContent>
                                                <AlertDialogHeader>
                                                    <AlertDialogTitle>Hapus Event</AlertDialogTitle>
                                                    <AlertDialogDescription>
                                                        Yakin ingin menghapus event ini? Tindakan ini tidak dapat dibatalkan.
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

                    {/* Optional Pagination */}
                    <div className="flex justify-center items-center gap-2 py-4">
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">&lt;</Button>
                        <Button size="sm" className="bg-red-700 text-white text-xs">01</Button>
                        <Button variant="link" size="sm">02</Button>
                        <Button variant="link" size="sm">03</Button>
                        <span className="text-sm text-gray-500">...</span>
                        <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">&gt;</Button>
                    </div>
                </div>

            </div>
        </div>
    );
}
