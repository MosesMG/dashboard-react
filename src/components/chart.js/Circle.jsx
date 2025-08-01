import { useMemo } from "react";
import { Doughnut } from "react-chartjs-2";
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    Title,
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

const Circle = ({ sourceData }) => {
    if (!sourceData || sourceData.length === 0) return null;

    const totalRevenue = sourceData.reduce((sum, d) => sum + d.revenue, 0);
    const totalLoss = sourceData.reduce((sum, d) => sum + d.loss, 0);
    const totalExpense = sourceData.reduce((sum, d) => sum + d.expense, 0);
    const totalInvestment = sourceData.reduce((sum, d) => sum + d.investment, 0);

    const data = useMemo(() => ({
        labels: ['Revenus', 'Pertes', 'Dépenses', 'Investissements'],
        datasets: [
            {
                label: 'Répartition financière',
                data: [totalRevenue, totalLoss, totalExpense, totalInvestment],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.8)',
                    'rgba(255, 99, 132, 0.8)',
                    'rgba(255, 205, 86, 0.8)',
                    'rgba(54, 162, 235, 0.8)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 205, 86, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 2,
            },
        ],
    }), [sourceData]);

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'left',
                fullSize: false,
            },
            title: {
                display: true,
                text: 'Représentation circulaire',
            },
        },
    };

    return <Doughnut data={data} options={options} />;
};

export default Circle;
