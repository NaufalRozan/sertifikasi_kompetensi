"use client";

import { useState } from "react";
import { MinusCircle } from "lucide-react";

export default function AddTransaksiKeluarPage() {
    const [tanggal, setTanggal] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [nominal, setNominal] = useState(0);
    const [keterangan, setKeterangan] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { tanggal, deskripsi, nominal, keterangan };
        console.log("Transaksi Keluar:", data);
        alert("Transaksi keluar berhasil ditambahkan!");
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <MinusCircle className="w-5 h-5" />
                    Tambah Transaksi Keluar
                </div>
            </div>

            {/* Form */}
            <div className="w-full max-w-xl bg-white -mt-24 z-10 relative p-6 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="font-medium block mb-1">Tanggal</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Deskripsi</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={deskripsi}
                            onChange={(e) => setDeskripsi(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Nominal</label>
                        <input
                            type="number"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={nominal}
                            onChange={(e) => setNominal(parseInt(e.target.value))}
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Keterangan</label>
                        <textarea
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            rows={3}
                            value={keterangan}
                            onChange={(e) => setKeterangan(e.target.value)}
                            required
                        />
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
