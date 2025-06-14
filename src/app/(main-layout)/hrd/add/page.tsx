"use client";

import { useState, useEffect } from "react";
import { PlusCircle } from "lucide-react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { BASE_URL } from "@/constant/BaseURL";

// 1️⃣ Schema Zod: status & notifikasi sekarang enum
const formSchema = z.object({
  name: z.string().min(1, "Nama harus diisi"),
  email: z.string().email("Email tidak valid"),
  NIP: z.string().min(1, "NIP harus diisi"),
  sertifikasiId: z.string().min(1, "Sertifikat harus dipilih"),
  phone: z.string().min(1, "Nomor HP harus diisi"),
  NPWP: z.string().optional(),
  namaBank: z.string().optional(),
  noRek: z.string().optional(),
  status: z.enum(["Aktif", "Tidak Aktif"], {
    required_error: "Status harus diisi",
  }),
  notifikasi: z.enum(["Terkirim", "Belum"], {
    required_error: "Notifikasi harus dipilih",
  }),
  jabatan: z.string().min(1, "Jabatan harus diisi"),
  unit: z.string().min(1, "Unit harus diisi"),
  role: z.enum(["Staff", "Trainer", "PJ", "Assessor"]),
});

type FormValues = z.infer<typeof formSchema>;

type Sertifikasi = {
  id: string;
  name: string;
  code: string;
  Employee: any[];
};

export default function AddPengurusPage() {
  const router = useRouter();

  // state untuk daftar sertifikasi
  const [sertifikats, setSertifikats] = useState<Sertifikasi[]>([]);
  const [loadingSert, setLoadingSert] = useState(true);

  // 2️⃣ Setup React-Hook-Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      NIP: "",
      sertifikasiId: "",
      phone: "",
      NPWP: "",
      namaBank: "",
      noRek: "",
      status: "Aktif",         // default = Aktif
      notifikasi: "Belum",     // default = Belum
      jabatan: "",
      unit: "",
      role: "Trainer",
    },
  });

  // 3️⃣ Fetch sertifikasi
  useEffect(() => {
    axios
      .get<{ data: Sertifikasi[] }>(`${BASE_URL}/sertifikasi/`, {
        withCredentials: true,
      })
      .then((res) => setSertifikats(res.data.data))
      .catch(() => toast.error("Gagal memuat daftar sertifikasi"))
      .finally(() => setLoadingSert(false));
  }, []);

  // 4️⃣ Submit handler
  function onSubmit(values: FormValues) {
    toast.promise(
      axios.post(`${BASE_URL}/employees/`, values, {
        withCredentials: true,
      }),
      {
        loading: "Menyimpan data...",
        success: () => {
          setTimeout(() => router.push("/hrd"), 300);
          return "Berhasil menyimpan pengurus";
        },
        error: (e) => {
          const msg = e?.response?.data?.message || e.message;
          return `Gagal menyimpan data: ${msg}`;
        },
      }
    );
  }

  // 5️⃣ Field config (tanpa status, notifikasi, sertifikasi, role)
  const fields: Array<{
    label: string;
    name: Exclude<keyof FormValues, "status" | "notifikasi" | "sertifikasiId" | "role">;
    type?: string;
  }> = [
    { label: "Nama", name: "name" },
    { label: "Email", name: "email", type: "email" },
    { label: "NIP", name: "NIP" },
    { label: "No. HP", name: "phone" },
    { label: "NPWP", name: "NPWP" },
    { label: "Nama Bank", name: "namaBank" },
    { label: "No. Rekening", name: "noRek" },
    { label: "Jabatan", name: "jabatan" },
    { label: "Unit", name: "unit" },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex items-center gap-2 text-xl font-semibold">
          <PlusCircle className="w-5 h-5" />
          Tambah Pengurus
        </div>
      </div>

      {/* Form */}
      <div className="w-full max-w-xl bg-white -mt-52 z-10 p-6 rounded-2xl shadow-lg">
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-sm"
        >
          {/* 🔹 Inputs text dari fields config */}
          {fields.map(({ label, name, type = "text" }) => (
            <div key={name}>
              <label className="block mb-1 font-medium">{label}</label>
              <input
                type={type}
                {...form.register(name)}
                className="w-full border border-gray-300 rounded px-3 py-2"
              />
              {form.formState.errors[name] && (
                <p className="mt-1 text-xs text-red-500">
                  {form.formState.errors[name]?.message}
                </p>
              )}
            </div>
          ))}

          {/* 🔹 Select Sertifikasi */}
          <div>
            <label className="block mb-1 font-medium">Sertifikat</label>
            {loadingSert ? (
              <p>Memuat sertifikat…</p>
            ) : (
              <select
                {...form.register("sertifikasiId")}
                className="w-full border border-gray-300 rounded px-3 py-2"
              >
                <option value="">-- Pilih Sertifikat --</option>
                {sertifikats.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            )}
            {form.formState.errors.sertifikasiId && (
              <p className="mt-1 text-xs text-red-500">
                {form.formState.errors.sertifikasiId?.message}
              </p>
            )}
          </div>

          {/* 🔹 Select Status */}
          <div>
            <label className="block mb-1 font-medium">Status</label>
            <select
              {...form.register("status")}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Aktif">Aktif</option>
              <option value="Tidak Aktif">Tidak Aktif</option>
            </select>
            {form.formState.errors.status && (
              <p className="mt-1 text-xs text-red-500">
                {form.formState.errors.status?.message}
              </p>
            )}
          </div>

          {/* 🔹 Select Notifikasi */}
          <div>
            <label className="block mb-1 font-medium">Notifikasi</label>
            <select
              {...form.register("notifikasi")}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Terkirim">Terkirim</option>
              <option value="Belum">Belum</option>
            </select>
            {form.formState.errors.notifikasi && (
              <p className="mt-1 text-xs text-red-500">
                {form.formState.errors.notifikasi?.message}
              </p>
            )}
          </div>

          {/* 🔹 Select Role */}
          <div>
            <label className="block mb-1 font-medium">Role</label>
            <select
              {...form.register("role")}
              className="w-full border border-gray-300 rounded px-3 py-2"
            >
              <option value="Staff">Staff</option>
              <option value="Trainer">Trainer</option>
              <option value="PJ">Penanggung Jawab</option>
              <option value="Assessor">Assessor</option>
            </select>
            {form.formState.errors.role && (
              <p className="mt-1 text-xs text-red-500">
                {form.formState.errors.role?.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
            >
              Simpan
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
