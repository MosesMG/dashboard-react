import PageTitle from "../../components/ui/PageTitle";
import type { IBreadcrumbItem } from "../../types/ui";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { Link } from "react-router-dom";
import { Pen, Plus, Search, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import type { IArticle, ICategorie } from "../../types/home";
import axiosClient from "../../services/api.service";

interface ArticleCategory extends IArticle {
   category: ICategorie
}

const ListArticles = () => {
   const breadcrumbItems: IBreadcrumbItem[] = [
      { name: "Accueil", link: "/accueil" },
      { name: "Articles", link: "" }
   ];

   const [artciles, setArticles] = useState<ArticleCategory[]>([]);
   const [error, setError] = useState<string>("");

   const fetchArticles = async () => {
      try {
         const response = await axiosClient.get("/api/articles");
         setArticles(response.data)
      } catch (err: any) {
         if (err.response && err.response.data) {
            setError(err.response.data.message)
         } else {
            setError("Erreur de chargement des articles.");
         }
      }
   }

   useEffect(() => {
      fetchArticles()
   }, []);

   return (
      <>
         <PageTitle title="Les artciles" />
         <Breadcrumb items={breadcrumbItems} />

         <section>
            <div className="flex justify-between items-center lg:px-24">
               <div>
                  <h1 className="text-2xl font-bold text-gray-900">Liste des articles</h1>
                  <p className="text-gray-500 mt-1">Gestion des articles</p>
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

            {error ? <p>{error}</p> : (
               <>
                  <div className="hidden md:flex items-center justify-between max-w-lg mx-auto mt-4 mb-1">
                     <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                           <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                        <input
                           type="text"
                           placeholder="Rechercher un article"
                           // value={search}
                           // onChange={(e) => setSearch(e.target.value)}
                           className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-lg bg-white text-gray-900
                                        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 lg:w-80"
                        />
                     </div>

                     <div className="flex items-center gap-x-4">
                        <p className="text-sm">À afficher</p>
                        <select
                           name="parPage"
                           className="p-1 border border-gray-300 rounded-lg bg-white text-gray-900 text-sm
                                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                           <option value="6">6</option>
                           <option value="7">7</option>
                           <option value="8">8</option>
                           <option value="9">9</option>
                           <option value="10">10</option>
                        </select>
                     </div>
                  </div>

                  <div className="container mx-auto px-4 pt-4 max-w-6xl">
                     <div className="overflow-x-auto shadow-lg rounded-md">
                        <table className="min-w-full bg-white">
                           <thead className="bg-gray-100">
                              <tr>
                                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Catégorie
                                 </th>
                                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Nom
                                 </th>
                                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Prix
                                 </th>
                                 <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Quantité
                                 </th>
                                 <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                    Actions
                                 </th>
                              </tr>
                           </thead>
                           <tbody className="divide-y divide-gray-200">
                              {artciles.map((article) => (
                                 <tr
                                    key={article._id}
                                    className="hover:bg-gray-50 transition-colors duration-200"
                                 >
                                    <td className="px-4 py-4 text-sm text-gray-900">{article.category.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{article.name}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{article.price}</td>
                                    <td className="px-4 py-4 text-sm text-gray-900">{article.quantity}</td>
                                    <td className="px-4 py-4 text-gray-900">
                                       <div className="flex justify-center items-center gap-x-4">
                                          <Link
                                             to={`/articles/${article._id}`}
                                             className="bg-green-600 px-2.5 py-0.5 rounded-md"
                                          >
                                             <span className="text-xs text-white">Détails</span>
                                          </Link>

                                          <Link
                                             to={`/articles/${article._id}/editer`}
                                             title="Éditer"
                                             className="bg-blue-500 px-2.5 py-2 rounded-md"
                                          >
                                             <Pen className="w-3.5 h-3.5 text-white" />
                                          </Link>

                                          <button
                                             type="button"
                                             className="bg-red-500/90 px-2.5 py-2 rounded-md"
                                             title="Supprimer"
                                          >
                                             <Trash2 className="w-3.5 h-3.5 text-white" />
                                          </button>
                                       </div>
                                    </td>
                                 </tr>
                              ))}
                           </tbody>
                        </table>
                     </div>
                  </div>
               </>
            )}
         </section>
      </>
   );
}

export default ListArticles;
