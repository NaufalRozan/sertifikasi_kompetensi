"use client";

import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";
import { BASE_URL } from "@/constant/BaseURL";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Validasi schema dengan Zod
const vendorSchema = z.object({
    name: z.string().min(1, "Nama vendor harus diisi"),
    email: z.string().email("Email tidak valid"),
    phone: z.string().min(1, "Telepon harus diisi"),
    address: z.string().min(1, "Alamat harus diisi"),
});

export default function AddVendorPage() {
    const router = useRouter();

    const form = useForm<z.infer<typeof vendorSchema>>({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
        },
    });

    const onSubmit = async (values: z.infer<typeof vendorSchema>) => {
        try {
            await toast.promise(
                axios.post(`${BASE_URL}/vendors`, values, {
                    withCredentials: true,
                }),
                {
                    loading: "Menyimpan vendor...",
                    success: () => {
                        router.push("/vendor");
                        return "Vendor berhasil ditambahkan!";
                    },
                    error: (err) => {
                        const msg = err?.response?.data?.message || "Terjadi kesalahan.";
                        return `Gagal menyimpan: ${msg}`;
                    },
                }
            );
        } catch (err) {
            console.error("Submit error:", err);
        }
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
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                            {/* Nama */}
                            <div className="space-y-1">
                                <Label>Nama Vendor</Label>
                                <Input {...form.register("name")} />
                                {form.formState.errors.name && (
                                    <p className="text-sm text-red-500">{form.formState.errors.name.message}</p>
                                )}
                            </div>

                            {/* Email */}
                            <div className="space-y-1">
                                <Label>Email</Label>
                                <Input type="email" {...form.register("email")} />
                                {form.formState.errors.email && (
                                    <p className="text-sm text-red-500">{form.formState.errors.email.message}</p>
                                )}
                            </div>

                            {/* Telepon */}
                            <div className="space-y-1">
                                <Label>Telepon</Label>
                                <Input {...form.register("phone")} />
                                {form.formState.errors.phone && (
                                    <p className="text-sm text-red-500">{form.formState.errors.phone.message}</p>
                                )}
                            </div>

                            {/* Alamat */}
                            <div className="space-y-1">
                                <Label>Alamat</Label>
                                <Textarea rows={3} {...form.register("address")} />
                                {form.formState.errors.address && (
                                    <p className="text-sm text-red-500">{form.formState.errors.address.message}</p>
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
