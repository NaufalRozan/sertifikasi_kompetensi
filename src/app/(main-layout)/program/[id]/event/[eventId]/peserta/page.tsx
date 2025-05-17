"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserPlus, User, Trash2 } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { Button } from "@/components/ui/button";
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

export default function PesertaEventPage() {
  const { id: programId, eventId } = useParams();
  const router = useRouter();

  const [pesertaData, setPesertaData] = useState<any[]>([]);
  const [eventData, setEventData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeserta = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/peserta`, {
          withCredentials: true,
        });

        const semuaPeserta = res.data.data || [];
        const filtered = semuaPeserta.filter((peserta: any) =>
          peserta.Event?.some((e: any) => e.id === eventId)
        );

        setPesertaData(filtered);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat peserta event.");
      } finally {
        setLoading(false);
      }
    };

    const fetchEvent = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/events/${eventId}`, {
          withCredentials: true,
        });
        setEventData(res.data.data);
      } catch (err) {
        console.error("Gagal memuat data event.", err);
      }
    };

    if (eventId) {
      fetchPeserta();
      fetchEvent();
    }
  }, [eventId]);

  const handleDeletePeserta = async (pesertaId: string) => {
    try {
      await toast.promise(
        axios.delete(`${BASE_URL}/events/disconnect-peserta`, {
          data: {
            id: eventId,
            pesertaId,
          },
          withCredentials: true,
        }),
        {
          loading: "Menghapus peserta dari event...",
          success: "Peserta berhasil dihapus dari event!",
          error: "Gagal menghapus peserta.",
        }
      );

      setPesertaData((prev) => prev.filter((p) => p.id !== pesertaId));
    } catch (err) {
      console.error(err);
    }
  };

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
          <User className="w-5 h-5" />
          Peserta Event
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

        {/* Tombol Tambah */}
        <div className="flex justify-end">
          <Button
            onClick={() =>
              router.push(`/program/${programId}/event/${eventId}/peserta/add`)
            }
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Tambah Peserta
          </Button>
        </div>

        {/* Tabel Peserta */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          {loading ? (
            <p className="text-center py-8 text-gray-500">Memuat data peserta...</p>
          ) : error ? (
            <p className="text-center py-8 text-red-500">{error}</p>
          ) : pesertaData.length === 0 ? (
            <p className="text-center py-8 text-gray-500 italic">
              Belum ada peserta pada event ini.
            </p>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-red-700 font-semibold border-b">
                <tr>
                  <th className="p-4">NIM</th>
                  <th className="p-4">Nama</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Whatsapp</th>
                  <th className="p-4">Sertifikasi Terdaftar</th>
                  <th className="p-4">Saldo</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">PDF Sertifikat</th>
                  <th className="p-4">Aksi</th>
                </tr>
              </thead>
              <tbody>
                {pesertaData.map((item) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{item.nim ?? "-"}</td>
                    <td className="p-4">{item.name ?? "-"}</td>
                    <td className="p-4">{item.email ?? "-"}</td>
                    <td className="p-4">{item.phone ?? "-"}</td>
                    <td className="p-4">{item.sertifikasiTerdaftar ?? "-"}</td>
                    <td className="p-4">{formatRupiah(item.balance ?? 0)}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        {item.status ?? "Belum"}
                      </span>
                    </td>
                    <td className="p-4">
                      {item.sertifikat?.pdf ? (
                        <a
                          href={item.sertifikat.pdf}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline text-xs"
                        >
                          Lihat Sertifikat
                        </a>
                      ) : (
                        <span className="text-xs text-gray-400 italic">Belum tersedia</span>
                      )}
                    </td>
                    <td className="p-4">
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
                            <AlertDialogTitle>
                              Yakin ingin menghapus peserta?
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Peserta akan diputus dari event ini secara permanen.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              className="bg-red-600 hover:bg-red-700 text-white"
                              onClick={() => handleDeletePeserta(item.id)}
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
