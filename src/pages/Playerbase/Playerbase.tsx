import { ChartData, ChartOptions } from 'chart.js';
import { useState, useEffect } from 'react';
import { ChartContainer } from '../../components/Chart/Chart';
import styles from './Playerbase.module.scss';
import { splitLeaguesIntoDatasets } from '../../utils/dataUtils';
import poeAxios from '../../api/config';

const Playerbase = (): JSX.Element => {
    const [userData, setUserData] = useState<ChartData<'line'> | null>({
        labels: Array.from({ length: 100 }, (_, i) => i + 1),
        datasets: [],
    });

    useEffect(() => {
        const fetchLeagues = async () => {
            const playerNumbersData = (await poeAxios.get('/playerNumbers')).data;
            const leaguesData = (await poeAxios.get('/leagues')).data;

            console.log(playerNumbersData);

            setUserData({
                labels: Array.from({ length: 100 }, (_, i) => i + 1),
                datasets: splitLeaguesIntoDatasets(leaguesData, playerNumbersData).slice(5),
            });
        };

        fetchLeagues();
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
            <ChartContainer chartType="line" chartData={userData} chartOptions={options} />
            {/* <ChartContainer chartType="line" chartData={viewerData} chartOptions={options} /> */}
        </div>
    );
};

export default Playerbase;
