"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Calendar, Save } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BASE_URL } from "@/constant/BaseURL";

const formSchema = z.object({
    name: z.string({ required_error: "Nama program wajib diisi" }),
    description: z.string({ required_error: "Deskripsi wajib diisi" }),
    status: z.enum(["Dijadwalkan", "Proses", "Selesai"], {
        required_error: "Status wajib diisi",
    }),
    dateRange: z.object({
        from: z.string().min(1, "Tanggal mulai wajib diisi"),
        to: z.string().min(1, "Tanggal akhir wajib diisi"),
    }),
});

export default function EditProgramPage() {
    const router = useRouter();
    const { id } = useParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            status: "Dijadwalkan",
            dateRange: {
                from: "",
                to: "",
            },
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
        watch,
    } = form;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/programs/${id}`, {
                    withCredentials: true,
                });

                const data = res.data.data;

                form.reset({
                    name: data.name,
                    description: data.description,
                    status: data.status,
                    dateRange: {
                        from: data.startDate.slice(0, 10),
                        to: data.endDate.slice(0, 10),
                    },
                });
            } catch (error) {
                toast.error("Gagal mengambil data program");
                console.error(error);
            }
        };

        if (id) fetchData();
    }, [id, form]);


    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const payload = {
            name: values.name,
            description: values.description,
            status: values.status,
            dateRange: {
                from: new Date(values.dateRange.from).toISOString(),
                to: new Date(values.dateRange.to).toISOString(),
            },
        };

        try {
            await toast.promise(
                axios.put(`${BASE_URL}/programs/${id}`, payload, {
                    withCredentials: true,
                }),
                {
                    loading: "Menyimpan perubahan...",
                    success: "Program berhasil diperbarui!",
                    error: "Gagal memperbarui program.",
                }
            );

            router.push("/program");
        } catch (err: any) {
            console.error("Update error:", err?.response?.data || err.message);
        }
    };

    const dateRange = watch("dateRange");

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Calendar className="w-5 h-5" />
                    Edit Program
                </div>
            </div>

            <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Program</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Nama */}
                            <div className="space-y-1">
                                <Label>Nama Program</Label>
                                <Input {...register("name")} />
                                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
                            </div>

                            {/* Deskripsi */}
                            <div className="space-y-1">
                                <Label>Deskripsi</Label>
                                <Input {...register("description")} />
                                {errors.description && (
                                    <p className="text-sm text-red-500">{errors.description.message}</p>
                                )}
                            </div>

                            {/* Status */}
                            <div className="space-y-1">
                                <Label>Status</Label>
                                <Select
                                    value={watch("status")}
                                    onValueChange={(val) => setValue("status", val as any)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {["Dijadwalkan", "Proses", "Selesai", "Dibatalkan"].map((item) => (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.status && (
                                    <p className="text-sm text-red-500">{errors.status.message}</p>
                                )}
                            </div>

                            {/* Periode */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>Tanggal Mulai</Label>
                                    <Input
                                        type="date"
                                        value={dateRange?.from}
                                        onChange={(e) =>
                                            setValue("dateRange", { ...dateRange, from: e.target.value })
                                        }
                                    />
                                    {errors.dateRange?.from && (
                                        <p className="text-sm text-red-500">{errors.dateRange.from.message}</p>
                                    )}
                                </div>
                                <div className="space-y-1">
                                    <Label>Tanggal Selesai</Label>
                                    <Input
                                        type="date"
                                        value={dateRange?.to}
                                        onChange={(e) =>
                                            setValue("dateRange", { ...dateRange, to: e.target.value })
                                        }
                                    />
                                    {errors.dateRange?.to && (
                                        <p className="text-sm text-red-500">{errors.dateRange.to.message}</p>
                                    )}
                                </div>
                            </div>

                            {/* Submit */}
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
