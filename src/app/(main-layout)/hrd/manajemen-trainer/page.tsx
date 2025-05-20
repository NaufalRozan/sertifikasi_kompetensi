"use client";

import { useState } from "react";
import { UserCheck } from "lucide-react";
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

export default function ManajemenTrainerPage() {
  const [selectedSertifikasi, setSelectedSertifikasi] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const data = [
    {
      nip: "TR001",
      nama: "Andi Gunawan",
      email: "andi.trainer@gmail.com",
      whatsapp: "081234567890",
      sertifikasi: "K3 Mekanik",
      status: "Aktif",
      notifikasi: "Terkirim",
      npwp: "12.345.678.9-123.000",
      namaBank: "Bank Mandiri",
      rekening: "1234567890",
    },
    {
      nip: "TR002",
      nama: "Desi Rahmawati",
      email: "desi.rahma@gmail.com",
      whatsapp: "081234567891",
      sertifikasi: "K3 Umum",
      status: "Nonaktif",
      notifikasi: "Belum",
      npwp: "99.888.777.6-543.000",
      namaBank: "BCA",
      rekening: "0987654321",
    },
    {
      nip: "TR003",
      nama: "Budi Santoso",
      email: "budi.s@gmail.com",
      whatsapp: "081234567892",
      sertifikasi: "K3 Umum",
      status: "Aktif",
      notifikasi: "Terkirim",
      npwp: "12.111.222.3-456.000",
      namaBank: "BNI",
      rekening: "2345678910",
    },
    {
      nip: "TR004",
      nama: "Sari Andini",
      email: "sari.andini@gmail.com",
      whatsapp: "081234567893",
      sertifikasi: "NDT Level II",
      status: "Aktif",
      notifikasi: "Belum",
      npwp: "11.222.333.4-567.000",
      namaBank: "BRI",
      rekening: "3456789101",
    },
    {
      nip: "TR005",
      nama: "Rudi Hartono",
      email: "rudi.h@gmail.com",
      whatsapp: "081234567894",
      sertifikasi: "Welding Inspector (CWI)",
      status: "Nonaktif",
      notifikasi: "Terkirim",
      npwp: "21.321.654.9-321.000",
      namaBank: "CIMB Niaga",
      rekening: "4567891011",
    },
    {
      nip: "TR006",
      nama: "Dewi Lestari",
      email: "dewi.l@gmail.com",
      whatsapp: "081234567895",
      sertifikasi: "K3 Engineering",
      status: "Aktif",
      notifikasi: "Belum",
      npwp: "98.765.432.1-098.000",
      namaBank: "Bank Mandiri",
      rekening: "5678910112",
    },
    {
      nip: "TR007",
      nama: "Joko Widodo",
      email: "joko.w@gmail.com",
      whatsapp: "081234567896",
      sertifikasi: "K3 Umum",
      status: "Aktif",
      notifikasi: "Terkirim",
      npwp: "56.789.123.4-567.000",
      namaBank: "BCA",
      rekening: "6789101123",
    },
    {
      nip: "TR008",
      nama: "Lina Marlina",
      email: "lina.m@gmail.com",
      whatsapp: "081234567897",
      sertifikasi: "K3 Mekanik",
      status: "Nonaktif",
      notifikasi: "Belum",
      npwp: "87.654.321.0-876.000",
      namaBank: "BRI",
      rekening: "7891011234",
    },
    {
      nip: "TR009",
      nama: "Hendra Saputra",
      email: "hendra.s@gmail.com",
      whatsapp: "081234567898",
      sertifikasi: "K3 Engineering",
      status: "Aktif",
      notifikasi: "Terkirim",
      npwp: "65.432.109.8-765.000",
      namaBank: "BNI",
      rekening: "8910112345",
    },
    {
      nip: "TR010",
      nama: "Putri Amelia",
      email: "putri.a@gmail.com",
      whatsapp: "081234567899",
      sertifikasi: "NDT Level II",
      status: "Nonaktif",
      notifikasi: "Belum",
      npwp: "76.543.210.9-876.000",
      namaBank: "Bank Mandiri",
      rekening: "9101123456",
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

  const filteredData =
    selectedSertifikasi === "Semua"
      ? data
      : data.filter((item) => item.sertifikasi === selectedSertifikasi);

  const searchedData = filteredData.filter(
    (item) =>
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPages = Math.ceil(searchedData.length / itemsPerPage);
  const paginatedData = searchedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
          <UserCheck className="w-5 h-5" />
          Manajemen Trainer
        </div>
      </div>

      <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-white">
              <Label htmlFor="sertifikasi" className="text-white">
                Sertifikasi:
              </Label>
              <Select
                value={selectedSertifikasi}
                onValueChange={(value) => {
                  setSelectedSertifikasi(value);
                  setCurrentPage(1);
                }}
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
              Jumlah Trainer: <span className="font-bold">{searchedData.length}</span>
            </div>
          </div>

          <Input
            type="text"
            placeholder="Cari trainer..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
          />
        </div>

        <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="text-red-700 font-semibold border-b">
              <tr>
                <th className="p-4">NIP</th>
                <th className="p-4">Nama</th>
                <th className="p-4">Email</th>
                <th className="p-4">Whatsapp</th>
                <th className="p-4">Sertifikasi</th>
                <th className="p-4">NPWP</th>
                <th className="p-4">Nama Bank</th>
                <th className="p-4">No. Rekening</th>
                <th className="p-4">Status</th>
                <th className="p-4">Notifikasi</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((item, idx) => (
                <tr key={idx} className="border-b hover:bg-gray-50">
                  <td className="p-4">{item.nip}</td>
                  <td className="p-4">{item.nama}</td>
                  <td className="p-4">{item.email}</td>
                  <td className="p-4">{item.whatsapp}</td>
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

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2 py-4">
            <Button variant="ghost" size="sm" onClick={() => handlePageChange(currentPage - 1)}>&lt;</Button>
            {Array.from({ length: totalPages }, (_, i) => (
              <Button
                key={i}
                size="sm"
                variant={currentPage === i + 1 ? "default" : "link"}
                className={currentPage === i + 1 ? "bg-red-700 text-white text-xs" : ""}
                onClick={() => handlePageChange(i + 1)}
              >
                {String(i + 1).padStart(2, "0")}
              </Button>
            ))}
            <Button variant="ghost" size="sm" onClick={() => handlePageChange(currentPage + 1)}>&gt;</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
