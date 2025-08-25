import React, { useState } from 'react'
import PageTitle from '../components/ui/PageTitle';
import { Ban, Loader2, Save } from 'lucide-react';
import Breadcrumb from '../components/ui/Breadcrumb';

interface PostProps {
    id: number;
    title: string;
    description: string;
    status: boolean
}

const PostForm: React.FC = () => {
    const breadcrumbItems = [
        { name: 'Accueil', link: '/accueil' },
        { name: 'Posts', link: '/posts' },
        { name: 'Ajouter un post', link: '' }
    ];

    const [formData, setFormData] = useState<PostProps>({
        id: 0,
        title: '',
        description: '',
        status: true
    });
    const [loading, setLoading] = useState<boolean>(false);
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleReset = () => {
        setFormData({
            id: 0,
            title: '',
            description: '',
            status: true
        });
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
    }

    return (
        <>
            <PageTitle title='Ajouter un post' />
            <Breadcrumb items={breadcrumbItems} />

            <div className="max-w-lg mx-auto space-y-6 bg-white rounded-lg shadow-md border border-gray-200">
                <div className='mt-4'>
                    <h2 className='text-2xl font-semibold text-center text-gray-700'>Ajouter un post</h2>
                    <p className='text-gray-500 text-center text-sm mt-2'>Entrez les informations ci-dessous</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 px-6 py-4 border-t border-t-gray-300">
                    <div>
                        <label htmlFor="id" className="block text-sm font-semibold text-gray-700">
                            ID
                        </label>
                        <input
                            type="number"
                            name="id"
                            value={formData.id}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="title" className="block text-sm font-semibold text-gray-700">
                            Titre
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="description" className="block text-sm font-semibold text-gray-700">
                            Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                            {...{ style: { resize: 'none' } }}
                        />
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-semibold text-gray-700">
                            Statut
                        </label>
                        <select 
                            name="status"
                            className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                        >
                            <option value="true">Actif</option>
                            <option value="false">Inactif</option>
                        </select>
                        
                    </div>

                    <div className="flex justify-end gap-8" onClick={handleReset}>
                        <button className='inline-flex items-center px-4 py-2 text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg transition-colors font-semibold hover:cursor-pointer'>
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
                                    <span className='font-semibold'>Enregistrer</span>
                                </>
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default PostForm;
