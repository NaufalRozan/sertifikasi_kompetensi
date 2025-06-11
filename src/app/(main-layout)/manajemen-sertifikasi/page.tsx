"use client";

import { useState, useEffect } from "react";
import { Pencil, Trash2, Book } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
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

interface RawSertifikasi {
  id: string;
  code: string;
  name: string;
  tersertifikasi?: number;
  terdaftar?: number;
}

export default function SertifikasiPage() {
  const router = useRouter();
  const [data, setData] = useState<
    { id: string; no: number; kode: string; nama: string; tersertifikasi: number; terdaftar: number }[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [selectedSertifikasi, setSelectedSertifikasi] = useState("Semua");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // fetch data saat mount
  useEffect(() => {
    axios
      .get<RawSertifikasi[]>(`${BASE_URL}/sertifikasi/`, { withCredentials: true })
      .then((res) => {
        const fetched: RawSertifikasi[] = Array.isArray(res.data)
          ? res.data
          : Array.isArray((res.data as any).data)
          ? (res.data as any).data
          : [];
        const mapped = fetched.map((item, idx) => ({
          id: item.id,
          no: idx + 1,
          kode: item.code,
          nama: item.name,
          tersertifikasi: item.tersertifikasi ?? 0,
          terdaftar: item.terdaftar ?? 0,
        }));
        setData(mapped);
      })
      .catch((err) => {
        console.error("Error fetch sertifikasi:", err);
        setError("Gagal memuat data sertifikasi.");
      })
      .finally(() => setLoading(false));
  }, []);

  const uniqueNama = Array.from(new Set(data.map((item) => item.nama)));

  // filter + search
  const filteredData = data.filter((item) => {
    const byNama =
      selectedSertifikasi === "Semua" || item.nama === selectedSertifikasi;
    const bySearch =
      item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.kode.toLowerCase().includes(searchQuery.toLowerCase());
    return byNama && bySearch;
  });

  // pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  // delete helper
  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`${BASE_URL}/sertifikasi/${id}`, {
        withCredentials: true,
      });
      setData((prev) => prev.filter((v) => v.id !== id));
      toast.success("Sertifikasi berhasil dihapus!");
    } catch (err) {
      console.error(err);
      toast.error("Gagal menghapus sertifikasi.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
          <Book className="w-5 h-5" />
          Manajemen Sertifikasi
        </div>
      </div>

      {/* Konten */}
      <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
        {/* Filter + Tambah */}
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div className="flex items-center gap-2 text-sm text-white">
              <Label className="text-white whitespace-nowrap">
                Nama Sertifikasi:
              </Label>
              <Select
                value={selectedSertifikasi}
                onValueChange={(v) => {
                  setSelectedSertifikasi(v);
                  setCurrentPage(1);
                }}
              >
                <SelectTrigger className="w-[250px] bg-white text-black">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Semua">Semua</SelectItem>
                  {uniqueNama.map((nama) => (
                    <SelectItem key={nama} value={nama}>
                      {nama}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <Button
              onClick={() => router.push("/manajemen-sertifikasi/add")}
              className="bg-blue-600 hover:bg-blue-700 text-white whitespace-nowrap"
            >
              + Tambah Sertifikasi
            </Button>
          </div>
          <Input
            type="text"
            placeholder="Cari sertifikasi..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full h-10 px-4 text-sm text-gray-700 placeholder:text-gray-400 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-700 focus:border-transparent shadow-sm"
          />
        </div>

        {/* Tabel / placeholder */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {loading ? (
            <div className="p-4 text-center text-gray-500">
              Memuat data sertifikasi...
            </div>
          ) : error ? (
            <div className="p-4 text-center text-red-500">{error}</div>
          ) : data.length === 0 ? (
            <div className="p-10 text-center text-gray-500 italic">
              Belum ada sertifikasi yang ditambahkan.
            </div>
          ) : (
            <>
              <table className="w-full text-sm text-left">
                <thead className="text-red-700 font-semibold border-b">
                  <tr>
                    <th className="p-4">No</th>
                    <th className="p-4">Kode</th>
                    <th className="p-4">Nama</th>
                    <th className="p-4">Tersertifikasi</th>
                    <th className="p-4">Terdaftar</th>
                    <th className="p-4">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item) => (
                    <tr key={item.no} className="border-b hover:bg-gray-50">
                      <td className="p-4">{item.no}</td>
                      <td className="p-4">{item.kode}</td>
                      <td className="p-4">{item.nama}</td>
                      <td className="p-4">{item.tersertifikasi}</td>
                      <td className="p-4">{item.terdaftar}</td>
                      <td className="p-4 flex items-center gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="bg-yellow-100 hover:bg-yellow-200 text-yellow-600"
                          onClick={() =>
                            router.push(
                              `/manajemen-sertifikasi/edit/${item.id}`
                            )
                          }
                        >
                          <Pencil size={16} />
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="bg-red-100 hover:bg-red-200 text-red-600"
                              onClick={(e) => e.stopPropagation()}
                            >
                              <Trash2 size={16} />
                            </Button>
                          </AlertDialogTrigger>

                          <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Yakin ingin menghapus sertifikasi?
                              </AlertDialogTitle>
                              <AlertDialogDescription>
                                Tindakan ini tidak dapat dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                className="bg-red-600 hover:bg-red-700 text-white"
                                onClick={() => handleDelete(item.id)}
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

              {/* Pagination */}
              <div className="flex justify-center items-center gap-2 py-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &lt;
                </Button>
                {Array.from({ length: totalPages }, (_, i) => (
                  <Button
                    key={i}
                    size="sm"
                    variant={currentPage === i + 1 ? "default" : "link"}
                    className={
                      currentPage === i + 1
                        ? "bg-red-700 text-white text-xs"
                        : ""
                    }
                    onClick={() => handlePageChange(i + 1)}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </Button>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &gt;
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
``