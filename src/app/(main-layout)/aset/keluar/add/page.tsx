"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function AddAsetKeluarPage() {
    const [nama, setNama] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [distributor, setDistributor] = useState("");
    const [stok, setStok] = useState(0);
    const [satuan, setSatuan] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { nama, tanggal, distributor, stok, satuan };
        console.log("Aset Keluar Ditambahkan:", data);
        alert("Aset keluar berhasil ditambahkan!");
        // TODO: Kirim ke API/backend
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Aset Keluar
                </div>
            </div>

            {/* Form */}
            <div className="w-full max-w-xl bg-white -mt-24 z-10 relative p-6 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="font-medium block mb-1">Nama Aset</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Tanggal Keluar</label>
                        <input
                            type="date"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={tanggal}
                            onChange={(e) => setTanggal(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Distributor</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={distributor}
                            onChange={(e) => setDistributor(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Stok</label>
                        <input
                            type="number"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={stok}
                            onChange={(e) => setStok(parseInt(e.target.value))}
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Satuan</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={satuan}
                            onChange={(e) => setSatuan(e.target.value)}
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
