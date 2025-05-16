"use client";

import { useRouter, useParams } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { toast } from "sonner";
import { Calendar, Save } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";

import { BASE_URL } from "@/constant/BaseURL";

const jenisOptions = [
    { id: "1", label: "Tes Jenis" },

];

const formSchema = z.object({
    programId: z.string(),
    jenisEventId: z.string({ required_error: "Jenis event wajib diisi" }),
    name: z.string({ required_error: "Nama event wajib diisi" }),
    description: z.string({ required_error: "Deskripsi wajib diisi" }),
    dateRange: z.object({
        from: z.string().min(1, "Tanggal mulai wajib diisi"),
        to: z.string().min(1, "Tanggal akhir wajib diisi"),
    }),
    harga: z.coerce.number({ required_error: "Harga wajib diisi" }),
    tempat: z.string({ required_error: "Tempat wajib diisi" }),
});

export default function EditEventPage() {
    const router = useRouter();
    const { id: programId, eventId } = useParams();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            programId: programId as string,
            jenisEventId: "",
            name: "",
            description: "",
            dateRange: {
                from: "",
                to: "",
            },
            harga: 0,
            tempat: "",
        },
    });

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        formState: { errors },
    } = form;

    // Fetch data saat mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/events/${eventId}`, {
                    withCredentials: true,
                });

                const event = res.data.data;

                form.reset({
                    programId: event.programId,
                    jenisEventId: event.jenisEventId,
                    name: event.name,
                    description: event.description,
                    dateRange: {
                        from: event.startDate.slice(0, 10),
                        to: event.endDate.slice(0, 10),
                    },
                    harga: event.harga,
                    tempat: event.tempat,
                });
            } catch (err) {
                toast.error("Gagal mengambil data event.");
                console.error(err);
            }
        };

        if (eventId) {
            fetchData();
        }
    }, [eventId, form]);

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        const payload = {
            programId: values.programId,
            jenisEventId: values.jenisEventId,
            name: values.name,
            description: values.description,
            dateRange: {
                from: new Date(values.dateRange.from).toISOString(),
                to: new Date(values.dateRange.to).toISOString(),
            },
            harga: values.harga,
            tempat: values.tempat,
        };

        try {
            await toast.promise(
                axios.put(`${BASE_URL}/events/${eventId}`, payload, {
                    withCredentials: true,
                }),
                {
                    loading: "Menyimpan perubahan...",
                    success: "Event berhasil diperbarui!",
                    error: "Gagal memperbarui event.",
                }
            );

            router.push(`/program/${programId}/event`);
        } catch (err) {
            console.error(err);
        }
    };

    const dateRange = watch("dateRange");

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Calendar className="w-5 h-5" />
                    Edit Event
                </div>
            </div>

            <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Edit Event</CardTitle>
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

                            {/* Jenis Event */}
                            <div className="space-y-1">
                                <Label>Jenis Event</Label>
                                <Select
                                    value={watch("jenisEventId")}
                                    onValueChange={(val) => setValue("jenisEventId", val)}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Pilih jenis event" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {jenisOptions.map((option) => (
                                            <SelectItem key={option.id} value={option.id}>
                                                {option.label}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                {errors.jenisEventId && (
                                    <p className="text-sm text-red-500">{errors.jenisEventId.message}</p>
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
