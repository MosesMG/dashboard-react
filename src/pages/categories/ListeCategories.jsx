import { useEffect, useState } from "react";
import Breadcrumb from "../../components/ui/BreadCrumb";
import PageTitle from "../../components/ui/PageTitle";
import axiosClient from "../../api/axios";
import Modal from "../../components/ui/Modal";
import AddCategorie from "./AddCategorie";

const ListeCategories = () => {
    const breadcrumbItems = [
        { name: 'Accueil', link: '/accueil' },
        { name: 'Catégories' }
    ];

    const [categories, setCategories] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);

    const fetchCategories = async () => {
        await axiosClient.get('/api/categories')
            .then(res => {
                setCategories(res.data)
            })
            .catch(err => {
                console.error('Erreur: ', err);
            })
    };

    const handleSuccess = () => {
        fetchCategories();
        if (showAddForm === true) {
            setShowAddForm(false);
        }
    }

    useEffect(() => {
        fetchCategories();
    }, []);    

    return (
        <>
            <PageTitle title="Liste des catégories" />

            <Breadcrumb items={breadcrumbItems} />

            <section>
                <div className="mb-4 flex justify-between items-center">
                    <div className="ms-12">
                        <h1 className="text-2xl font-bold text-gray-800">Liste des catégories</h1>
                        <p className="mt-2 text-sm text-gray-600">Total: {categories.length} catégorie{categories.length > 1 ? 's' : ''}</p>
                    </div>

                    <button type="button" onClick={() => setShowAddForm(true)}
                            className="px-4 py-2 me-32 text-white text-sm font-semibold bg-blue-400 rounded-3xl hover:cursor-pointer">
                        <i className="fa fa-plus me-2"></i>
                        Ajouter une catégorie
                    </button>
                </div>

                <div className="overflow-x-auto mt-12 mb-6 flex justify-center">
                    <table className="min-w-full bg-white divide-y border border-gray-300 shadow-md">
                        <thead className="bg-gray-100 text-gray-800">
                            <tr className="uppercase">
                                <th className="px-6 py-3 font-semibold text-left">Id</th>
                                <th className="px-6 py-3 font-semibold text-left">Libellé</th>
                                <th className="px-6 py-3 font-semibold text-left">Description</th>
                                <th className="px-6 py-3 font-semibold text-left">Nom de la boutique</th>
                                <th className="px-6 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {categories.map((category) => (
                                <tr key={category.id}>
                                    <td className="px-6 py-3 text-sm text-gray-900">{category.id}</td>
                                    <td className="px-6 py-3 text-sm text-gray-900">{category.libelle}</td>
                                    <td className="px-6 py-3 text-sm text-gray-900">{category.description}</td>
                                    <td className="px-6 py-3 text-sm text-gray-900">{category.libelle}</td>
                                    <td className="px-6 py-2">
                                        <div className="flex justify-center items-center gap-8 text-xs">
                                            <button type="button" 
                                                className="bg-green-500 w-8 h-7 rounded-sm text-white">
                                                <i className="fa fa-pen"></i>
                                            </button>
                                            <button type="button" 
                                                    className="bg-red-500 w-8 h-7 rounded-sm text-white">
                                                <i className="fa fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>

            {showAddForm &&
                <Modal title="Ajouter une catégorie" onClose={() => setShowAddForm(false)}>
                    <AddCategorie onCancel={() => setShowAddForm(false)} onSucess={handleSuccess} />
                </Modal>
            }
        </>
    );
}

export default ListeCategories;
