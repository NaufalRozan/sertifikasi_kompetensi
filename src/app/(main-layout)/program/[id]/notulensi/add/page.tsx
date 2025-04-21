"use client";

import { useState, ChangeEvent } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { BASE_URL } from "@/constant/BaseURL";
import { toast } from "sonner";

export default function AddNotulensiPage() {
    const { id: programId } = useParams();
    const router = useRouter();

    const [nama, setNama] = useState("");
    const [description, setDescription] = useState("");
    const [tanggal, setTanggal] = useState("");
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile && selectedFile.type === "application/pdf") {
            setFile(selectedFile);
        } else {
            alert("Hanya file PDF yang diperbolehkan.");
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!file) {
            alert("Silakan upload file notulensi (PDF).");
            return;
        }

        const formData = new FormData();
        formData.append("name", nama);
        formData.append("description", description);
        formData.append("tanggal", tanggal);
        formData.append("programId", programId as string);
        formData.append("files", file); // ✅ PENTING: gunakan "files" sesuai backend

        toast.promise(
            axios.post(`${BASE_URL}/notulensi`, formData, {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }),
            {
                loading: "Mengunggah notulensi...",
                success: () => {
                    setTimeout(() => {
                        router.push(`/program/${programId}/subprogram`);
                    }, 500);
                    return "Notulensi berhasil ditambahkan!";
                },
                error: (e) => {
                    const msg = e?.response?.data?.message || e.message;
                    return `Gagal menambahkan notulensi: ${msg}`;
                },
            }
        );
    };


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Notulensi
                </div>
            </div>

            {/* Form */}
            <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Notulensi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Nama Notulensi */}
                            <div className="space-y-1">
                                <Label>Nama / Topik</Label>
                                <Input
                                    value={nama}
                                    onChange={(e) => setNama(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Deskripsi */}
                            <div className="space-y-1">
                                <Label>Deskripsi</Label>
                                <Input
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Tanggal */}
                            <div className="space-y-1">
                                <Label>Tanggal</Label>
                                <Input
                                    type="date"
                                    value={tanggal}
                                    onChange={(e) => setTanggal(e.target.value)}
                                    required
                                />
                            </div>

                            {/* Upload File */}
                            <div className="space-y-1">
                                <Label htmlFor="file">Upload File Notulensi (PDF)</Label>
                                <Input
                                    id="file"
                                    type="file"
                                    accept="application/pdf"
                                    onChange={handleFileChange}
                                    required
                                />
                                {file && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        File dipilih: <strong>{file.name}</strong>
                                    </p>
                                )}
                            </div>

                            {/* Submit */}
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
