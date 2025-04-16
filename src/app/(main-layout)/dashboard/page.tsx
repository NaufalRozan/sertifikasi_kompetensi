"use client";

import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Legend,
  LinearScale,
  Tooltip,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import {
  CalendarIcon,
  UsersIcon,
  HandshakeIcon,
  AwardIcon,
} from "lucide-react";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar"; // tetap pakai ini kalau kamu sudah add via shadcn

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

export default function DashboardPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date(2025, 5, 16)
  );

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center ">
      {/* Header Merah */}
      <div className="w-full bg-red-700 h-[200px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-6xl font-semibold ">
          Dashboard
        </div>
      </div>

      {/* Konten Utama */}
      <div className="w-full max-w-7xl  -mt-24 z-10 relative pb-16 pt-6">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-white px-6 pt-6 pb-2 rounded-2xl shadow">
          <InfoCard
            icon={<AwardIcon className="w-8 h-8 text-yellow-500" />}
            title="Jumlah Sertifikasi"
            value="10"
          />
          <InfoCard
            icon={<UsersIcon className="w-8 h-8 text-blue-500" />}
            title="Jumlah Peserta"
            value="25"
          />
          <InfoCard
            icon={<HandshakeIcon className="w-8 h-8 text-green-600" />}
            title="Jumlah Transaksi"
            value="Rp 225.000.000"
          />
        </div>

        {/* Middle Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Chart Sertifikasi */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-gray-700 font-semibold mb-4">
              Jumlah Sertifikasi yang Diterbitkan per Bulan
            </h2>
            <Bar
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "Mei"],
                datasets: [
                  {
                    label: "Sertifikasi",
                    data: [5, 7, 10, 9, 12],
                    backgroundColor: "rgba(220, 38, 38, 0.6)",
                  },
                ],
              }}
              options={{
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>

          {/* Total Saldo */}
          <div className="bg-white rounded-2xl p-6 shadow flex items-center justify-center flex-col">
            <p className="text-gray-400 text-lg">TOTAL SALDO :</p>
            <p className="text-4xl font-bold text-gray-800 mt-2">Rp 25.000.000</p>
          </div>
        </div>

        {/* Calendar + Pemasukan Pengeluaran */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          {/* Calendar */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-gray-700 font-semibold mb-4 flex items-center gap-2">
              <CalendarIcon className="w-5 h-5" />
              Jadwal Rapat
            </h2>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              className="rounded-md border"
            />
            <div className="mt-4 text-sm text-red-500 font-semibold">• Jadwal Rapat</div>
          </div>

          {/* Chart Pemasukan & Pengeluaran */}
          <div className="bg-white rounded-2xl p-6 shadow">
            <h2 className="text-gray-700 font-semibold mb-4">
              Pemasukan dan Pengeluaran per Bulan
            </h2>
            <Bar
              data={{
                labels: ["Jan", "Feb", "Mar", "Apr", "Mei"],
                datasets: [
                  {
                    label: "Pemasukan",
                    data: [500, 900, 300, 1500, 1000],
                    backgroundColor: "rgba(59, 130, 246, 0.6)",
                  },
                  {
                    label: "Pengeluaran",
                    data: [700, 850, 250, 1400, 700],
                    backgroundColor: "rgba(220, 38, 38, 0.6)",
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({
  icon,
  title,
  value,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow">
      {icon}
      <div>
        <p className="text-gray-600 text-sm">{title}</p>
        <p className="text-xl font-bold text-gray-800">{value}</p>
      </div>
    </div>
  );
}
