"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function TambahSertifikasiPage() {
    const [kode, setKode] = useState("");
    const [nama, setNama] = useState("");
    const [tersertifikasi, setTersertifikasi] = useState(0);
    const [terdaftar, setTerdaftar] = useState(0);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = { kode, nama, tersertifikasi, terdaftar };
        console.log("Data Sertifikasi Baru:", data);
        alert("Data sertifikasi berhasil ditambahkan!");
        // TODO: Kirim ke API / backend
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Sertifikasi
                </div>
            </div>

            {/* Form Tambah */}
            <div className="w-full max-w-xl bg-white -mt-24 z-10 relative p-6 rounded-2xl shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4 text-sm">
                    <div>
                        <label className="font-medium block mb-1">Kode Sertifikasi</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={kode}
                            onChange={(e) => setKode(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Nama Sertifikasi</label>
                        <input
                            type="text"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={nama}
                            onChange={(e) => setNama(e.target.value)}
                            required
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Jumlah Peserta Tersertifikasi</label>
                        <input
                            type="number"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={tersertifikasi}
                            onChange={(e) => setTersertifikasi(parseInt(e.target.value))}
                        />
                    </div>

                    <div>
                        <label className="font-medium block mb-1">Jumlah Peserta Terdaftar</label>
                        <input
                            type="number"
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            value={terdaftar}
                            onChange={(e) => setTerdaftar(parseInt(e.target.value))}
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
