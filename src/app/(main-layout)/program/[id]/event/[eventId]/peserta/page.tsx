"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { UserPlus, User } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { Button } from "@/components/ui/button";
import { BASE_URL } from "@/constant/BaseURL";

export default function PesertaEventPage() {
  const { id: programId, eventId } = useParams();
  const router = useRouter();
  const [pesertaData, setPesertaData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPeserta = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/peserta`, {
          withCredentials: true,
        });
        setPesertaData(res.data.data || []);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat peserta event.");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchPeserta();
    }
  }, [eventId]);

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header Merah */}
      <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
          <User className="w-5 h-5" />
          Peserta Event
        </div>
      </div>

      {/* Konten */}
      <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10 space-y-6">
        {/* Tombol Tambah Peserta */}
        <div className="flex justify-end">
          <Button
            onClick={() => router.push(`/program/${programId}/event/${eventId}/peserta/add`)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <UserPlus className="w-4 h-4 mr-2" />
            Tambah Peserta
          </Button>
        </div>

        {/* Tabel Peserta */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <p className="text-center py-8 text-gray-500">Memuat data peserta...</p>
          ) : error ? (
            <p className="text-center py-8 text-red-500">{error}</p>
          ) : pesertaData.length === 0 ? (
            <p className="text-center py-8 text-gray-500 italic">Belum ada peserta pada event ini.</p>
          ) : (
            <table className="w-full text-sm text-left">
              <thead className="text-red-700 font-semibold border-b">
                <tr>
                  <th className="p-4">No</th>
                  <th className="p-4">Nama</th>
                  <th className="p-4">Email</th>
                  <th className="p-4">Whatsapp</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Saldo</th>
                </tr>
              </thead>
              <tbody>
                {pesertaData.map((item, idx) => (
                  <tr key={item.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">{idx + 1}</td>
                    <td className="p-4">{item.name ?? "-"}</td>
                    <td className="p-4">{item.email ?? "-"}</td>
                    <td className="p-4">{item.phone ?? "-"}</td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-xs font-medium rounded-full bg-gray-100 text-gray-700">
                        {item.status ?? "Belum"}
                      </span>
                    </td>
                    <td className="p-4">{formatRupiah(item.balance ?? 0)}</td>
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
