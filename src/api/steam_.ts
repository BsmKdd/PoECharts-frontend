import { AxiosError } from 'axios';
import { PlayerNumbersInterface } from '../@types/playerData';
import { sendAxiosRequest } from './axiosConfig';

const url = 'https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/';

interface getPlayerNumbersResponse {
    data: PlayerNumbersInterface | undefined;
    errorMessage: string | undefined;
    status: number;
}

export const getPlayerNumbers = async (): Promise<getPlayerNumbersResponse> => {
    console.log(import.meta.env);

    try {
        const response = await sendAxiosRequest<PlayerNumbersInterface>({
            method: 'get',
            url,
            config: { params: { format: 'json', appid: import.meta.env.VITE_POE_STEAM_APP_ID } },
        });
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

// https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1/?format=json&appid={{STEAM_POE_APP_ID}}
