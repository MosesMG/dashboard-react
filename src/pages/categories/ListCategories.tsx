import React, { useEffect, useState, type FormEvent } from "react"
import PageTitle from "../../components/ui/PageTitle";
import type { ICategorie } from "../../types/home";
import type { IBreadcrumbItem } from "../../types/ui";
import Breadcrumb from "../../components/ui/Breadcrumb";
import { Link } from "react-router-dom";
import { Ban, Plus, Search, Trash2, X } from "lucide-react";
import axiosClient from "../../services/api.service";
import Pagination from "../../components/ui/Pagination";
import Dialog from "../../components/ui/Dialog";
import { useNotification } from "../../context/NotificationContext";

const ListCategories: React.FC = () => {
    const { addNotification } = useNotification();

    const breadcrumbItems: IBreadcrumbItem[] = [
        { name: "Accueil", link: "" },
        { name: "Catégories", link: "" }
    ];

    const [categories, setCategories] = useState<ICategorie[]>([]);
    const [error, setError] = useState<string>("");

    const fetchCategories = async () => {
        try {
            const response = await axiosClient.get("/api/categories");
            setCategories(response.data);
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data.message)
            } else {
                setError("Erreur de chargement des catégories.")
            }
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);

    const [search, setSearch] = useState<string>('');
    const searchCategories = categories.filter(categ =>
        categ.name.toLowerCase().includes(search.toLowerCase())
    );

    const [thisPage, setThisPage] = useState<number>(1);
    const categPerPage = 7;

    const totalPages = Math.ceil(searchCategories.length / categPerPage);
    const indexOfLastPost = thisPage * categPerPage;
    const indexOfFirstPost = indexOfLastPost - categPerPage;
    const currentCategories = searchCategories.slice(indexOfFirstPost, indexOfLastPost);

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [id, setId] = useState<string | null>(null);
    const [reqFailed, setReqFailed] = useState<boolean>(false);

    const handleDelete = (id: string) => {
        setId(id);
        setShowDialog(true);
    }

    const confirmDelete = async (e: FormEvent) => {
        e.preventDefault();
        if (!id) return;
        try {
            await axiosClient.delete(`/api/categories/${id}`);
            setShowDialog(false);
            fetchCategories();
            addNotification("Catégorie supprimée avec succès.")
        } catch (err) {
            setReqFailed(true);
            console.log(err);
        } finally {
            setId(null);
        }
    }

    return (
        <>
            <PageTitle title="Catégories" />
            <Breadcrumb items={breadcrumbItems} />

            <section>
                <div className="flex justify-between items-center lg:px-24">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Liste des catégories</h1>
                        <p className="text-gray-500 mt-1">
                            Gestion des catégories
                        </p>
                    </div>

                    <div>
                        <Link
                            to="/categories/ajouter"
                            className="bg-white border border-blue-500 rounded-md px-4 py-2 inline-flex items-center text-sm font-semibold text-blue-700 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Ajouter une catégorie
                        </Link>
                    </div>
                </div>

                {error ?
                    <p>
                        {error}
                    </p> :
                    
                    <>
                        <div className="hidden md:flex items-center justify-between max-w-lg mx-auto mt-4 mb-0">
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Rechercher une catégorie"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
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
                                                Nom
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                                                Description
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Total articles
                                            </th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {currentCategories.map((categ) => (
                                            <tr
                                                key={categ._id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                <td className="px-4 py-4 text-sm text-gray-900">
                                                    {categ.name}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-900 hidden sm:table-cell">
                                                    {categ.description}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-900">
                                                    {categ.name}
                                                </td>
                                                <td className="px-4 py-4 text-xs">
                                                    <div className="flex justify-center items-center gap-x-3">
                                                        <Link
                                                            to={`/categories/${categ._id}/editer`}
                                                            className="px-3 py-1 rounded-full text-orange-800 bg-orange-100 hover:underline"
                                                        >
                                                            Éditer
                                                        </Link>
                                                        <button
                                                            onClick={() => handleDelete(categ._id!)}
                                                            className="px-3 py-1 rounded-full text-red-600 bg-red-50 hover:underline hover:cursor-pointer ml-4"
                                                        >
                                                            Supprimer
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <Pagination
                                currentPage={thisPage}
                                totalPages={totalPages}
                                onPageChange={setThisPage}
                            />
                        </div>
                    
                        {showDialog && (
                            <Dialog title="Supprimer la catégorie" onClose={() => setShowDialog(false)}>
                                <p className="text-gray-700 text-sm">Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible.</p>
                                <div className="mt-6 flex justify-end space-x-4">
                                    <button
                                        onClick={() => setShowDialog(false)}
                                        className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                                    >
                                        <Ban className="h-4 w-4 mr-1" />
                                        <span className="text-sm font-semibold">Annuler</span>
                                    </button>
                                    <form onSubmit={confirmDelete}>
                                        <button
                                            type="submit"
                                            className="inline-flex items-center px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                                        >
                                            <Trash2 className="h-4 w-4 mr-1" />
                                            <span className="text-sm font-semibold">Supprimer</span>
                                        </button>
                                    </form>
                                </div>
                            </Dialog>
                        )}

                        {reqFailed && (
                            <Dialog title="Échec de l'opération" onClose={() => setReqFailed(false)}>
                                <p className="text-gray-700 text-sm">
                                    Une erreur s'est produite lors de la suppression de la catégorie. Veuillez réessayer.
                                </p>
                                <div className="mt-4 flex justify-center">
                                    <button
                                        onClick={() => setReqFailed(false)}
                                        className="inline-flex items-center px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors duration-200"
                                    >
                                        <X className="h-4 w-4 mr-1" />
                                        <span className="text-sm font-semibold">Fermer</span>
                                    </button>
                                </div>
                            </Dialog>
                        )}
                    </>
                }
            </section>
        </>
    );
}

export default ListCategories;
