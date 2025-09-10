import React from "react"
import PageTitle from "../../components/ui/PageTitle";
import type { IBreadcrumbItem } from "../../types/ui";
import Breadcrumb from "../../components/ui/Breadcrumb";

const SingleArticle: React.FC = () => {
   const breadcrumbItems: IBreadcrumbItem[] = [
      { name: "Accueil", link: "/accueil" },
      { name: "Articles", link: "/articles" },
      { name: "Détails", link: "" }
   ];

   return (
      <>
         <PageTitle title="Détails d'un article" />
         <Breadcrumb items={breadcrumbItems} />

         <section>
            <div className="lg:px-12">
               <h1 className="text-2xl font-bold text-gray-900">Détails d'un article</h1>
               <p className="text-gray-500 mt-1">Gestion des articles</p>
            </div>

         </section>
      </>
   );
}

export default SingleArticle;
