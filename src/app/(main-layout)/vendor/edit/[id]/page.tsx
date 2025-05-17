"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
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

export default function EditVendorPage() {
    const router = useRouter();
    const { id: vendorId } = useParams();
    const [loading, setLoading] = useState(true);

    const form = useForm<z.infer<typeof vendorSchema>>({
        resolver: zodResolver(vendorSchema),
        defaultValues: {
            name: "",
            email: "",
            phone: "",
            address: "",
        },
    });

    // Fetch vendor details
    useEffect(() => {
        const fetchVendor = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/vendors/${vendorId}`, {
                    withCredentials: true,
                });
                const vendor = res.data.data;

                form.reset({
                    name: vendor.name ?? "",
                    email: vendor.email ?? "",
                    phone: vendor.phone ?? "",
                    address: vendor.address ?? "",
                });
            } catch (err) {
                toast.error("Gagal memuat data vendor.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        if (vendorId) fetchVendor();
    }, [vendorId, form]);

    const onSubmit = async (values: z.infer<typeof vendorSchema>) => {
        try {
            await toast.promise(
                axios.put(`${BASE_URL}/vendors/${vendorId}`, values, {
                    withCredentials: true,
                }),
                {
                    loading: "Menyimpan perubahan...",
                    success: () => {
                        router.push("/vendor");
                        return "Vendor berhasil diperbarui!";
                    },
                    error: (err) => {
                        const msg = err?.response?.data?.message || "Terjadi kesalahan.";
                        return `Gagal menyimpan: ${msg}`;
                    },
                }
            );
        } catch (err) {
            console.error("Update error:", err);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Pencil className="w-5 h-5" />
                    Edit Vendor
                </div>
            </div>

            {/* Form Card */}
            <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Form Edit Vendor</CardTitle>
                    </CardHeader>
                    <CardContent>
                        {loading ? (
                            <p className="text-gray-500 text-center">Memuat data vendor...</p>
                        ) : (
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                                {/* Nama */}
                                <div className="space-y-1">
                                    <Label>Nama Vendor</Label>
                                    <Input {...form.register("name")} />
                                    {form.formState.errors.name && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.name.message}
                                        </p>
                                    )}
                                </div>

                                {/* Email */}
                                <div className="space-y-1">
                                    <Label>Email</Label>
                                    <Input type="email" {...form.register("email")} />
                                    {form.formState.errors.email && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.email.message}
                                        </p>
                                    )}
                                </div>

                                {/* Telepon */}
                                <div className="space-y-1">
                                    <Label>Telepon</Label>
                                    <Input {...form.register("phone")} />
                                    {form.formState.errors.phone && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.phone.message}
                                        </p>
                                    )}
                                </div>

                                {/* Alamat */}
                                <div className="space-y-1">
                                    <Label>Alamat</Label>
                                    <Textarea rows={3} {...form.register("address")} />
                                    {form.formState.errors.address && (
                                        <p className="text-sm text-red-500">
                                            {form.formState.errors.address.message}
                                        </p>
                                    )}
                                </div>

                                {/* Submit */}
                                <div className="flex justify-end pt-4">
                                    <Button type="submit">Simpan Perubahan</Button>
                                </div>
                            </form>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
