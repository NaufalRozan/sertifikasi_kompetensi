"use client";

import { useState } from "react";
import { User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export default function ManajemenPesertaPage() {
  const [selectedSertifikasi, setSelectedSertifikasi] = useState("Semua");

  const data = [
    {
      nim: "20220140177",
      nama: "Rudi Saputra",
      email: "rudi@gmail.com",
      whatsapp: "081338283838",
      sertifikasi: "K3 Mekanik",
      status: "Lulus",
      pdf: true,
      notifikasi: "Terkirim",
    },
    {
      nim: "20220140011",
      nama: "Bayu Pratama",
      email: "bayu@gmail.com",
      whatsapp: "081338283838",
      sertifikasi: "K3 Mekanik",
      status: "-",
      pdf: false,
      notifikasi: "Belum",
    },
    {
      nim: "20220140122",
      nama: "Siti Rahayu",
      email: "siti@gmail.com",
      whatsapp: "081338283838",
      sertifikasi: "K3 Umum",
      status: "Selesai",
      pdf: true,
      notifikasi: "Terkirim",
    },
    {
      nim: "20220140133",
      nama: "Dimas Prasetyo",
      email: "dimas@gmail.com",
      whatsapp: "081338283838",
      sertifikasi: "K3 Engineering",
      status: "Selesai",
      pdf: true,
      notifikasi: "Terkirim",
    },
    {
      nim: "20220140144",
      nama: "Fajar Maulana",
      email: "fajar@gmail.com",
      whatsapp: "081338283838",
      sertifikasi: "NDT Level II",
      status: "Selesai",
      pdf: true,
      notifikasi: "Terkirim",
    },
    {
      nim: "20220140155",
      nama: "Nita Kurniawan",
      email: "nita@gmail.com",
      whatsapp: "081338283838",
      sertifikasi: "Welding Inspector (CWI)",
      status: "-",
      pdf: false,
      notifikasi: "Belum",
    },
  ];

  const sertifikasiOptions = [
    "Semua",
    "K3 Umum",
    "K3 Mekanik",
    "K3 Engineering",
    "NDT Level II",
    "Welding Inspector (CWI)",
  ];

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

  const filteredData =
    selectedSertifikasi === "Semua"
      ? data
      : data.filter((item) => item.sertifikasi === selectedSertifikasi);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header Merah */}
      <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
          <User className="w-5 h-5" />
          Manajemen Peserta
        </div>
      </div>

      {/* Konten */}
      <div className="w-full max-w-7xl -mt-24 z-10 relative px-4 pb-10">
        {/* Filter & Total */}
        <div className="flex justify-between items-center mb-4">
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
            Jumlah Peserta: <span className="font-bold">{filteredData.length}</span>
          </div>
        </div>

        {/* Tabel */}
        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-red-700 font-semibold border-b">
              <tr>
                <th className="p-4">NIM</th>
                <th className="p-4">Nama</th>
                <th className="p-4">Email</th>
                <th className="p-4">Whatsapp</th>
                <th className="p-4">Sertifikasi Terdaftar</th>
                <th className="p-4">Status</th>
                <th className="p-4">PDF Sertifikat</th>
                <th className="p-4">Notifikasi</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-4">{item.nim}</td>
                  <td className="p-4">{item.nama}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">{item.whatsapp}</td>
                  <td className="p-4">{item.sertifikasi}</td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(
                        item.status
                      )}`}
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
                      className={`px-3 py-1 text-xs font-medium rounded-full ${getBadgeStyle(
                        item.notifikasi
                      )}`}
                    >
                      {item.notifikasi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

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
