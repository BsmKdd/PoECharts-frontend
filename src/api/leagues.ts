import { AxiosError } from 'axios';
import { LeaguesInterface } from '../@types/playerData';
import { sendAxiosRequest } from './axiosConfig';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface getLeaguesResponse {
    data: LeaguesInterface | undefined;
    errorMessage: string | undefined;
    status: number;
}

export const getLeagues = async (): Promise<getLeaguesResponse> => {
    const url = `${baseUrl}/leagues`;
    try {
        const response = await sendAxiosRequest<LeaguesInterface>({ method: 'get', url });
        return {
            data: response.data,
            errorMessage: undefined,
            status: 200,
        };
    } catch (error) {
        const axiosError = error as AxiosError;
        return {
            errorMessage: axiosError.message,
            data: undefined,
            status: axiosError.status ?? 500,
        };
    }
};
