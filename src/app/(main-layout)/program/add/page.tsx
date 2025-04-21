"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner";
import { z } from "zod";
import { Program } from "@/lib/types";
import { useForm } from "react-hook-form";
import axios from "axios";
import { BASE_URL } from "@/constant/BaseURL";
import { useRouter } from "next/navigation";

export default function AddProgramPage() {
    const [namaProgram, setNamaProgram] = useState("");
    const [tanggalMulai, setTanggalMulai] = useState("");
    const [tanggalAkhir, setTanggalAkhir] = useState("");
    const [deskripsi, setDeskripsi] = useState("");
    const [status, setStatus] = useState("Dijadwalkan");

    const [categories, setCategories] = useState<Program[]>([]);
    const router = useRouter();
    const formSchema = z.object({
        name: z.string({
            required_error: "Nama Tahap harus diisi"
        }),
        description: z.string({
            required_error: "Deskripsi harus diisi"
        }),
        status: z.enum(["Dijadwalkan", "Proses", "Selesai"], {
            required_error: "Status harus diisi",
        }),
        dateRange: z.object({
            from: z.string().min(1, "Tanggal mulai wajib diisi"),
            to: z.string().min(1, "Tanggal akhir wajib diisi"),
        }),

    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: undefined,
            description: undefined,
            dateRange: {
                from: undefined,
                to: undefined,
            }
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
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
            toast.promise(
                axios.post(`${BASE_URL}/programs`, payload, {
                    withCredentials: true,
                }),
                {
                    loading: "Menyimpan data...",
                    success: (data) => {
                        setTimeout(() => {
                            router.push('/program')
                        }, 300);
                        return `Berhasil menyimpan data`
                    },
                    error: (e) => {
                        const msg = e?.response?.data?.message || e.message;
                        return `Gagal menyimpan data: ${msg}`;
                    },
                }
            );
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Program
                </div>
            </div>

            {/* Form */}
            <div className="w-full max-w-xl bg-white -mt-52 z-10 relative p-6 rounded-2xl shadow-lg">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-sm">
                    {/* Nama */}
                    <div>
                        <label className="font-medium block mb-1">Nama Program</label>
                        <input
                            type="text"
                            {...form.register("name")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        />
                        {form.formState.errors.name && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.name.message}</p>
                        )}
                    </div>

                    {/* Tanggal */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="font-medium block mb-1">Tanggal Mulai</label>
                            <input
                                type="date"
                                {...form.register("dateRange.from")}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {form.formState.errors.dateRange?.from && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.dateRange.from.message}</p>
                            )}
                        </div>
                        <div>
                            <label className="font-medium block mb-1">Tanggal Akhir</label>
                            <input
                                type="date"
                                {...form.register("dateRange.to")}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {form.formState.errors.dateRange?.to && (
                                <p className="text-red-500 text-xs mt-1">{form.formState.errors.dateRange.to.message}</p>
                            )}
                        </div>
                    </div>

                    {/* Deskripsi */}
                    <div>
                        <label className="font-medium block mb-1">Deskripsi</label>
                        <textarea
                            {...form.register("description")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                            rows={3}
                        />
                        {form.formState.errors.description && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.description.message}</p>
                        )}
                    </div>

                    {/* Status */}
                    <div>
                        <label className="font-medium block mb-1">Status</label>
                        <select
                            {...form.register("status")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="Dijadwalkan">Dijadwalkan</option>
                            <option value="Proses">Proses</option>
                            <option value="Selesai">Selesai</option>
                        </select>
                        {form.formState.errors.status && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.status.message}</p>
                        )}
                    </div>

                    {/* Submit */}
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