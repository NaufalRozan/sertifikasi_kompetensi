import axios from 'axios';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { BASE_URL } from './constant/BaseURL';

export function middleware(request: NextRequest) {
    const accessToken = request.cookies.get('access_token')?.value;

    if (!accessToken) {
        return NextResponse.redirect(new URL('/auth', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: [ 
        '/dashboard',
        '/indicator/:path*',
    ],
}