import { useMemo } from "react";
import { Bar } from "react-chartjs-2";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

export default function Bars({ sourceData }) {
    if (!sourceData || sourceData.length === 0) return null;

    const data = useMemo(() => ({
        labels: sourceData.map((d) => d.label),
        datasets: [
            {
                label: 'Revenues',
                data: sourceData.map((d) => d.revenue),
                backgroundColor: 'rgba(54, 162, 235, 0.8)',
                borderRadius: 5,
            },
            {
                label: 'Pertes',
                data: sourceData.map((d) => d.loss),
                backgroundColor: 'rgba(255, 99, 132, 0.8)',
                borderRadius: 5,
            },
        ],
    }), [sourceData]);

    const options = {
        responsive: true,
        plugins: {
            legend: { position: 'top' },
            title: {
                display: true,
                text: 'Représentation avec les barres'
            },
        },
    };

    return <Bar data={data} options={options} />;
}
