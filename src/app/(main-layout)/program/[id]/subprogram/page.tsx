"use client";

import { useRouter, useParams } from "next/navigation";
import {
    CalendarDays,
    ClipboardList,
    Users,
    UserCog,
    Layers,
    Calendar,
} from "lucide-react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function SubProgramView() {
    const router = useRouter();
    const params = useParams();
    const programId = params.id;

    const topRow = [
        {
            title: "Jenis Event",
            icon: <Layers className="w-6 h-6" />,
            description: "Kategori atau tipe dari event yang dibuat.",
            link: `/program/${programId}/jenisevent`,
        },
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
                {/* Atas: 3 Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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

                {/* Bawah: 2 Card */}
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
            </div>
        </div>
    );
}
