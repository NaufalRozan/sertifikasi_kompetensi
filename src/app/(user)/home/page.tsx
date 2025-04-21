"use client";

import { useState, useEffect } from "react";
import { CalendarDays, LogIn } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import axios from "axios";
import { BASE_URL } from "@/constant/BaseURL";

export default function HomePage() {
  const router = useRouter();

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/events`, {
          withCredentials: true,
        });
        const sorted = res.data.data.sort(
          (a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setEvents(sorted);
      } catch (err) {
        setError("Gagal memuat data event.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex justify-start items-center gap-2 text-xl font-semibold">
          <CalendarDays className="w-5 h-5" />
          Semua Event
        </div>
      </div>

      {/* Konten */}
      <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
        {/* Login Button */}
        <div className="flex justify-end mb-6">
          <Button
            onClick={() => router.push("/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <LogIn className="w-4 h-4 mr-2" />
            Login Peserta
          </Button>
        </div>

        {/* Loading / Error */}
        {loading && <p className="text-center text-gray-500">Memuat event...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Card Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {events.map((event) => (
              <Card
                key={event.id}
                className="cursor-pointer hover:shadow-md transition"
              >
                <CardHeader className="pb-2">
                  <CardTitle className="text-red-700 text-lg">
                    {new Date(event.startDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {new Date(event.endDate).toLocaleDateString("id-ID", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm text-gray-700 font-semibold">Event: {event.name}</div>
                  <div className="text-sm text-gray-700">{event.description}</div>
                  <div className="text-sm text-gray-700">Tempat: {event.tempat}</div>
                  <div className="text-sm text-gray-700">Harga: Rp{event.harga.toLocaleString()}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
