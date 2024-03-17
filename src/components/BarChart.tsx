import { Bar } from 'react-chartjs-2';
import CircularProgress from '@mui/material/CircularProgress';
import { Transaction } from '../types';
import { calcDailyBalance } from '../utils/financeCalc';
import { Box, Typography } from '@mui/material';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartData,
} from 'chart.js';



ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface BarChartProps {
    monthlyTransactions: Transaction[];
    isLoading: boolean;
}

const BarChart = ({ monthlyTransactions, isLoading }: BarChartProps) => {
    const options = {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
            // legend: {
            //     position: 'top' as const,
            // },
            title: {
                display: true,
                text: '日別収支',
            },
        },
    };

    const dailyBalances = calcDailyBalance(monthlyTransactions);

    const dateLabels = Object.keys(dailyBalances);
    const expenseData = dateLabels.map((day) => dailyBalances[day].expense)
    const incomeData = dateLabels.map((day) => dailyBalances[day].income)


    const data: ChartData<"bar"> = {
        labels: dateLabels,
        datasets: [
            {
                label: '収入',
                data: incomeData,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
            {
                label: '支出',
                data: expenseData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Box>
            {
                isLoading ? (
                    <CircularProgress />
                ) : monthlyTransactions.length > 0 ? (
                    <Bar options={options} data={data} />
                ) : (
                    <Typography>データがありません</Typography>
                )
            }
        </Box>
    );

}

export default BarChart
