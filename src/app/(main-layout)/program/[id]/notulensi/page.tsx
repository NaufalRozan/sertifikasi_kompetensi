"use client";

import { useRouter, useParams } from "next/navigation";
import { ClipboardList, Pencil, Trash2, FileText } from "lucide-react";
import { useState } from "react";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function NotulensiPage() {
    const router = useRouter();
    const { id } = useParams();

    // Dummy data notulensi
    const [data] = useState([
        {
            id: 1,
            nama: "Rapat Evaluasi Kegiatan",
            tanggal: "2025-05-10",
            fileUrl: "/files/notulensi-evaluasi.pdf",
        },
        {
            id: 2,
            nama: "Rapat Persiapan Kompetisi",
            tanggal: "2025-06-01",
            fileUrl: "/files/notulensi-kompetisi.pdf",
        },
    ]);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <ClipboardList className="w-5 h-5" />
                    Notulensi
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
                {/* Tombol Tambah */}
                <div className="flex justify-end mb-4">
                    <Button
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                        onClick={() => router.push(`/program/${id}/notulensi/add`)}
                    >
                        + Tambah Notulensi
                    </Button>
                </div>

                {/* Card List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item) => (
                        <Card key={item.id} className="hover:shadow-md transition">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-red-700 text-lg">{item.nama}</CardTitle>
                                <CardDescription>Tanggal: {item.tanggal}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-2 text-sm text-gray-700">
                                <div className="flex items-center gap-2">
                                    <FileText className="w-4 h-4 text-gray-500" />
                                    <a
                                        href={item.fileUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Lihat File Notulensi
                                    </a>
                                </div>

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
