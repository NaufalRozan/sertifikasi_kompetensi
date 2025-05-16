"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BASE_URL } from "@/constant/BaseURL";
import {
    Calendar,
    ClipboardList,
    Users,
    UserCog,
} from "lucide-react";

import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function EventDetailPage() {
    const router = useRouter();
    const { id: programId, eventId } = useParams();
    const [eventData, setEventData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvent = async () => {
            try {
                const res = await fetch(`${BASE_URL}/events/${eventId}`, {
                    credentials: "include",
                });
                const json = await res.json();
                setEventData(json.data);
            } catch (err) {
                setError("Gagal memuat data event.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchEvent();
    }, [eventId]);

    const subSections = [
        {
            title: "Notulensi",
            icon: <ClipboardList className="w-6 h-6" />,
            description: "Catatan kegiatan dalam event ini.",
            link: `/program/${programId}/event/${eventId}/notulensi`,
        },
        {
            title: "Peserta",
            icon: <Users className="w-6 h-6" />,
            description: "Daftar peserta dalam event ini.",
            link: `/program/${programId}/event/${eventId}/peserta`,
        },
        {
            title: "Panitia",
            icon: <UserCog className="w-6 h-6" />,
            description: "Anggota panitia event.",
            link: `/program/${programId}/event/${eventId}/panitia`,
        },
    ];

    if (loading) {
        return <p className="text-center mt-10 text-gray-500">Memuat data event...</p>;
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
                    Detail Event
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10 space-y-6">
                {/* Info Event */}
                <div className="bg-white rounded-xl shadow px-6 py-4">
                    <h2 className="text-xl font-bold text-red-700 mb-2">{eventData.name}</h2>
                    <p className="text-sm text-gray-600">{eventData.description}</p>
                    <p className="text-sm mt-1 text-gray-500">
                        {new Date(eventData.startDate).toLocaleDateString("id-ID")} -{" "}
                        {new Date(eventData.endDate).toLocaleDateString("id-ID")}
                    </p>
                </div>

                {/* Sub Sections */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {subSections.map((section, idx) => (
                        <Card
                            key={idx}
                            onClick={() => router.push(section.link)}
                            className="cursor-pointer hover:shadow-md transition"
                        >
                            <CardHeader className="flex flex-col gap-2">
                                <div className="text-red-700">{section.icon}</div>
                                <CardTitle>{section.title}</CardTitle>
                                <CardDescription>{section.description}</CardDescription>
                            </CardHeader>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
