"use client";

import { useRouter, useParams } from "next/navigation";
import { CalendarDays, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function EventPage() {
    const router = useRouter();
    const { id } = useParams();

    const [data] = useState([
        {
            id: 1,
            nama: "Workshop 3D Printing",
            periode: "2025-05-10 - 2025-05-12",
            jenis: "Workshop",
            harga: 50000,
            tempat: "Ruang Lab Teknik",
        },
        {
            id: 2,
            nama: "Seminar Nasional",
            periode: "2025-06-01 - 2025-06-01",
            jenis: "Seminar",
            harga: 0,
            tempat: "Aula Utama",
        },
    ]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <CalendarDays className="w-5 h-5" />
                    Event
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
                {/* Tombol Tambah */}
                <div className="flex justify-end mb-4">
                    <Button
                        onClick={() => router.push(`/program/${id}/event/add`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        + Tambah Event
                    </Button>
                </div>

                {/* Grid Card */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((event) => (
                        <Card key={event.id} className="hover:shadow-md transition">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-red-700 text-lg">
                                    {event.nama}
                                </CardTitle>
                                <CardDescription>#{event.id}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-1 text-sm text-gray-700">
                                <p>Periode: {event.periode}</p>
                                <p>Jenis: {event.jenis}</p>
                                <p>Harga: Rp {event.harga.toLocaleString()}</p>
                                <p>Tempat: {event.tempat}</p>

                                <div className="pt-3 flex justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // logic edit
                                        }}
                                    >
                                        <Pencil size={16} />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            // logic delete
                                        }}
                                    >
                                        <Trash2 size={16} />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </div>
    );
}
