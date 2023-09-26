import { AxiosError } from 'axios';
import { PlayerNumbersInterface } from '../@types/playerData';
import { sendAxiosRequest } from './axiosConfig';

const baseUrl = import.meta.env.VITE_API_BASE_URL;

interface getPlayerNumbersResponse {
    data: PlayerNumbersInterface | undefined;
    errorMessage: string | undefined;
    status: number;
}

export const getPlayerNumbers = async (): Promise<getPlayerNumbersResponse> => {
    console.log(import.meta.env);

    const url = `${baseUrl}/playernumbers`;
    try {
        const response = await sendAxiosRequest<PlayerNumbersInterface>({ method: 'get', url });
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
