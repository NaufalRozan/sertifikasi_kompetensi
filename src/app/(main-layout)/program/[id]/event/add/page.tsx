"use client";

import { useRouter, useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
} from "@/components/ui/card";
import { BASE_URL } from "@/constant/BaseURL";

const jenisEventMap: Record<string, number> = {
    "Tes Jenis": 1,
};

const jenisOptions = Object.keys(jenisEventMap) as [string, ...string[]];

const formSchema = z.object({
    name: z.string({
        required_error: "Nama event harus diisi",
    }),
    description: z.string({
        required_error: "Deskripsi harus diisi",
    }),
    jenisEventId: z.enum(jenisOptions, {
        required_error: "Jenis event harus dipilih",
    }),
    dateRange: z.object({
        from: z.string().min(1, "Tanggal mulai wajib diisi"),
        to: z.string().min(1, "Tanggal akhir wajib diisi"),
    }),
    harga: z.string({
        required_error: "Harga harus diisi",
    }),
    tempat: z.string({
        required_error: "Tempat harus diisi",
    }),
});

export default function AddEventPage() {
    const router = useRouter();
    const { id: programId } = useParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: undefined,
            description: undefined,
            jenisEventId: undefined,
            dateRange: {
                from: undefined,
                to: undefined,
            },
            harga: undefined,
            tempat: undefined,
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = form;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const payload = {
            name: values.name,
            description: values.description,
            jenisEventId: jenisEventMap[values.jenisEventId],
            dateRange: {
                from: new Date(values.dateRange.from).toISOString(),
                to: new Date(values.dateRange.to).toISOString(),
            },
            harga: Number(values.harga),
            tempat: values.tempat,
            programId: programId,
        };

        try {
            toast.promise(
                axios.post(`${BASE_URL}/events`, payload, {
                    withCredentials: true,
                }),
                {
                    loading: "Menyimpan data...",
                    success: () => {
                        setTimeout(() => {
                            router.push(`/program/${programId}/event`);
                        }, 500);
                        return "Event berhasil ditambahkan!";
                    },
                    error: (e) => {
                        const msg = e?.response?.data?.message || e.message;
                        return `Gagal menyimpan data: ${msg}`;
                    },
                }
            );
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Event
                </div>
            </div>

            {/* Form */}
            <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Form Tambah Event</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            {/* Nama */}
                            <div className="space-y-1">
                                <Label>Nama Event</Label>
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
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label>Tanggal Awal</Label>
                                    <Input type="date" {...register("dateRange.from")} />
                                    {errors.dateRange?.from && <p className="text-sm text-red-500">{errors.dateRange.from.message}</p>}
                                </div>
                                <div className="space-y-1">
                                    <Label>Tanggal Akhir</Label>
                                    <Input type="date" {...register("dateRange.to")} />
                                    {errors.dateRange?.to && <p className="text-sm text-red-500">{errors.dateRange.to.message}</p>}
                                </div>
                            </div>

                            {/* Jenis */}
                            <div className="space-y-1">
                                <Label>Jenis Event</Label>
                                <Select
                                    value={watch("jenisEventId")}
                                    onValueChange={(val) => setValue("jenisEventId", val as any)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jenis event" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jenisOptions.map((item) => (
                                            <SelectItem key={item} value={item}>
                                                {item}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.jenisEventId && <p className="text-sm text-red-500">{errors.jenisEventId.message}</p>}
                            </div>

                            {/* Harga */}
                            <div className="space-y-1">
                                <Label>Harga</Label>
                                <Input type="number" {...register("harga")} />
                                {errors.harga && <p className="text-sm text-red-500">{errors.harga.message}</p>}
                            </div>

                            {/* Tempat */}
                            <div className="space-y-1">
                                <Label>Tempat</Label>
                                <Input {...register("tempat")} />
                                {errors.tempat && <p className="text-sm text-red-500">{errors.tempat.message}</p>}
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
