import React, { useEffect, useState } from "react"
import PageTitle from "../../components/ui/PageTitle"
import { Ban, Loader2, Save, X } from "lucide-react"
import Breadcrumb from "../../components/ui/Breadcrumb"
import axiosClient from "../../services/api.service"
import { useNavigate, useParams } from "react-router-dom"
import type { PostProps } from "../../types/home"
import Dialog from "../../components/ui/Dialog"

interface PostErrors {
    title?: string;
    content?: string;
    author?: string;
    date?: string;
    status?: boolean;
    message?: string
}

const FormPost: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const updating = !!id;

    const breadcrumbItems = [
        { name: "Accueil", link: "/accueil" },
        { name: "Posts", link: "/posts" },
        { name: updating ? "Modifier un post" : "Ajouter un post", link: "" }
    ];

    const [formData, setFormData] = useState<PostProps>({
        title: "",
        content: "",
        author: "",
        date: "",
        status: true
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [failed, setFailed] = useState<boolean>(false);
    const [errors, setErrors] = useState<PostErrors>({});
    const navigate = useNavigate();

    useEffect(() => {
        if (id) {
            axiosClient.get(`/api/posts/${id}`)
                .then((res) => {
                    setFormData(res.data.data);
                })
                .catch((err: any) => {
                    if (err.response && err.response.data) {
                        setErrors(err.response.data.message);
                    } else {
                        setErrors({ message: "Erreur de récupération."});
                    }
                })
        }
    }, [id]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    }

    const handleReset = () => {
        setFormData({
            title: "",
            content: "",
            author: "",
            date: "",
            status: true
        });
        setErrors({});
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            if (updating) {
                await axiosClient.patch(`/api/posts/${id}`, formData);
            } else {
                await axiosClient.post("/api/posts", formData);
            }
            navigate("/posts");
        } catch (error: any) {
            setFailed(true);
            if (error.response && error.response.data) {
                setErrors(error.response.data.message);
            } else {
                setErrors({ message: "Erreur lors de la création du post." });
            }
            console.error('Erreur de création du post: ', error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <PageTitle title={`${updating ? 'Modifier' : 'Ajouter'} un post`} />
            <Breadcrumb items={breadcrumbItems} />

            <div className="max-w-md mx-auto space-y-4 bg-white rounded-lg shadow-md border border-gray-200">
                <div className='mt-3'>
                    <h2 className='text-xl font-semibold text-center text-gray-700'>Ajouter un post</h2>
                    <p className='text-gray-500 text-center text-sm mt-2'>Entrez les informations ci-dessous</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4 px-6 py-4 border-t border-t-gray-300">
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
                        {errors?.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="content" className="block text-sm font-semibold text-gray-700">
                            Contenu
                        </label>
                        <textarea
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            rows={2}
                            className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                            {...{ style: { resize: 'none' } }}
                        />
                        {errors?.content && <p className="text-red-500 text-xs mt-1">{errors.content}</p>}
                    </div>

                    <div>
                        <label htmlFor="author" className="block text-sm font-semibold text-gray-700">
                            Auteur
                        </label>
                        <input
                            type="text"
                            name="author"
                            value={formData.author}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                        {errors?.title && <p className="text-red-500 text-xs mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label htmlFor="date" className="block text-sm font-semibold text-gray-700">
                            Date de publication
                        </label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleChange}
                            className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                        />
                        {errors?.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
                    </div>

                    <div>
                        <label htmlFor="status" className="block text-sm font-semibold text-gray-700">
                            Statut
                        </label>
                        <select 
                            name="status"
                            value={formData.status ? 'true' : 'false'}
                            onChange={(e) => setFormData((prev) => ({ ...prev, status: e.target.value === 'true' }))}
                            className="mt-1 p-2 block w-full border rounded-sm border-gray-300 shadow-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 sm:text-sm"
                            required
                        >
                            <option value="true">Actif</option>
                            <option value="false">Inactif</option>
                        </select>
                    </div>

                    <div className="mt-8 flex justify-end gap-8">
                        <button
                            type="button"
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

            {failed && (
                <Dialog title="Échec de l'opération !" onClose={() => setFailed(false)}>
                    <p className='text-gray-700 text-sm'>Une erreur s'est produite lors de la suppression du post. Veuillez réessayer.</p>
                    <div className='mt-2'>
                        <p className='text-xs text-gray-700'>Assurez-vous que :</p>
                        <ul className="mt-2 list-disc list-inside text-xs text-orange-700">
                            <li>Tous les champs soient remplis</li>
                            <li>Le tire du post soit unique</li>
                        </ul>
                    </div>
                    <hr className='mt-4 -mb-1 text-gray-300' />
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

export default FormPost;
