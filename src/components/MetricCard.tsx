import React from "react";
import type { MetricCardProps } from "../types/home";
import { TrendingDown, TrendingUp } from "lucide-react";

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, icon, iconBg }) => (
    <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
        <div className="flex items-center justify-between">
            <div>
                <p className="text-gray-500 text-sm font-medium">{title}</p>
                <h3 className="text-2xl font-bold text-gray-900 mt-1">{value}</h3>
                <div className="flex items-center mt-2 text-sm">
                    <span className={`flex items-center font-medium ${changeType === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                        {changeType === 'up' ? <TrendingUp className="w-4 h-4 mr-1" /> : <TrendingDown className="w-4 h-4 mr-1" />}
                        {change}
                    </span>
                    <span className="text-gray-500 ml-2">vs last period</span>
                </div>
            </div>
            <div className={`w-12 h-12 ${iconBg} rounded-full flex items-center justify-center`}>
                {icon}
            </div>
        </div>
    </div>
);

export default MetricCard;
