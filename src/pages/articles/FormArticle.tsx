// import type React from "react";
// import Breadcrumb from "../../components/ui/Breadcrumb";
// import PageTitle from "../../components/ui/PageTitle";
// import type { IBreadcrumbItem } from "../../types/ui";
// import { useParams } from "react-router-dom";
// import { useNotification } from "../../context/NotificationContext";

// const FormArticle: React.FC = () => {
//    const { id } = useParams<{ id: string }>();
//    const updating = !!id;
//    const { addNotification } = useNotification();

//    const breadcrumbItems: IBreadcrumbItem[] = [
//       { name: "Accueil", link: "/accueil" },
//       { name: "Articles", link: "/articles" },
//       { name: updating ? "Éditer" : "Ajouter", link: "" }
//    ];
//    return (
//       <>
//          <PageTitle title={(updating ? "Éditer" : "Ajouter") + " un article"} />
//          <Breadcrumb items={breadcrumbItems} />

//          <div className="max-w-md mx-auto mt-12 space-y-4 bg-white rounded-lg shadow-md border border-gray-200">
//             <div className="mt-3">
//                <h2 className="text-xl font-semibold text-center text-gray-700">{updating ? "Éditer" : "Ajouter"} une catégorie</h2>
//                <p className="text-gray-500 text-center text-sm mt-2">Entrez les informations ci-dessous</p>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-5 px-6 py-4 border-t border-t-gray-300">
//                {errors?.message && (
//                   <p className="text-red-500 text-center text-xs font-semibold mb-2">{errors.message}</p>
//                )}

//                <div>
//                   <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
//                      Nom
//                   </label>
//                   <input
//                      type="text"
//                      name="name"
//                      value={form.name}
//                      onChange={handleChange}
//                      className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//                      required
//                   />
//                   {errors?.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
//                </div>

//                <div>
//                   <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
//                      Description
//                   </label>
//                   <textarea
//                      name="description"
//                      value={form.description}
//                      onChange={handleChange}
//                      rows={2}
//                      className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
//                      {...{ style: { resize: 'none' } }}
//                   />
//                   {errors?.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
//                </div>

//                <div className="mt-8 flex justify-end gap-8">
//                   <button
//                      type="reset"
//                      onClick={handleReset}
//                      className='inline-flex items-center px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-semibold hover:cursor-pointer'>
//                      <Ban className='h-4 w-4 mr-1' />
//                      Réinitialiser
//                   </button>

//                   <button
//                      type="submit"
//                      disabled={loading}
//                      className={`inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:cursor-pointer`}
//                   >
//                      {loading ?
//                         <>
//                            <Loader2 className='h-4 w-4 animate-spin mr-1' />
//                            <span className='font-semibold'>Enregistrement</span>
//                         </> :
//                         <>
//                            <Save className='h-4 w-4 mr-1' />
//                            <span className='font-semibold'>
//                               {updating ? 'Modifier' : 'Ajouter'}
//                            </span>
//                         </>
//                      }
//                   </button>
//                </div>
//             </form>
//          </div>
//       </>
//    );
// }

// export default FormArticle;
