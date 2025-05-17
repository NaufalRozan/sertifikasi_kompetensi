"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PanitiaEventPage() {
    const { id: programId, eventId } = useParams();
    const router = useRouter();
    const [panitiaData, setPanitiaData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const dummyPanitia = [
            {
                nip: "PIC001",
                nama: "Dewi Lestari",
                email: "dewi.lestari@eventorganizer.com",
                whatsapp: "081234567800",
                jabatan: "PIC",
                unit: "Manajemen Acara",
                sertifikasi: "Manajemen Event",
                status: "Aktif",
                notifikasi: "Terkirim",
                npwp: "12.345.678.9-111.000",
                namaBank: "Bank Mandiri",
                rekening: "1122334455",
            },
            {
                nip: "ST001",
                nama: "Fajar Nugraha",
                email: "fajar.nugraha@eventorganizer.com",
                whatsapp: "081234567801",
                jabatan: "Staf Logistik",
                unit: "Perlengkapan",
                sertifikasi: "K3 Umum",
                status: "Aktif",
                notifikasi: "Terkirim",
                npwp: "33.444.555.6-777.000",
                namaBank: "Bank BRI",
                rekening: "6677889900",
            },
            {
                nip: "ST002",
                nama: "Rina Oktaviani",
                email: "rina.oktaviani@eventorganizer.com",
                whatsapp: "081234567802",
                jabatan: "Staf Registrasi",
                unit: "Pendaftaran",
                sertifikasi: "Administrasi Acara",
                status: "Nonaktif",
                notifikasi: "Belum",
                npwp: "22.333.444.5-888.000",
                namaBank: "Bank BCA",
                rekening: "5544332211",
            },
            {
                nip: "ST003",
                nama: "Bayu Pratama",
                email: "bayu.pratama@eventorganizer.com",
                whatsapp: "081234567803",
                jabatan: "Staf Keamanan",
                unit: "Keamanan",
                sertifikasi: "K3 Mekanik",
                status: "Aktif",
                notifikasi: "Terkirim",
                npwp: "66.777.888.1-999.000",
                namaBank: "Bank BNI",
                rekening: "9988776655",
            }
        ];


        setPanitiaData(dummyPanitia);
        setLoading(false);
    }, []);

    const getBadgeStyle = (value: string) => {
        switch (value) {
            case "Aktif":
            case "Terkirim":
                return "bg-green-100 text-green-700";
            case "Belum":
            case "Nonaktif":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-500";
        }
    };

    const pic = panitiaData.find((item) => item.jabatan === "PIC");
    const staff = panitiaData.filter((item) => item.jabatan !== "PIC");

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header Merah */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Users className="w-5 h-5" />
                    Panitia Event
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10 space-y-6">
                {/* Tombol Tambah */}
                <div className="flex justify-end">
                    <Button
                        onClick={() =>
                            router.push(`/program/${programId}/event/${eventId}/panitia/add`)
                        }
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Tambah Panitia
                    </Button>
                </div>

                {/* Tabel PIC */}
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                    <div className="text-lg font-semibold text-gray-800 px-4 pt-4">Penanggung Jawab (PIC)</div>
                    {loading ? (
                        <p className="text-center py-8 text-gray-500">Memuat data...</p>
                    ) : !pic ? (
                        <p className="text-center py-8 text-gray-500 italic">Belum ada PIC ditetapkan.</p>
                    ) : (
                        <table className="w-full text-sm text-left mt-2">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">NIP</th>
                                    <th className="p-4">Nama</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Whatsapp</th>
                                    <th className="p-4">Unit</th>
                                    <th className="p-4">Sertifikasi</th>
                                    <th className="p-4">NPWP</th>
                                    <th className="p-4">Bank</th>
                                    <th className="p-4">Rekening</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Notifikasi</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="border-b hover:bg-gray-50">
                                    <td className="p-4">{pic.nip}</td>
                                    <td className="p-4">{pic.nama}</td>
                                    <td className="p-4">{pic.email}</td>
                                    <td className="p-4">{pic.whatsapp}</td>
                                    <td className="p-4">{pic.unit}</td>
                                    <td className="p-4">{pic.sertifikasi}</td>
                                    <td className="p-4">{pic.npwp}</td>
                                    <td className="p-4">{pic.namaBank}</td>
                                    <td className="p-4">{pic.rekening}</td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(pic.status)}`}>
                                            {pic.status}
                                        </span>
                                    </td>
                                    <td className="p-4">
                                        <span className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(pic.notifikasi)}`}>
                                            {pic.notifikasi}
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Tabel Staf */}
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                    <div className="text-lg font-semibold text-gray-800 px-4 pt-4">Staf Panitia</div>
                    {staff.length === 0 ? (
                        <p className="text-center py-8 text-gray-500 italic">Belum ada staf panitia.</p>
                    ) : (
                        <table className="w-full text-sm text-left mt-2">
                            <thead className="text-red-700 font-semibold border-b">
                                <tr>
                                    <th className="p-4">NIP</th>
                                    <th className="p-4">Nama</th>
                                    <th className="p-4">Email</th>
                                    <th className="p-4">Whatsapp</th>
                                    <th className="p-4">Jabatan</th>
                                    <th className="p-4">Unit</th>
                                    <th className="p-4">Sertifikasi</th>
                                    <th className="p-4">NPWP</th>
                                    <th className="p-4">Bank</th>
                                    <th className="p-4">Rekening</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">Notifikasi</th>
                                </tr>
                            </thead>
                            <tbody>
                                {staff.map((item, idx) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.nip}</td>
                                        <td className="p-4">{item.nama}</td>
                                        <td className="p-4">{item.email}</td>
                                        <td className="p-4">{item.whatsapp}</td>
                                        <td className="p-4">{item.jabatan}</td>
                                        <td className="p-4">{item.unit}</td>
                                        <td className="p-4">{item.sertifikasi}</td>
                                        <td className="p-4">{item.npwp}</td>
                                        <td className="p-4">{item.namaBank}</td>
                                        <td className="p-4">{item.rekening}</td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(item.status)}`}>
                                                {item.status}
                                            </span>
                                        </td>
                                        <td className="p-4">
                                            <span className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(item.notifikasi)}`}>
                                                {item.notifikasi}
                                            </span>
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
