import React, { useEffect, useState } from 'react'
import PageTitle from '../../components/ui/PageTitle';
import { Link } from 'react-router-dom';
import type { PostsProps } from '../../types';
import axiosClient from '../../api/axios';
import { Ban, Pencil, Search, Trash2, X } from 'lucide-react';
import Dialog from '../../components/ui/Dialog';
import Breadcrumb from '../../components/ui/Breadcrumb';

const Posts: React.FC = () => {
    const breadcrumbItems = [
        { name: 'Accueil', link: '/accueil' },
        { name: 'Posts', link: '' }
    ];

    const [posts, setPosts] = useState<PostsProps[]>([]);

    const fetchPosts = async () => {
        try {
            const response = await axiosClient.get('/api/posts');
            setPosts(response.data.data);

        } catch (err) {
            console.error('Erreur de récupération des posts: ', err);
        }
    }
    
    useEffect(() => {
        fetchPosts();
    }, []);

    const [search, setSearch] = useState<string>('');
    const searchPosts = posts.filter(post =>
        post.title.toLowerCase().includes(search.toLowerCase())
    );

    const [showDialog, setShowDialog] = useState<boolean>(false);
    const [id, setId] = useState<string | null>(null);

    const [failed, setFailed] = useState<boolean>(false);

    const handleDelete = (postId: string) => {
        setId(postId);
        setShowDialog(true);
    }

    const confirmDelete = async () => {
        if (!id) return;
        try {
            await axiosClient.delete(`/api/posts/${id}`);
            setShowDialog(false);
        } catch (err) {
            console.error('Erreur lors de la suppression du post: ', err);
            setFailed(true);
        } finally {
            setId(null);
            fetchPosts();
        }
    }

    return (
        <>
            <PageTitle title='Posts' />
            <Breadcrumb items={breadcrumbItems} />

            <div className="max-w-7xl mx-auto px-6">
                <div className="hidden md:block max-w-lg mx-auto mb-3">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                        </div>
                        <input
                            type="text"
                            placeholder="Rechercher un post"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg bg-white text-gray-900
                                focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64 lg:w-80"
                        />
                    </div>
                </div>
                
                <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 flex justify-between items-center">
                        <div>
                            <h2 className="text-xl font-semibold text-white">Posts</h2>
                            <p className="text-blue-100 text-sm mt-1">Liste des posts</p>
                        </div>

                        <Link
                            to="/posts/add"
                            className="px-6 py-2 text-sm font-semibold bg-slate-700/60 text-white rounded-md hover:bg-slate-700/40 transition-colors duration-300"
                        >
                            Ajouter un post
                        </Link>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-sm sm:text-base">
                            <thead className="bg-gray-50">
                                <tr className="border-b">
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Titre
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider hidden sm:table-cell">
                                        Description
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-left text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Statut
                                    </th>
                                    <th className="px-4 sm:px-6 py-3 sm:py-4 text-center text-xs font-medium text-gray-700 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                                {searchPosts.map(post => (
                                    <tr key={post._id} className="hover:bg-gray-50 transition-colors duration-200">
                                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white font-semibold text-xs sm:text-sm">
                                                    {post.title.toUpperCase().split(' ').slice(0, 2).map(n => n[0]).join('')}
                                                </div>
                                                <div className="ml-3 sm:ml-4">
                                                    <div className="text-sm font-medium text-gray-900 line-clamp-2">
                                                        <Link to={`/posts/${post._id}`}>{post.title}</Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </td>

                                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap sm:whitespace-normal">
                                            <div className="text-sm text-gray-600 line-clamp-2">{post.description}</div>
                                        </td>
                                        
                                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                                            <span
                                                className={`inline-flex px-2 sm:px-3 py-1 text-xs font-semibold rounded-full ${post.status ?
                                                    'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
                                            >
                                                {post.status ? 'Actif' : 'Inactif'}
                                            </span>
                                        </td>

                                        <td className="px-4 sm:px-6 py-3 sm:py-4 whitespace-nowrap text-center">
                                            <div className="flex justify-center space-x-4">
                                                <Link
                                                    to={`/posts/${post._id}/edit`}
                                                    className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 p-2 rounded-lg transition-colors duration-200"
                                                    title="Modifier le post"
                                                >
                                                    <Pencil className="w-4 h-4" />
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(post._id!)}
                                                    className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded-lg transition-colors duration-200"
                                                    title="Supprimer le post"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="bg-gray-50 px-6 py-3 border-t border-gray-200">
                        <div className="flex items-center justify-between">
                            <div className="text-sm text-gray-500">
                                Affichage de {searchPosts.length} résultats
                            </div>
                            <div className="flex space-x-2">
                                <button className="px-3 py-1 text-xs border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100 transition-colors duration-200">
                                    Précédent
                                </button>
                                <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200">
                                    Suivant
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {showDialog &&
                <Dialog title='Supprimer le post' onClose={() => setShowDialog(false)}>
                    <p className="text-gray-700 text-sm">Êtes-vous sûr de vouloir supprimer ce post ? Cette action est irréversible.</p>
                    <div className="mt-6 flex justify-end space-x-4">
                        <button
                            onClick={() => setShowDialog(false)}
                            className="inline-flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 transition-colors duration-200"
                        >
                            <Ban className='h-4 w-4 mr-1' />
                            <span className='text-sm font-semibold'>Annuler</span>
                        </button>
                        <form onSubmit={confirmDelete}>
                            <button
                                type='submit'
                                className="inline-flex items-center px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
                            >
                                <Trash2 className='h-4 w-4 mr-1' />
                                <span className='text-sm font-semibold'>Supprimer</span>
                            </button>
                        </form>
                    </div>
                </Dialog>
            }

            {failed && (
                <Dialog title="Échec de l'opération !" onClose={() => setFailed(false)}>
                    <p className='text-gray-700 text-sm'>Une erreur s'est produite lors de la suppression du post. Veuillez réessayer.</p>
                    <div className="mt-4 flex justify-center">
                        <button
                            onClick={() => setFailed(false)}
                            className="inline-flex items-center px-4 py-2 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors duration-200"
                        >
                            <X className='h-4 w-4 mr-1' />
                            <span className='text-sm font-semibold'>Fermer</span>
                        </button>
                    </div>
                </Dialog>
            )}
        </>
    );
}

export default Posts;
