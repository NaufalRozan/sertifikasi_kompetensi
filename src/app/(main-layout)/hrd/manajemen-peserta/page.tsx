"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // kalau belum pakai sonner, boleh diganti alert biasa
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { BASE_URL } from "@/constant/BaseURL"; // pastikan ini ada di project kamu

export default function ManajemenPesertaPage() {
  const [selectedSertifikasi, setSelectedSertifikasi] = useState("Semua");
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  const sertifikasiOptions = [
    "Semua",
    "K3 Umum",
    "K3 Mekanik",
    "K3 Engineering",
    "NDT Level II",
    "Welding Inspector (CWI)",
  ];

  useEffect(() => {
    const fetchPeserta = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/peserta/`, {
          withCredentials: true,
        });
        setData(res.data.data || []);
      } catch (error) {
        console.error(error);
        toast.error("Gagal memuat data peserta.");
      } finally {
        setLoading(false);
      }
    };

    fetchPeserta();
  }, []);

  const getBadgeStyle = (value: string) => {
    switch (value) {
      case "Lulus":
      case "Selesai":
      case "Terkirim":
        return "bg-green-100 text-green-700";
      case "Belum":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  const formatRupiah = (amount: number) =>
    new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(amount);

  const filteredData =
    selectedSertifikasi === "Semua"
      ? data
      : data.filter((item) => item.sertifikasi === selectedSertifikasi);

  const searchedData = filteredData.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header Merah */}
      <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
          <User className="w-5 h-5" />
          Manajemen Peserta
        </div>
      </div>

      {/* Konten */}
      <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
        {/* Filter dan Tambah */}
        <div className="flex flex-col gap-4 mb-4">
          {/* Baris Atas: Filter & Jumlah */}
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-white">
              <Label htmlFor="sertifikasi" className="text-white">
                Nama Sertifikasi:
              </Label>
              <Select
                value={selectedSertifikasi}
                onValueChange={setSelectedSertifikasi}
              >
                <SelectTrigger className="w-[250px] bg-white text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {sertifikasiOptions.map((option) => (
                    <SelectItem key={option} value={option}>
                      {option}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="text-sm font-semibold text-white">
              Jumlah Peserta: <span className="font-bold">{searchedData.length}</span>
            </div>
          </div>

          {/* Baris Bawah: Search */}
          <Input
            type="text"
            placeholder="Cari peserta..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          {loading ? (
            <p className="text-center py-8 text-gray-500">Memuat data peserta...</p>
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
                  <th className="p-4">Notifikasi</th>
                </tr>
              </thead>
              <tbody>
                {searchedData.map((item, idx) => (
                  <tr key={idx} className="border-b hover:bg-gray-50">
                    <td className="p-4">{item.nim}</td>
                    <td className="p-4">{item.nama}</td>
                    <td className="p-4">{item.email}</td>
                    <td className="p-4">{item.whatsapp}</td>
                    <td className="p-4">{item.sertifikasi}</td>
                    <td className="p-4">{formatRupiah(item.saldo)}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(item.status)}`}
                      >
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4">
                      {item.pdf ? (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">
                          PDF
                        </span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(item.notifikasi)}`}
                      >
                        {item.notifikasi}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 py-4">
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">
              &lt;
            </Button>
            <Button size="sm" className="bg-red-700 text-white text-xs">01</Button>
            <Button variant="link" size="sm">02</Button>
            <Button variant="link" size="sm">03</Button>
            <span className="text-sm text-gray-500">...</span>
            <Button variant="ghost" size="sm" className="text-gray-500 hover:text-red-700">
              &gt;
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
