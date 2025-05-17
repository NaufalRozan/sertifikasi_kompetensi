"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BASE_URL } from "@/constant/BaseURL";

export default function AddPesertaPage() {
    const { id: programId, eventId } = useParams();
    const router = useRouter();

    const [allUsers, setAllUsers] = useState<any[]>([]);
    const [selectedUserIds, setSelectedUserIds] = useState<Set<string>>(new Set());
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(`${BASE_URL}/peserta`, {
                    withCredentials: true,
                });
                setAllUsers(res.data.data || []);
            } catch (error) {
                toast.error("Gagal memuat daftar peserta.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleCheckboxChange = (userId: string) => {
        setSelectedUserIds((prev) => {
            const newSet = new Set(prev);
            if (newSet.has(userId)) {
                newSet.delete(userId);
            } else {
                newSet.add(userId);
            }
            return newSet;
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const selectedUsers = allUsers.filter((user) => selectedUserIds.has(user.id));

        if (selectedUsers.length === 0) {
            toast.error("Pilih minimal satu peserta.");
            return;
        }

        const payload = selectedUsers.map((user) => ({
            name: user.name ?? "",
            email: user.email ?? "",
            phone: user.phone ?? "",
            nim: user.nim ?? "",
            status: user.status ?? "Belum",
            balance: user.balance ?? 0,
            sertifikasiTerdaftar: user.sertifikasiTerdaftar ?? "Belum Ditentukan",
            picture: user.picture ?? "",
            providerId: user.providerId ?? "",
            eventId: eventId as string, // <-- penting untuk relasi
        }));

        console.log("Payload yang dikirim:", payload); // Debug saat error

        toast.promise(
            axios.post(`${BASE_URL}/peserta/many`, payload, {
                withCredentials: true,
            }),
            {
                loading: "Menyimpan peserta...",
                success: () => {
                    setTimeout(() => {
                        router.push(`/program/${programId}/event/${eventId}/peserta`);
                    }, 500);
                    return "Peserta berhasil ditambahkan!";
                },
                error: (err) => {
                    const msg = err?.response?.data?.message || err.message;
                    return `Gagal menambahkan peserta: ${msg}`;
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
                    Tambah Peserta Event
                </div>
            </div>

            {/* Form */}
            <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
                <Card>
                    <CardHeader>
                        <CardTitle>Pilih Peserta dari Daftar</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {loading ? (
                                <p className="text-gray-500 text-center">Memuat data peserta...</p>
                            ) : allUsers.length === 0 ? (
                                <p className="text-gray-500 italic text-center">Tidak ada data peserta.</p>
                            ) : (
                                <div className="space-y-3 max-h-[400px] overflow-y-auto border p-3 rounded-md">
                                    {allUsers.map((user) => (
                                        <div
                                            key={user.id}
                                            className="flex items-center justify-between border-b py-2"
                                        >
                                            <div>
                                                <p className="text-sm font-medium">{user.name ?? "Tanpa Nama"}</p>
                                                <p className="text-xs text-gray-500">{user.email}</p>
                                            </div>
                                            <Checkbox
                                                checked={selectedUserIds.has(user.id)}
                                                onCheckedChange={() => handleCheckboxChange(user.id)}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}

                            {/* Submit */}
                            <div className="flex justify-end pt-4">
                                <Button type="submit">Simpan Peserta</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
