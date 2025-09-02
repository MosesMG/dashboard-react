import React, { useEffect, useState } from "react";
import PageTitle from "../../components/ui/PageTitle";
import { Link } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import Breadcrumb from "../../components/ui/Breadcrumb";
import type { PostProps } from "../../types/home";
import axiosClient from "../../services/api.service";
import Pagination from "../../components/ui/Pagination";

const ListPosts: React.FC = () => {
    const breadcrumbItems = [
        { name: "Accueil", link: "/accueil" },
        { name: "Posts", link: "" }
    ];

    const [posts, setPosts] = useState<PostProps[]>([]);
    const [error, setError] = useState<string>("");

    const fetchPosts = async () => {
        try {
            const response = await axiosClient.get("/api/posts");
            setPosts(response.data);
        } catch (err: any) {
            if (err.response && err.response.data) {
                setError(err.response.data.message)
            } else {
                setError("Erreur de chargement des posts.")
            }
        }
    }

    useEffect(() => {
        fetchPosts()
    }, []);

    const [search, setSearch] = useState<string>('');
    const searchPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    const [thisPage, setThisPage] = useState<number>(1);
    const postsPerPage = 7;

    const totalPages = Math.ceil(searchPosts.length / postsPerPage);
    const indexOfLastPost = thisPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = searchPosts.slice(indexOfFirstPost, indexOfLastPost);

    return (
        <>
            <PageTitle title="Liste des posts" />
            <Breadcrumb items={breadcrumbItems} />

            <section>
                <div className="flex justify-between items-center lg:px-24">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">Liste des posts</h1>
                        <p className="text-gray-500 mt-1">
                            Gestion des posts et des articles
                        </p>
                    </div>

                    <div>
                        <Link
                            to="/posts/ajouter"
                            className="bg-white border border-blue-500 rounded-md px-4 py-2 inline-flex items-center text-sm font-semibold text-blue-700 hover:bg-blue-500 hover:text-white transition-colors duration-200"
                        >
                            <Plus className="h-4 w-4 mr-1" />
                            Ajouter un post
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
                                    placeholder="Rechercher un post"
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
    
                        <div className="container mx-auto px-4 pt-4">
                            <div className="overflow-x-auto shadow-lg rounded-md">
                                <table className="min-w-full bg-white dark:bg-gray-800">
                                    <thead className="bg-gray-100 dark:bg-gray-700">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Titre
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Contenu
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">
                                                Auteur
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">
                                                Date
                                            </th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Staut
                                            </th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Actions
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                                        {currentPosts.map((post) => (
                                            <tr
                                                key={post._id}
                                                className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200"
                                            >
                                                <td className="px-4 py-4 text-sm text-gray-900">
                                                    {post.title.slice(0, 30)}
                                                </td>
                                                <td className="px-4 py-4 text-xs text-gray-900 max-w-sm">
                                                    {post.content.slice(0, 100)}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-900 hidden sm:table-cell">
                                                    {post.author}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-900 hidden md:table-cell">
                                                    {new Date(post.date).toLocaleDateString()}
                                                </td>
                                                <td className="px-4 py-4 text-sm text-gray-900">
                                                    {post.status ?
                                                        <span className="text-xs text-green-800 bg-green-200 px-4 py-1 rounded-full">Actif</span> :
                                                        <span className="text-xs text-red-800 bg-red-200 px-4 py-1 rounded-full">Inactif</span>
                                                    }
                                                </td>
                                                <td className="px-4 py-4 text-sm">
                                                    <div className="flex justify-center items-center gap-x-3">
                                                        <button className="text-blue-600 dark:text-blue-400 hover:underline mr-3">
                                                            Voir
                                                        </button>
                                                        <button className="text-yellow-600 dark:text-yellow-400 hover:underline mr-3">
                                                            Éditer
                                                        </button>
                                                        <button className="text-red-600 dark:text-red-400 hover:underline">
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
                    </>
                }
            </section>
        </>
    );
};

export default ListPosts;
