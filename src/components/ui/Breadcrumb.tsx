import { ChevronRight } from 'lucide-react';
import React from 'react'
import { Link } from 'react-router-dom';
import type { IBreadcrumbItem } from '../../types/home';

interface BreadcrumbProps {
    items: IBreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="flex items-center space-x-1 text-sm text-gray-500 mb-5">
            {items.map((item, index) => (
                <div key={index} className="flex items-center">
                    {index > 0 && (
                        <ChevronRight className="w-4 h-4 text-gray-600" />
                    )}
                    {index === items.length - 1 ? (
                        <span className="text-gray-800 font-semibold">{item.name}</span>
                    ) : (
                        <Link to={item.link} className="font-semibold hover:text-blue-600 transition-colors">
                            {item.name}
                        </Link>
                    )}
                </div>
            ))}
        </div>
    );
}

export default Breadcrumb;
