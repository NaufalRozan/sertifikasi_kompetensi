"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

// Daftar vendor (simulasi data dari manajemen vendor)
const vendorList = [
    { id: 1, nama: "PT. Mesin Jaya" },
    { id: 2, nama: "CV. Baja Kuat" },
    { id: 3, nama: "UD. Perkakas" },
    { id: 4, nama: "PT. Pelumas Indo" },
    { id: 5, nama: "CV. Udara Power" },
];

export default function AddAsetMasukPage() {
    const [nama, setNama] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [expired, setExpired] = useState("");
    const [vendor, setVendor] = useState("");
    const [lokasi, setLokasi] = useState("");
    const [kondisi, setKondisi] = useState("Tidak Rusak");
    const [harga, setHarga] = useState("");
    const [stok, setStok] = useState(0);
    const [satuan, setSatuan] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = {
            nama,
            tanggal,
            expired,
            vendor,
            lokasi,
            kondisi,
            harga,
            stok,
            satuan,
        };
        console.log("Aset Masuk Ditambahkan:", data);
        alert("Aset masuk berhasil ditambahkan!");
        // TODO: Kirim ke API/backend
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Aset Masuk
                </div>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Aset Masuk</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="space-y-1">
                                <Label>Nama Aset</Label>
                                <Input
                                    value={nama}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setNama(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Tanggal Masuk</Label>
                                <Input
                                    type="date"
                                    value={tanggal}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setTanggal(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Tanggal Expired</Label>
                                <Input
                                    type="date"
                                    value={expired}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setExpired(e.target.value)
                                    }
                                />
                            </div>

                            {/* VENDOR DROPDOWN */}
                            <div className="space-y-1">
                                <Label>Vendor</Label>
                                <select
                                    value={vendor}
                                    onChange={(e) => setVendor(e.target.value)}
                                    required
                                    className="w-full border rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
                                >
                                    <option value="" disabled>Pilih vendor</option>
                                    {vendorList.map((v) => (
                                        <option key={v.id} value={v.nama}>
                                            {v.nama}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="space-y-1">
                                <Label>Lokasi</Label>
                                <Input
                                    value={lokasi}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setLokasi(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Kondisi</Label>
                                <select
                                    value={kondisi}
                                    onChange={(e) => setKondisi(e.target.value)}
                                    className="w-full border rounded-md px-3 py-2 bg-white text-sm"
                                >
                                    <option value="Tidak Rusak">Tidak Rusak</option>
                                    <option value="Rusak">Rusak</option>
                                </select>
                            </div>

                            <div className="space-y-1">
                                <Label>Harga</Label>
                                <Input
                                    type="text"
                                    value={harga}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setHarga(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Stok</Label>
                                <Input
                                    type="number"
                                    value={stok}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setStok(parseInt(e.target.value, 10) || 0)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Satuan</Label>
                                <select
                                    value={satuan}
                                    onChange={(e) => setSatuan(e.target.value)}
                                    required
                                    className="w-full border rounded-md px-3 py-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-red-700"
                                >
                                    <option value="" disabled>Pilih satuan</option>
                                    <option value="Unit">Unit</option>
                                    <option value="Liter">Liter</option>
                                    <option value="Pcs">Pcs</option>
                                </select>
                            </div>


                            <div className="flex justify-end pt-4">
                                <Button type="submit">Simpan</Button>
                            </div>

                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
