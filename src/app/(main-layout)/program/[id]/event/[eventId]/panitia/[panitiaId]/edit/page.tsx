"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { PlusCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { BASE_URL } from "@/constant/BaseURL";

export default function EditPanitiaPage() {
  const { id: programId, eventId, panitiaId } = useParams();
  const router = useRouter();

  const [employees, setEmployees] = useState<any[]>([]);
  const [picId, setPicId] = useState<string>("");
  const [selectedStaffIds, setSelectedStaffIds] = useState<Set<string>>(new Set());
  const [eventPanitia, setEventPanitia] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [empRes, panitiaRes] = await Promise.all([
          axios.get(`${BASE_URL}/employees/`, { withCredentials: true }),
          axios.get(`${BASE_URL}/panitia/`, { withCredentials: true }),
        ]);

        const employeesData = empRes.data.data;
        const panitia = panitiaRes.data.data.find((p: any) => p.id === panitiaId);

        if (!panitia) {
          toast.error("Data panitia tidak ditemukan");
          return;
        }

        setEmployees(employeesData);
        setEventPanitia(panitia);
        setPicId(panitia.PIC?.id || "");
        setSelectedStaffIds(new Set(panitia.staff?.map((s: any) => s.id) || []));
      } catch (err) {
        toast.error("Gagal memuat data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [panitiaId]);

  const handleCheckboxChange = (id: string) => {
    setSelectedStaffIds((prev) => {
      const newSet = new Set(prev);
      newSet.has(id) ? newSet.delete(id) : newSet.add(id);
      return newSet;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!picId) return toast.error("PIC wajib dipilih");
    if (selectedStaffIds.size === 0) return toast.error("Pilih minimal satu staff");

    const payload = {
      eventId: eventPanitia.eventId, // ✅ WAJIB
      picId,
      staffId: Array.from(selectedStaffIds),
    };

    toast.promise(
      axios.put(`${BASE_URL}/panitia/${panitiaId}`, payload, {
        withCredentials: true,
      }),
      {
        loading: "Menyimpan perubahan...",
        success: () => {
          setTimeout(() => {
            router.push(`/program/${programId}/event/${eventId}/panitia`);
          }, 500);
          return "Panitia berhasil diperbarui";
        },
        error: (err) => {
          console.error(err.response?.data); // ✅ Bantu debug kalau masih error
          const msg = err?.response?.data?.message || err.message;
          return `Gagal update panitia: ${msg}`;
        },
      }
    );
  };



  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex items-center gap-2 text-xl font-semibold">
          <PlusCircle className="w-5 h-5" />
          Edit Panitia
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Edit Data Panitia</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4 text-sm">
              {loading ? (
                <p className="text-center text-gray-500">Memuat data...</p>
              ) : (
                <>
                  {/* PIC */}
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

                  {/* Staff */}
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
                    <Button type="submit">Simpan Perubahan</Button>
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
