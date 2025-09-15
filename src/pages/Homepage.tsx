import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Homepage = () => {
   return (
      <div>
         <Link
            to="/login"
            className="inline-flex items-center gap-x-1 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-violet-700
               rounded-sm text-white font-semibold shadow-xl"
         >
            Accéder à l'application
            <ArrowRight className="w-4 h-4" />
         </Link>
      </div>
   );
}

export default Homepage;
