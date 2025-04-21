import { createAsyncThunk } from "@reduxjs/toolkit";

export const userLogin = createAsyncThunk(
    'auth/login',
    async (data: { username: string, password: string }) => {
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify(data),
        });
        if (!response.ok) {
            throw new Error('Failed to login');
        }
        return response.json();
    }
)