import { Link } from "react-router-dom";

const Breadcrumb = ({ items }) => {
    if (!items || items.length === 0) return null;

    return (
        <div className="flex items-center space-x-1 text-xs text-gray-500 mb-5">
            {items.map((item, index) =>
                <div key={index} className="flex items-center">
                    {index > 0 && (
                        <i className="fa fa-chevron-right text-gray-600 text-xs mx-1"></i>
                    )}
                    {index && items.length -1 ? (
                        <span className="text-gray-800 font-semibold">{item.name}</span>
                    ) : (
                        <Link to={item.link} className="font-semibold hover:text-blue-600 transition-colors">
                            {item.name}
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
}

export default Breadcrumb;
