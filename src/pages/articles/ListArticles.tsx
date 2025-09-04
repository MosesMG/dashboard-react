import React from "react"
import PageTitle from "../../components/ui/PageTitle";
import type { IBreadcrumbItem } from "../../types/home";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { Link } from "react-router-dom";
import { Plus } from "lucide-react";

const ListArticles = () => {
    const breadcrumbItems: IBreadcrumbItem[] = [
        { name: "Accueil", link: "/accueil" },
        { name: "Articles", link: "" }
    ]
    
    return (
        <>
            <PageTitle title="Les artciles" />
            <Breadcrumb items={breadcrumbItems} />

            <section>
                <div className="flex justify-between items-center lg:px-24">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Liste des articles</h1>
                        <p className="text-gray-500 mt-1">
                            Gestion des articles
                        </p>
                    </div>

                    <div>
                        <Link
                            to="/articles/ajouter"
                            className="bg-white border border-blue-500 rounded-md px-4 py-2 inline-flex items-center text-sm font-semibold text-blue-700 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Ajouter un article
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ListArticles;
