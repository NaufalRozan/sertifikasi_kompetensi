"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { PlusCircle } from "lucide-react";
import axios from "axios";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BASE_URL } from "@/constant/BaseURL";

export default function AddPanitiaPage() {
  const { eventId } = useParams();
  const router = useRouter();

  const [employees, setEmployees] = useState<any[]>([]);
  const [selectedStaffIds, setSelectedStaffIds] = useState<Set<string>>(new Set());
  const [picId, setPicId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`${BASE_URL}/employees/`, { withCredentials: true })
      .then((res) => setEmployees(res.data.data || []))
      .catch(() => toast.error("Gagal memuat data pegawai"))
      .finally(() => setLoading(false));
  }, []);

  const handleCheckboxChange = (id: string) => {
    setSelectedStaffIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!picId) return toast.error("Penanggung jawab (PIC) harus dipilih");
    if (selectedStaffIds.size === 0) return toast.error("Pilih minimal satu staff");

    const payload = {
      eventId: String(eventId), // dari useParams, tidak perlu input
      picId,
      staffId: Array.from(selectedStaffIds),
    };

    toast.promise(
      axios.post(`${BASE_URL}/panitia/`, payload, { withCredentials: true }),
      {
        loading: "Menyimpan data panitia...",
        success: () => {
          setTimeout(() => router.push(`/program/${eventId}/event/${eventId}/panitia`), 500);
          return "Panitia berhasil ditambahkan.";
        },
        error: (err) => {
          const msg = err?.response?.data?.message || err.message;
          return `Gagal menyimpan panitia: ${msg}`;
        },
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
          <PlusCircle className="w-5 h-5" />
          Tambah Panitia
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Tambah Panitia</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {loading ? (
                <p className="text-gray-500 text-center">Memuat data pegawai...</p>
              ) : (
                <>
                  {/* 🔹 PIC */}
                  <div>
                    <label className="block mb-1 font-medium">Penanggung Jawab (PIC)</label>
                    <select
                      value={picId}
                      onChange={(e) => setPicId(e.target.value)}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value="">-- Pilih PIC --</option>
                      {employees.map((emp) => (
                        <option key={emp.id} value={emp.id}>
                          {emp.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 🔹 Staff */}
                  <div>
                    <label className="block mb-2 font-medium">Pilih Staff</label>
                    <div className="space-y-3 max-h-[400px] overflow-y-auto border p-3 rounded-md">
                      {employees.map((staff) => (
                        <div key={staff.id} className="flex items-center justify-between border-b py-2">
                          <div>
                            <p className="text-sm font-medium">{staff.name ?? "Tanpa Nama"}</p>
                            <p className="text-xs text-gray-500">{staff.email}</p>
                          </div>
                          <Checkbox
                            checked={selectedStaffIds.has(staff.id)}
                            onCheckedChange={() => handleCheckboxChange(staff.id)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="flex justify-end pt-4">
                    <Button type="submit">Simpan Panitia</Button>
                  </div>
                </>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
