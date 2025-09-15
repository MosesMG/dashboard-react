import Breadcrumb from "../../components/ui/Breadcrumb";
import PageTitle from "../../components/ui/PageTitle";
import type { IBreadcrumbItem } from "../../types/ui";
import { Link } from "react-router-dom";
import { Camera } from "lucide-react";
import InfosScan from "./InfosScan";

const Analyses = () => {
   const breadrcrumbItems: IBreadcrumbItem[] = [
      { name: "Accueil", link: "/accueil" },
      { name: "Analyses", link: "" }
   ];

   return (
      <>
         <PageTitle title="Analyses" />
         <Breadcrumb items={breadrcrumbItems} />

         <section>
            <div className="flex justify-between items-center lg:ps-24 lg:pe-36">
               <div>
                  <h1 className="text-2xl font-bold text-gray-900">Analyses</h1>
                  <p className="text-gray-500 mt-1">Informations et historique</p>
               </div>

               <Link
                  to="/analyses/scan"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 px-6 rounded-md shadow-md hover:shadow-lg transition-all duration-300"
               >
                  <div className="flex items-center justify-center space-x-3">
                     <Camera className="h-5 w-5" />
                     <span className="text-sm font-semibold">Ouvrir le Scanner</span>
                  </div>
               </Link>
            </div>

            <InfosScan />
         </section>
      </>
   );
}

export default Analyses;
