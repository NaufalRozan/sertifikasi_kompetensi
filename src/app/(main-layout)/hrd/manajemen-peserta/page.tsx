"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner"; // kalau belum pakai sonner, boleh diganti alert biasa
import { User, UserPlus } from "lucide-react";
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
import { useRouter } from "next/navigation";
import * as XLSX from "xlsx";
import { useRef } from "react";


export default function ManajemenPesertaPage() {
  const [selectedSertifikasi, setSelectedSertifikasi] = useState("Semua");
  const [data, setData] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);


  const sertifikasiOptions = [
    "Semua",
    "K3 Umum",
    "K3 Mekanik",
    "K3 Engineering",
    "NDT Level II",
    "Welding Inspector (CWI)",
  ];

  const fetchPeserta = async () => {
    setLoading(true);
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

  useEffect(() => {
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

  const searchedData = filteredData.filter((item) => {
    const nama = item.nama?.toLowerCase() || "";
    const email = item.email?.toLowerCase() || "";
    const query = searchQuery.toLowerCase();

    return nama.includes(query) || email.includes(query);
  });

  const handleDownloadTemplate = () => {
    const a = document.createElement("a");
    a.href = "/templates/sertifikasi_peserta.xlsx";
    a.download = "sertifikasi_peserta.xlsx";
    a.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const data = await file.arrayBuffer();
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet, { defval: "" });

      const payload = json.map((row: any, idx: number) => {
        if (!row.name || !row.email) {
          throw new Error(`Baris ${idx + 2} – "name" dan "email" wajib diisi`);
        }

        return {
          name: row.name,
          email: row.email,
          phone: row.phone,
          nim: row.nim,
        };
      });

      await axios.post(`${BASE_URL}/peserta/many`, payload, {
        withCredentials: true,
      });

      toast.success(`${payload.length} peserta berhasil diimpor`);
      await fetchPeserta(); // ⬅ Refresh data peserta langsung di UI
    } catch (err: any) {
      toast.error(err.message || "Gagal mengimpor file.");
    } finally {
      e.target.value = "";
    }
  };





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



            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-white">
              <span>
                Jumlah Peserta: <span className="font-bold">{searchedData.length}</span>
              </span>

              {/* Tombol Import dan Download */}
              <div className="flex items-center space-x-2 mt-1 sm:mt-0">
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Import Peserta
                </Button>

                <Button
                  onClick={handleDownloadTemplate}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  Download Template
                </Button>
              </div>

              {/* Input file tersembunyi */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileChange}
                className="hidden"
              />
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
                    <td className="p-4">{item.nim ?? "-"}</td>
                    <td className="p-4">{item.name ?? "-"}</td>
                    <td className="p-4">{item.email ?? "-"}</td>
                    <td className="p-4">{item.phone ?? "-"}</td>
                    <td className="p-4">{item.sertifikasiTerdaftar ?? "-"}</td>
                    <td className="p-4">{formatRupiah(item.balance)}</td>
                    <td className="p-4">
                      <span
                        className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(item.status ?? "Belum")}`}
                      >
                        {item.status ?? "Belum"}
                      </span>
                    </td>
                    <td className="p-4">
                      {item.sertifikat ? (
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-xs font-semibold">PDF</span>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-4">
                      <span className="px-3 py-1 text-xs text-gray-400 font-medium">-</span>
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
