"use client";

import { useRouter, useParams } from "next/navigation";
import { Pencil, Trash2, Layers3 } from "lucide-react";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function JenisEventPage() {
    const router = useRouter();
    const { id } = useParams();

    const data = [
        { id: 1, nama: "Seminar" },
        { id: 2, nama: "Workshop" },
        { id: 3, nama: "Kompetisi" },
        { id: 4, nama: "Pelatihan" },
    ];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Layers3 className="w-5 h-5" />
                    Jenis Event
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-24 z-10 relative p-4">
                {/* Tombol Tambah */}
                <div className="flex justify-end mb-4">
                    <Button
                        onClick={() => router.push(`/program/${id}/jenisevent/add`)}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        + Tambah Jenis Event
                    </Button>
                </div>

                {/* Grid Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {data.map((item) => (
                        <Card key={item.id} className="hover:shadow-md transition">
                            <CardHeader className="pb-2">
                                <CardTitle className="text-red-700 text-lg">
                                    {item.nama}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col justify-between gap-3">
                                <div className="text-xs text-gray-500">#{item.id}</div>
                                <div className="flex justify-end gap-2 pt-2">
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

                {/* Pagination (optional) */}
                <div className="flex justify-center items-center gap-2 py-6">
                    <button className="text-gray-500 hover:text-red-700">&lt;</button>
                    <button className="w-7 h-7 rounded-full bg-red-700 text-white text-xs font-medium">01</button>
                    <button className="text-sm hover:underline">02</button>
                    <button className="text-sm hover:underline">03</button>
                    <span className="text-sm text-gray-500">...</span>
                    <button className="text-gray-500 hover:text-red-700">&gt;</button>
                </div>
            </div>
        </div>
    );
}
