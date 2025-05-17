"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Building2, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BASE_URL } from "@/constant/BaseURL";
import {
    AlertDialog,
    AlertDialogTrigger,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogCancel,
    AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";


export default function VendorPage() {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState("");
    const [vendors, setVendors] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchVendors = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/vendors/`, {
                    withCredentials: true,
                });

                // Cek isi responsenya
                console.log("Vendor response:", response.data);

                // Jika data adalah array
                setVendors(response.data.data || []);
            } catch (err: any) {
                console.error("Fetch vendor error:", err);
                setError("Gagal memuat data vendor.");
            } finally {
                setLoading(false);
            }
        };

        fetchVendors();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-between items-center text-xl font-semibold">
                    <div className="flex items-center gap-2">
                        <Building2 className="w-5 h-5" />
                        Manajemen Vendor
                    </div>
                </div>
            </div>

            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
                <div className="flex flex-col gap-4 mb-4">
                    <div className="flex justify-between items-center flex-wrap gap-4">
                        <div />
                        <Button
                            onClick={() => router.push("/vendor/add")}
                            className="bg-blue-600 hover:bg-blue-700 text-white"
                        >
                            + Tambah Vendor
                        </Button>
                    </div>

                    <Input
                        type="text"
                        placeholder="Cari vendor..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
                    />
                </div>

                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                    {loading ? (
                        <div className="p-4 text-center text-gray-500">Memuat data vendor...</div>
                    ) : error ? (
                        <div className="p-4 text-center text-red-500">{error}</div>
                    ) : vendors.length === 0 ? (
                        <div className="p-10 text-center text-gray-500 italic">
                            Belum ada vendor yang ditambahkan.

                        </div>
                    ) : (
                        <table className="w-full text-sm text-left">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">No</th>
                                    <th className="p-4">Nama Vendor</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Telepon</th>
                                    <th className="p-4">Alamat</th>
                                    <th className="p-4">Aksi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {vendors
                                    .filter((vendor) =>
                                        vendor.name.toLowerCase().includes(searchQuery.toLowerCase())
                                    )
                                    .map((vendor, index) => (
                                        <tr key={vendor.id} className="border-b hover:bg-gray-50">
                                            <td className="p-4">{index + 1}</td>
                                            <td className="p-4">{vendor.name}</td>
                                            <td className="p-4">{vendor.email}</td>
                                            <td className="p-4">{vendor.phone}</td>
                                            <td className="p-4">{vendor.address}</td>
                                            <td className="p-4 flex items-center gap-2">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                                                    onClick={() => router.push(`/vendor/edit/${vendor.id}`)}
                                                >
                                                    <Pencil size={16} />
                                                </Button>

                                                <AlertDialog>
                                                    <AlertDialogTrigger asChild>
                                                        <Button
                                                            variant="ghost"
                                                            size="icon"
                                                            className="bg-red-100 hover:bg-red-200 text-red-600"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </AlertDialogTrigger>

                                                    <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                                                        <AlertDialogHeader>
                                                            <AlertDialogTitle>Yakin ingin menghapus vendor?</AlertDialogTitle>
                                                            <AlertDialogDescription>
                                                                Tindakan ini tidak dapat dibatalkan. Data vendor akan dihapus secara permanen.
                                                            </AlertDialogDescription>
                                                        </AlertDialogHeader>

                                                        <AlertDialogFooter>
                                                            <AlertDialogCancel>Batal</AlertDialogCancel>
                                                            <AlertDialogAction
                                                                className="bg-red-600 hover:bg-red-700 text-white"
                                                                onClick={async () => {
                                                                    try {
                                                                        await axios.delete(`${BASE_URL}/vendors/${vendor.id}`, {
                                                                            withCredentials: true,
                                                                        });
                                                                        setVendors((prev) => prev.filter((v) => v.id !== vendor.id));
                                                                        toast.success("Vendor berhasil dihapus!");
                                                                    } catch (err) {
                                                                        console.error(err);
                                                                        toast.error("Gagal menghapus vendor.");
                                                                    }
                                                                }}
                                                            >
                                                                Hapus
                                                            </AlertDialogAction>
                                                        </AlertDialogFooter>
                                                    </AlertDialogContent>
                                                </AlertDialog>

                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
}
