import React, { useEffect, useState } from "react";
import Breadcrumb from "../../components/ui/Breadcrumb";
import PageTitle from "../../components/ui/PageTitle";
import type { IBreadcrumbItem } from "../../types/ui";
import { useNavigate, useParams } from "react-router-dom";
import { useNotification } from "../../context/NotificationContext";
import type { IArticle, ICategorie } from "../../types/home";
import axiosClient from "../../services/api.service";
import { Ban, Loader2, Save } from "lucide-react";

const FormArticle: React.FC = () => {
   const { id } = useParams<{ id: string }>();
   const updating = !!id;
   const { addNotification } = useNotification();

   const breadcrumbItems: IBreadcrumbItem[] = [
      { name: "Accueil", link: "/accueil" },
      { name: "Articles", link: "/articles" },
      { name: updating ? "Éditer" : "Ajouter", link: "" }
   ];

   const [categories, setCategories] = useState<ICategorie[]>([]);
   const [form, setForm] = useState<IArticle>({
      name: "",
      price: 0,
      quantity: 1,
      category: ""
   });
   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const navigate = useNavigate();

   // Charger les catégories
   useEffect(() => {
      const fetchCategorires = async () => {
         try {
            const response = await axiosClient.get("/api/categories")
            setCategories(response.data)
         } catch (err) {
            setError("Erreur de récupération des catégories");
            throw (err);
         }
      }

      fetchCategorires();
   }, []);

   // Charger l'article à éditer
   useEffect(() => {
      if (id) {
         axiosClient.get(`/api/articles/${id}`)
            .then((res) => setForm(res.data))
            .catch((err: any) => {
               if (err.response && err.response.data) {
                  setError(err.response.data)
               } else {
                  setError("Erreur de chargement.");
               }
            })
      }
   }, [id]);

   const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setForm((prev) => ({
         ...prev,
         [name]: name === "price" || name === "quantity" ? Number(value) : value
      }));
   }

   const handleReset = () => {
      setForm({ name: "", price: 0, quantity: 1, category: "" });
      setError(null);
   }

   const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setLoading(true);
      setError(null);

      try {
         let response;
         if (updating) {
            response = await axiosClient.put(`/api/articles/${id}`, form);
         } else {
            response = await axiosClient.post("/api/articles", form);
         }
         addNotification(response.data.message || (updating ? "Article modifié avec succès !" : "Article créé avec succès !"));
         navigate("/articles");
      } catch (error: any) {
         if (error.response && error.response.data) {
            setError(error.response.data.message);
         } else {
            setError("Erreur lors de la création du post.");
         }
      } finally {
         setLoading(false);
      }
   }

   return (
      <>
         <PageTitle title={(updating ? "Éditer" : "Ajouter") + " un article"} />
         <Breadcrumb items={breadcrumbItems} />

         <div className="max-w-md mx-auto mt-12 space-y-4 bg-white rounded-lg shadow-md border border-gray-200">
            <div className="mt-3">
               <h2 className="text-xl font-semibold text-center text-gray-700">{updating ? "Éditer" : "Ajouter"} un article</h2>
               <p className="text-gray-500 text-center text-sm mt-2">Entrez les informations ci-dessous</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5 px-6 py-4 border-t border-t-gray-300">
               {error && (
                  <p className="text-red-500 text-center text-xs font-semibold mb-2">{error}</p>
               )}

               <div>
                  <label htmlFor="category" className="block text-sm font-semibold text-gray-700">
                     Catégorie
                  </label>
                  <select
                     value={form.category}
                     onChange={handleChange}
                     name="category"
                     className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                     required
                  >
                     <option value="">Choisir une catégorie</option>
                     {categories.map((categ) => (
                        <option key={categ._id} value={categ._id}>{categ.name}</option>
                     ))}
                  </select>
               </div>

               <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                     Nom
                  </label>
                  <input
                     type="text"
                     name="name"
                     value={form.name}
                     onChange={handleChange}
                     className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                     required
                  />
               </div>

               <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
                     Prix
                  </label>
                  <input
                     type="number"
                     name="price"
                     value={form.price}
                     onChange={handleChange}
                     className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  />
               </div>

               <div>
                  <label htmlFor="price" className="block text-sm font-semibold text-gray-700">
                     Quantité
                  </label>
                  <input
                     type="number"
                     name="quantity"
                     value={form.quantity}
                     onChange={handleChange}
                     className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                  />
               </div>

               <div className="mt-8 flex justify-end gap-8">
                  <button
                     type="reset"
                     onClick={handleReset}
                     className='inline-flex items-center px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-semibold hover:cursor-pointer'>
                     <Ban className='h-4 w-4 mr-1' />
                     Réinitialiser
                  </button>

                  <button
                     type="submit"
                     disabled={loading}
                     className={`inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:cursor-pointer`}
                  >
                     {loading ?
                        <>
                           <Loader2 className='h-4 w-4 animate-spin mr-1' />
                           <span className='font-semibold'>Enregistrement</span>
                        </> :
                        <>
                           <Save className='h-4 w-4 mr-1' />
                           <span className='font-semibold'>
                              {updating ? 'Modifier' : 'Ajouter'}
                           </span>
                        </>
                     }
                  </button>
               </div>
            </form>
         </div>
      </>
   );
}

export default FormArticle;
