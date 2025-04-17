"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { useRouter, useParams } from "next/navigation";

export default function AddJenisEventPage() {
    const router = useRouter();
    const { id } = useParams();

    const enumJenisEvent = [
        "Seminar",
        "Workshop",
        "Kompetisi",
        "Pelatihan",
        "Sosialisasi",
    ];

    const [selectedJenis, setSelectedJenis] = useState(enumJenisEvent[0]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            nama: selectedJenis,
        };
        console.log("Jenis Event Ditambahkan:", data);
        alert("Jenis Event berhasil ditambahkan!");
        router.push(`/program/${id}/jenisevent`);
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Jenis Event
                </div>
            </div>

            {/* Form */}
            <div className="w-full max-w-xl bg-white -mt-24 z-10 relative p-6 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="font-medium block mb-1">Pilih Jenis Event</label>
                        <select
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={selectedJenis}
                            onChange={(e) => setSelectedJenis(e.target.value)}
                            required
                        >
                            {enumJenisEvent.map((jenis, index) => (
                                <option key={index} value={jenis}>
                                    {jenis}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
                        >
                            Simpan
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
