export interface UserState {
    id: string;
    username: string;
    createdAt: string;
    updatedAt: string;
}

export interface AuthState {
    userInfo: UserState | null
    userToken: string | null
    loading: boolean
    success: string | null
    error: string | null
}

export interface Program {
    id: string;
    name: string;
    description: string;
    status: string;
    startDate: string;
    endDate: string;
    createdAt: string;
    updatedAt: string;
    Event: Event[];
}

export interface Event {
    id: string;
    programId: string;
    jenisEventId: string;
    name: string;
    startDate: string;
    endDate: string;
    harga: number;
    tempat: string;
    description: string;
}
