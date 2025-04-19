"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea"; // Jika kamu punya komponen ini

export default function AddVendorPage() {
    const [nama, setNama] = useState("");
    const [email, setEmail] = useState("");
    const [telepon, setTelepon] = useState("");
    const [alamat, setAlamat] = useState("");

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const data = { nama, email, telepon, alamat };
        console.log("Vendor Ditambahkan:", data);
        alert("Vendor berhasil ditambahkan!");
        // TODO: Kirim ke API/backend
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Vendor
                </div>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Vendor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">

                            <div className="space-y-1">
                                <Label>Nama Vendor</Label>
                                <Input
                                    value={nama}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setNama(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Email</Label>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setEmail(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Telepon</Label>
                                <Input
                                    type="tel"
                                    value={telepon}
                                    onChange={(e: ChangeEvent<HTMLInputElement>) =>
                                        setTelepon(e.target.value)
                                    }
                                    required
                                />
                            </div>

                            <div className="space-y-1">
                                <Label>Alamat</Label>
                                <Textarea
                                    value={alamat}
                                    onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
                                        setAlamat(e.target.value)
                                    }
                                    required
                                    rows={3}
                                />
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
