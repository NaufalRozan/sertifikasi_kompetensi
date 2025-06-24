"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserPlus, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constant/BaseURL";

export default function PanitiaEventPage() {
    const { id: programId, eventId } = useParams();
    const router = useRouter();

    const [panitiaData, setPanitiaData] = useState<any>(null); // satu entri panitia per event
    const [eventData, setEventData] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPanitia = async () => {
            try {
                const res = await fetch(`${BASE_URL}/panitia/`, {
                    credentials: "include",
                });
                const json = await res.json();

                const matched = json.data.find((item: any) => item.eventId === eventId);
                setPanitiaData(matched || null);
            } catch (err) {
                console.error("Gagal memuat data panitia:", err);
            }
        };

        const fetchEvent = async () => {
            try {
                const res = await fetch(`${BASE_URL}/events/${eventId}`, {
                    credentials: "include",
                });
                const json = await res.json();
                setEventData(json.data);
            } catch (err) {
                console.error("Gagal memuat data event:", err);
            }
        };

        setLoading(true);
        Promise.all([fetchEvent(), fetchPanitia()]).finally(() => setLoading(false));
    }, [eventId]);

    const getBadgeStyle = (value: string) => {
        switch (value) {
            case "Aktif":
            case "Terkirim":
                return "bg-green-100 text-green-700";
            case "Belum":
            case "Tidak Aktif":
                return "bg-red-100 text-red-700";
            default:
                return "bg-gray-100 text-gray-500";
        }
    };

    const pic = panitiaData?.PIC ?? null;
    const staff = panitiaData?.staff ?? [];

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center">
            {/* Header */}
            <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
                <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
                    <Users className="w-5 h-5" />
                    Panitia Event
                </div>
            </div>

            {/* Konten */}
            <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10 space-y-6">
                {/* Info Event */}
                {eventData && (
                    <div className="bg-white rounded-xl shadow px-6 py-4">
                        <h2 className="text-xl font-bold text-red-700 mb-2">{eventData.name}</h2>
                        <p className="text-sm text-gray-600">{eventData.description}</p>
                        <p className="text-sm mt-1 text-gray-500">
                            {new Date(eventData.startDate).toLocaleDateString("id-ID")} -{" "}
                            {new Date(eventData.endDate).toLocaleDateString("id-ID")}
                        </p>
                    </div>
                )}

                {/* Tombol Tambah / Edit */}
                <div className="flex justify-end">
                    <Button
                        onClick={() => {
                            const base = `/program/${programId}/event/${eventId}/panitia`;
                            const route = panitiaData ? `${base}/${panitiaData.id}/edit` : `${base}/add`;
                            router.push(route);
                        }}
                        className="bg-blue-600 hover:bg-blue-700 text-white"
                    >
                        <UserPlus className="w-4 h-4 mr-2" />
                        {panitiaData ? "Edit Panitia" : "Tambah Panitia"}
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
                                    <td className="p-4">{pic.NIP}</td>
                                    <td className="p-4">{pic.name}</td>
                                    <td className="p-4">{pic.email}</td>
                                    <td className="p-4">{pic.phone}</td>
                                    <td className="p-4">{pic.unit}</td>
                                    <td className="p-4">{pic.sertifikasiId}</td>
                                    <td className="p-4">{pic.NPWP}</td>
                                    <td className="p-4">{pic.namaBank}</td>
                                    <td className="p-4">{pic.noRek}</td>
                                    <td className="p-4">
                                        <span className={`inline-flex items-center px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(pic.status)}`}>
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

                {/* Tabel Staff */}
                <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
                    <div className="text-lg font-semibold text-gray-800 px-4 pt-4">Staf Panitia</div>
                    {loading ? (
                        <p className="text-center py-8 text-gray-500">Memuat data...</p>
                    ) : staff.length === 0 ? (
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
                                {staff.map((item: any, idx: number) => (
                                    <tr key={idx} className="border-b hover:bg-gray-50">
                                        <td className="p-4">{item.NIP}</td>
                                        <td className="p-4">{item.name}</td>
                                        <td className="p-4">{item.email}</td>
                                        <td className="p-4">{item.phone}</td>
                                        <td className="p-4">{item.jabatan}</td>
                                        <td className="p-4">{item.unit}</td>
                                        <td className="p-4">{item.sertifikasiId}</td>
                                        <td className="p-4">{item.NPWP}</td>
                                        <td className="p-4">{item.namaBank}</td>
                                        <td className="p-4">{item.noRek}</td>
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
