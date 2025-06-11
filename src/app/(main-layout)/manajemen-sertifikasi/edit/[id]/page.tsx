"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Pencil } from "lucide-react";
import { toast } from "sonner";
import axios from "axios";

import { BASE_URL } from "@/constant/BaseURL";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

// Schema validasi
const sertifikasiSchema = z.object({
  code: z.string().min(1, "Kode sertifikasi harus diisi"),
  name: z.string().min(1, "Nama sertifikasi harus diisi"),
});
type SertifikasiForm = z.infer<typeof sertifikasiSchema>;

export default function EditSertifikasiPage() {
  const router = useRouter();
  const { id: sertifikasiId } = useParams();
  const [loading, setLoading] = useState(true);

  const form = useForm<SertifikasiForm>({
    resolver: zodResolver(sertifikasiSchema),
    defaultValues: { code: "", name: "" },
  });

  // Fetch data sertifikasi
  useEffect(() => {
    if (!sertifikasiId) return;
    const fetchSertifikasi = async () => {
      try {
        const res = await axios.get(
          `${BASE_URL}/sertifikasi/${sertifikasiId}`,
          { withCredentials: true }
        );
        const data = res.data.data ?? res.data;
        form.reset({
          code: data.code ?? "",
          name: data.name ?? "",
        });
      } catch (err) {
        toast.error("Gagal memuat data sertifikasi.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchSertifikasi();
  }, [sertifikasiId, form]);

  // Submit perubahan
  const onSubmit = async (values: SertifikasiForm) => {
    try {
      await toast.promise(
        axios.put(
          `${BASE_URL}/sertifikasi/${sertifikasiId}`,
          values,
          { withCredentials: true }
        ),
        {
          loading: "Menyimpan perubahan...",
          success: () => {
            router.push("/manajemen-sertifikasi");
            return "Sertifikasi berhasil diperbarui!";
          },
          error: (err) => {
            const msg = err?.response?.data?.message || "Terjadi kesalahan.";
            return `Gagal menyimpan: ${msg}`;
          },
        }
      );
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
          <Pencil className="w-5 h-5" />
          Edit Sertifikasi
        </div>
      </div>

      {/* Form Card */}
      <div className="w-full max-w-xl -mt-52 z-10 relative mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Form Edit Sertifikasi</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <p className="text-gray-500 text-center">Memuat data sertifikasi...</p>
            ) : (
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Kode Sertifikasi */}
                <div className="space-y-1">
                  <Label>Kode Sertifikasi</Label>
                  <Input {...form.register("code")} />
                  {form.formState.errors.code && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.code.message}
                    </p>
                  )}
                </div>

                {/* Nama Sertifikasi */}
                <div className="space-y-1">
                  <Label>Nama Sertifikasi</Label>
                  <Input {...form.register("name")} />
                  {form.formState.errors.name && (
                    <p className="text-sm text-red-500">
                      {form.formState.errors.name.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-4">
                  <Button type="submit">Simpan Perubahan</Button>
                </div>
              </form>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
