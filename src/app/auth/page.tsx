'use client'
import axios from 'axios';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BASE_URL } from '@/constant/BaseURL';
import { Loader2, User } from 'lucide-react'
import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useEffect, useState } from 'react'
import { toast } from 'sonner';
import { useDispatch } from 'react-redux';
import { userLogin } from '@/lib/features/auth/authActions';
import { AppDispatch } from '@/lib/store';
import { useForm } from 'react-hook-form';
import { updateUser } from '@/lib/features/auth/authSlice';


const AuthPage = () => {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailChange = (e: ChangeEvent<HTMLInputElement>) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            toast.promise(
                axios.post(
                    `http://localhost:5000/auth/login`,
                    {
                        username: email,
                        password: password
                    },
                    {
                        withCredentials: true
                    }
                ),
                {
                    loading: 'Logging in...',
                    success: async () => {
                        // Tunggu backend nyimpan cookie di browser
                        await new Promise((res) => setTimeout(res, 500));

                        try {
                            const check = await axios.get(`${BASE_URL}/users`, {
                                withCredentials: true,
                            });

                            if (check.status === 200) {
                                router.push("/dashboard");
                                return "Login berhasil!";
                            } else {
                                return "Login berhasil, tetapi gagal mengambil data pengguna.";
                            }
                        } catch (error) {
                            console.error("Session check failed", error);
                            return "Login berhasil, tapi tidak bisa memverifikasi sesi.";
                        }
                    },
                    error: 'Error logging in'
                })
        } catch (error) {
            setError(String(error));
            console.error('outside ' + error);
        } finally {
            setTimeout(() => {
                setLoading(false);
            }, 1000);
        }
    };


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${BASE_URL}/users/access-token`, {
                    withCredentials: true
                });

                // Validasi bahwa data user benar-benar ada
                if (response.status === 200 && response.data?.data?.id) {
                    toast.info('You are already logged in');
                    router.push('/dashboard');
                }
            } catch (error) {
                // Silent fail, user belum login
                console.log("Not logged in", error);
            }
        };

        fetchData();
    }, [router]);

    return (
        <section className="min-h-screen flex items-center justify-center bg-slate-50">
            <div className="bg-white flex rounded-2xl shadow-lg max-w-3xl p-5 items-center">

                <div className="md:w-full px-8 md:px-16">
                    <h2 className="font-bold text-3xl text-[#AA2727]">Login</h2>

                    <p className="text-s mt-2 text-[#AA2727]">
                        Sertifikasi Kompetensi
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Input
                            className="p-2 mt-4 rounded-xl border"
                            name="email"
                            placeholder="Username"
                            value={email}
                            onChange={handleEmailChange}
                        />
                        <div className="relative">
                            <Input
                                className="p-2 rounded-xl border w-full"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                fill="gray"
                                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2 hover:fill-[#002D74] cursor-pointer transition-all"
                                viewBox="0 0 16 16"
                                onClick={togglePasswordVisibility}
                            >
                                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
                            </svg>
                        </div>
                        {loading ? (
                            <Button type="submit" disabled>
                                <Loader2 className="animate-spin" />
                                Logging in ...
                            </Button>
                        ) : (
                            <Button type="submit">
                                Login
                            </Button>
                        )}
                    </form>
                </div>
            </div>
        </section>
    )
}

export default AuthPage