"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState, ChangeEvent } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BASE_URL } from "@/constant/BaseURL";
import { Save } from "lucide-react";

const formSchema = z.object({
    name: z.string({ required_error: "Nama / topik wajib diisi" }),
    description: z.string({ required_error: "Deskripsi wajib diisi" }),
    tanggal: z.string().min(1, "Tanggal wajib diisi"),
});

export default function EditNotulensiPage() {
    const router = useRouter();
    const { id: programId, notulensiId, eventId } = useParams();

    const [existingFile, setExistingFile] = useState<any | null>(null);
    const [newFile, setNewFile] = useState<File | null>(null);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            tanggal: "",
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = form;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/notulensi/${notulensiId}`, {
                    withCredentials: true,
                });

                const notulensi = res.data.data;

                form.reset({
                    name: notulensi.name,
                    description: notulensi.description,
                    tanggal: notulensi.tanggal.slice(0, 10),
                });

                if (notulensi?.File?.length > 0) {
                    setExistingFile(notulensi.File[0]);
                }
            } catch (err) {
                toast.error("Gagal memuat data notulensi.");
                console.error(err);
            }
        };

        if (notulensiId) fetchData();
    }, [notulensiId, form]);

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const selected = e.target.files?.[0];
        if (selected && selected.type === "application/pdf") {
            setNewFile(selected);
        } else {
            toast.error("Hanya file PDF yang diperbolehkan.");
        }
    };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("description", values.description);
        formData.append("tanggal", new Date(values.tanggal).toISOString());
        formData.append("eventId", eventId as string);

        if (newFile) {
            formData.append("files", newFile);
        } else {
            formData.append("retainFile", "true"); // opsional, tergantung backend kamu
        }

        try {
            await toast.promise(
                axios.put(`${BASE_URL}/notulensi/${notulensiId}`, formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                }),
                {
                    loading: "Menyimpan perubahan...",
                    success: "Notulensi berhasil diperbarui!",
                    error: "Gagal memperbarui notulensi.",
                }
            );
            router.push(`/program/${programId}/event/${eventId}/notulensi`);
        } catch (err: any) {
            console.error("Error:", err?.response?.data || err.message);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Save className="w-5 h-5" />
                    Edit Notulensi
                </div>
            </div>

            <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Notulensi</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Nama */}
                            <div className="space-y-1">
                                <Label>Nama / Topik</Label>
                                <Input {...register("name")} />
                                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                            </div>

                            {/* Deskripsi */}
                            <div className="space-y-1">
                                <Label>Deskripsi</Label>
                                <Input {...register("description")} />
                                {errors.description && <p className="text-sm text-red-500">{errors.description.message}</p>}
                            </div>

                            {/* Tanggal */}
                            <div className="space-y-1">
                                <Label>Tanggal</Label>
                                <Input type="date" {...register("tanggal")} />
                                {errors.tanggal && <p className="text-sm text-red-500">{errors.tanggal.message}</p>}
                            </div>

                            {/* Upload File */}
                            <div className="space-y-1">
                                <Label>Upload File Baru (PDF)</Label>
                                <Input type="file" accept="application/pdf" onChange={handleFileChange} />
                                {existingFile && !newFile && (
                                    <p className="text-sm text-gray-600 mt-1">
                                        File saat ini:{" "}
                                        <a
                                            href={`${BASE_URL}/notulensi/doc/${existingFile.id}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-600 hover:underline"
                                        >
                                            {existingFile.originalName || existingFile.filename}
                                        </a>
                                    </p>
                                )}
                                {newFile && (
                                    <p className="text-sm text-green-600 mt-1">
                                        File baru dipilih: <strong>{newFile.name}</strong>
                                    </p>
                                )}
                            </div>

                            <div className="flex justify-end pt-4">
                                <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Save className="w-4 h-4 mr-2" />
                                    Simpan Perubahan
                                </Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
