import { ChartData, ChartOptions } from 'chart.js';
import { useState, useEffect } from 'react';
import { ChartContainer } from '../../components/Chart/Chart';
import styles from './Playerbase.module.scss';
import { splitLeaguesIntoDatasets } from '../../utils/dataUtils';
import { getPlayerNumbers } from '../../api/playerNumbers';
import { getLeagues } from '../../api/leagues';

const Playerbase = (): JSX.Element => {
    const [userData, setUserData] = useState<ChartData<'line'> | null>({
        labels: Array.from({ length: 100 }, (_, i) => i + 1),
        datasets: [],
    });
    const [errorFetchingData, setErrorFetchingData] = useState<string>();

    useEffect(() => {
        const fetchData = async () => {
            const playerNumbersResponse = await getPlayerNumbers();
            const leaguesResponse = await getLeagues();

            if (playerNumbersResponse.data && leaguesResponse.data) {
                setUserData({
                    labels: Array.from({ length: 100 }, (_, i) => i + 1),
                    datasets: splitLeaguesIntoDatasets(
                        leaguesResponse.data,
                        playerNumbersResponse.data,
                    ).slice(5),
                });
            } else {
                setErrorFetchingData(leaguesResponse.errorMessage || leaguesResponse.errorMessage);
            }
        };

        fetchData();
    }, []);

    const [options] = useState<ChartOptions<'line'>>({
        responsive: true,
        maintainAspectRatio: true,
        aspectRatio: 2,
        resizeDelay: 500,
        animation: {
            duration: 0,
        },
        spanGaps: false,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        hover: {
            mode: 'index',
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Day',
                },
                grid: { display: false },
            },
            y: {
                title: {
                    display: true,
                    text: 'Peak Concurrent Players',
                },
                grid: { display: true, color: '#666' },
            },
        },
    });

    return (
        <div className={styles.playerBaseContainer}>
            <ChartContainer
                chartType="line"
                chartData={userData}
                chartOptions={options}
                errorMessage={errorFetchingData}
            />
            {/* <ChartContainer chartType="line" chartData={viewerData} chartOptions={options} /> */}
        </div>
    );
};

export default Playerbase;
