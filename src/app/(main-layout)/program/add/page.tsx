"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function AddProgramPage() {
    const [namaProgram, setNamaProgram] = useState("");
    const [tanggalMulai, setTanggalMulai] = useState("");
    const [tanggalAkhir, setTanggalAkhir] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [status, setStatus] = useState("Dijadwalkan");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = {
            namaProgram,
            periode: `${tanggalMulai} - ${tanggalAkhir}`,
            deskripsi,
            status,
        };
        console.log("Program Baru:", data);
        alert("Program berhasil ditambahkan!");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Program
                </div>
            </div>

            {/* Form */}
            <div className="w-full max-w-xl bg-white -mt-52 z-10 relative p-6 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="font-medium block mb-1">Nama Program</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={namaProgram}
                            onChange={(e) => setNamaProgram(e.target.value)}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-medium block mb-1">Tanggal Mulai</label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={tanggalMulai}
                                onChange={(e) => setTanggalMulai(e.target.value)}
                                required
                            />
                        </div>
                        <div>
                            <label className="font-medium block mb-1">Tanggal Akhir</label>
                            <input
                                type="date"
                                className="w-full border border-gray-300 rounded px-3 py-2"
                                value={tanggalAkhir}
                                onChange={(e) => setTanggalAkhir(e.target.value)}
                                required
                            />
                        </div>
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Deskripsi</label>
                        <textarea
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            rows={3}
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Status</label>
                        <select
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                            required
                        >
                            <option value="Dijadwalkan">Dijadwalkan</option>
                            <option value="Proses">Proses</option>
                            <option value="Selesai">Selesai</option>
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
