import {
    CategoryScale,
    ChartData,
    Chart as ChartJS,
    ChartOptions,
    Colors,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import { useEffect, useRef } from 'react';
import { Chart } from 'react-chartjs-2';
import styles from './Chart.module.scss';
import { isObjectEmpty } from '../../utils/utils';
import { externalTooltipHandler, LineOnHoverPlugin } from '../../utils/chartUtils';

ChartJS.register(
    CategoryScale,
    LinearScale,
    Title,
    Tooltip,
    Legend,
    PointElement,
    LineElement,
    Colors,
    LineOnHoverPlugin,
);

interface Props {
    chartType: 'line' | 'bar' | 'pie' | 'doughnut';
    chartData: ChartData<'bar' | 'line' | 'pie' | 'doughnut'>;
    chartOptions: ChartOptions<'bar' | 'line'>;
}

const ChartContainer: React.FC<Props> = ({
    chartType,
    chartData,
    chartOptions,
}: Props): JSX.Element => {
    const chartRef = useRef<ChartJS>(null);

    useEffect(() => {
        const chart = chartRef.current;
        if (chart) {
            chart.options = !isObjectEmpty(chartOptions)
                ? {
                      ...chartOptions,
                      plugins: {
                          colors: { enabled: true },
                          tooltip: { enabled: false, external: externalTooltipHandler },
                      },
                  }
                : {};

            chart.update('none');
        }
    }, [chartOptions]);

    return (
        <div className={styles.chartContainer}>
            <Chart
                ref={chartRef}
                data={chartData as ChartData<'line' | 'bar' | 'pie' | 'doughnut'>}
                type={chartType}
            />
        </div>
    );
};

export { ChartContainer };
