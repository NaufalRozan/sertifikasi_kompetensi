"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  CalendarDays,
  LogIn,
  LogOut,
  User,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { BASE_URL } from "@/constant/BaseURL";
import { toast } from "sonner";

export default function HomePage() {
  const router = useRouter();

  const [user, setUser] = useState<any | null>(null);
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/peserta/token`, {
          withCredentials: true,
        });
        setUser(res.data.data);
      } catch (err) {
        setUser(null); // Tidak login
      }
    };

    const fetchEvents = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/events`, {
          withCredentials: true,
        });
        const sorted = res.data.data.sort(
          (a: any, b: any) =>
            new Date(b.createdAt).getTime() -
            new Date(a.createdAt).getTime()
        );
        setEvents(sorted);
      } catch (err) {
        console.error(err);
        setError("Gagal memuat data event.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
    fetchEvents();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_DOMAIN}/auth/logout`,
        {},
        {
          withCredentials: true, // penting agar cookie terkirim
        }
      );

      setUser(null);
      toast.success("Berhasil logout!");
      router.refresh();
    } catch (err) {
      console.error("Logout gagal:", err);
      toast.error("Gagal logout. Silakan coba lagi.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center">
      {/* Header */}
      <div className="w-full bg-red-700 h-[300px] px-6 flex justify-center items-start pt-6">
        <div className="w-full max-w-7xl text-white flex justify-between items-center text-xl font-semibold">
          <div className="flex gap-2 items-center">
            <CalendarDays className="w-5 h-5" />
            Semua Event
          </div>

          {/* Login / Profil */}
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="cursor-pointer border border-white">
                  <AvatarImage
                    src={user.picture}
                    alt={user.name}
                    referrerPolicy="no-referrer"
                  />
                  <AvatarFallback>
                    {user.name?.[0] || "U"}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-3 py-2">
                  <p className="text-sm font-medium">{user.name}</p>
                  <p className="text-xs text-gray-500">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={handleLogout}
                  className="text-red-600 cursor-pointer"
                >
                  <LogOut className="w-4 h-4 mr-2" /> Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button
              onClick={() => router.push("/login")}
              className="bg-white text-red-700 hover:bg-gray-100"
            >
              <LogIn className="w-4 h-4 mr-2" />
              Login Peserta
            </Button>
          )}
        </div>
      </div>

      {/* Konten */}
      <div className="w-full max-w-7xl -mt-52 z-10 relative px-4 pb-10">
        {/* Loading & Error */}
        {loading && (
          <p className="text-center text-gray-500">Memuat event...</p>
        )}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Event Cards */}
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
                  <div className="text-sm text-gray-700 font-semibold">
                    Event: {event.name}
                  </div>
                  <div className="text-sm text-gray-700">
                    {event.description}
                  </div>
                  <div className="text-sm text-gray-700">
                    Tempat: {event.tempat}
                  </div>
                  <div className="text-sm text-gray-700">
                    Harga: Rp{event.harga.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
