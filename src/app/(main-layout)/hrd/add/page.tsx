"use client";

import { useState } from "react";
import { PlusCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/constant/BaseURL";

const formSchema = z.object({
    name: z.string().min(1, "Nama harus diisi"),
    email: z.string().email("Email tidak valid"),
    NIP: z.string().min(1, "NIP harus diisi"),
    sertifikasiId: z.string().optional(),
    phone: z.string().min(1, "Nomor HP harus diisi"),
    NPWP: z.string().optional(),
    namaBank: z.string().optional(),
    noRek: z.string().optional(),
    status: z.string().min(1, "Status harus diisi"),
    notifikasi: z.string().optional(),
    jabatan: z.string().min(1, "Jabatan harus diisi"),
    unit: z.string().min(1, "Unit harus diisi"),
    role: z.enum(["Staff", "Trainer", "PJ", "Assessor"]),
});

export default function AddPengurusPage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            role: "Trainer",
        },
    });

    function onSubmit(values: z.infer<typeof formSchema>) {
        toast.promise(
            axios.post(`${BASE_URL}/api/v1/employees/`, values, {
                withCredentials: true,
            }),
            {
                loading: "Menyimpan data...",
                success: () => {
                    setTimeout(() => {
                        router.push('/hrd');
                    }, 300);
                    return "Berhasil menyimpan pengurus";
                },
                error: (e) => {
                    const msg = e?.response?.data?.message || e.message;
                    return `Gagal menyimpan data: ${msg}`;
                },
            }
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <PlusCircle className="w-5 h-5" />
                    Tambah Pengurus
                </div>
            </div>

            {/* Form */}
            <div className="w-full max-w-xl bg-white -mt-52 z-10 relative p-6 rounded-2xl shadow-lg">
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 text-sm">
                    {[
                        { label: "Nama", name: "name" },
                        { label: "Email", name: "email", type: "email" },
                        { label: "NIP", name: "NIP" },
                        { label: "ID Sertifikasi", name: "sertifikasiId" },
                        { label: "No. HP", name: "phone" },
                        { label: "NPWP", name: "NPWP" },
                        { label: "Nama Bank", name: "namaBank" },
                        { label: "No. Rekening", name: "noRek" },
                        { label: "Status", name: "status" },
                        { label: "Notifikasi", name: "notifikasi" },
                        { label: "Jabatan", name: "jabatan" },
                        { label: "Unit", name: "unit" },
                    ].map(({ label, name, type = "text" }) => (
                        <div key={name}>
                            <label className="font-medium block mb-1">{label}</label>
                            <input
                                type={type}
                                {...form.register(name as keyof z.infer<typeof formSchema>)}
                                className="w-full border border-gray-300 rounded px-3 py-2"
                            />
                            {form.formState.errors[name as keyof typeof form.formState.errors] && (
                                <p className="text-red-500 text-xs mt-1">
                                    {form.formState.errors[name as keyof typeof form.formState.errors]?.message as string}
                                </p>
                            )}
                        </div>
                    ))}

                    {/* Role */}
                    <div>
                        <label className="font-medium block mb-1">Role</label>
                        <select
                            {...form.register("role")}
                            className="w-full border border-gray-300 rounded px-3 py-2"
                        >
                            <option value="Staff">Staff</option>
                            <option value="Trainer">Trainer</option>
                            <option value="PJ">Penanggung Jawab</option>
                            <option value="Assessor">Assessor</option>
                        </select>
                        {form.formState.errors.role && (
                            <p className="text-red-500 text-xs mt-1">{form.formState.errors.role.message}</p>
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
