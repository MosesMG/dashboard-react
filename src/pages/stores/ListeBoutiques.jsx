import { useEffect, useState } from "react";
import PageTitle from "../../components/ui/PageTitle";
import axiosClient from "../../api/axios";
import Breadcrumb from "../../components/ui/BreadCrumb";
import Modal from "../../components/ui/Modal";
import DeleteForm from "./DeleteForm";
import AddStore from "./AddStore";
import EditStore from "./EditStore";

const ListeBoutiques = () => {
    const breadCrumbItems = [
        { name: 'Accueil', link: '/accueil' },
        { name: 'Boutiques' }
    ];

    const [boutiques, setBoutiques] = useState([]);

    const [showAddForm, setShowAddForm] = useState(false);

    const [edited, setEdited] = useState(null);
    const [showEditForm, setShowEditForm] = useState(false);
    
    const [btqId, setBtqId] = useState(null);
    const [btqName, setBtqName] = useState(null);
    const [showModalForm, setShowModalForm] = useState(false);

    const fectchBoutiques = async () => {
        await axiosClient.get('/api/boutiques')
            .then(res => {
                setBoutiques(res.data)
            })
            .catch(err => {
                console.log('Erreur: ', err)
            })
    };

    const handleSuccess = () => {
        fectchBoutiques();
        if (showModalForm === true) {
            setShowModalForm(false);
        }
        if (showAddForm === true) {
            setShowAddForm(false);
        }
        if (showEditForm === true) {
            setShowEditForm(false);
        }
    }

    useEffect(() => {
        fectchBoutiques();
    }, []);

    const editForm = (id) => {
        setEdited(id);
        setShowEditForm(true);
    }

    const deleteForm = (id, name) => {
        setBtqId(id);
        setBtqName(name);
        setShowModalForm(true);
    }

    return (
        <>
            <PageTitle title="Les boutiques" />

            <Breadcrumb items={breadCrumbItems} />

            <section>
                <div className="mb-4 flex justify-between items-center">
                    <div className="ms-12">
                        <h1 className="text-2xl font-bold text-gray-800">Liste des boutiques</h1>
                        <p className="mt-2 text-sm text-gray-600">Total: {boutiques.length} boutiques</p>
                    </div>

                    <button type="button" onClick={() => setShowAddForm(true)}
                            className="px-4 py-2 me-32 text-white text-sm font-semibold bg-blue-400 rounded-3xl hover:cursor-pointer">
                        <i className="fa fa-plus me-2"></i>
                        Ajouter une boutique
                    </button>
                </div>

                <div className="overflow-x-auto mt-12 mb-6 flex justify-center">
                    <table className="min-w-5xl bg-white divide-y border border-gray-300 shadow-md">
                        <thead className="bg-gray-100 text-gray-800">
                            <tr className="uppercase">
                                <th className="px-6 py-3 font-semibold text-left">Id</th>
                                <th className="px-6 py-3 font-semibold text-left">Nom de la boutique</th>
                                <th className="px-6 py-3 font-semibold text-left">Responsable</th>
                                <th className="px-6 py-3 font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-300">
                            {boutiques.map(btiq =>
                                <tr key={btiq.id} className="hover:bg-gray-50">
                                    <td className="px-6 py-3 text-sm text-gray-900">{btiq.id}</td>
                                    <td className="px-6 py-3 text-sm text-gray-900">{btiq.nom}</td>
                                    <td className="px-6 py-3 text-sm text-gray-900">{btiq.responsable}</td>
                                    <td className="px-6 py-2">
                                        <div className="flex justify-center gap-8 text-xs">
                                            <button type="button" onClick={() => editForm(btiq.id)}
                                                className="bg-green-500 w-8 h-7 rounded-sm text-white">
                                                <i className="fa fa-pen"></i>
                                            </button>
                                            <button type="button" onClick={() => deleteForm(btiq.id, btiq.nom)}
                                                    className="bg-red-500 w-8 h-7 rounded-sm text-white">
                                                <i className="fa fa-trash-alt"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>

            {showAddForm &&
                <Modal title="Ajouter une boutique" onClose={() => setShowAddForm(false)}>
                    <AddStore onCancel={() => setShowAddForm(false)} onSuccess={handleSuccess} />
                </Modal>
            }

            {showEditForm &&
                <Modal title="Éditer les infos de la boutique" onClose={() => setShowEditForm(false)}>
                    <EditStore id={edited} onCancel={() => setShowEditForm(false)} onSuccess={handleSuccess} />
                </Modal>
            }

            {showModalForm &&
                <Modal title="Confirmer la suppression" onClose={() => setShowModalForm(false)}>
                    <DeleteForm id={btqId} name={btqName} onCancel={() => setShowModalForm(false)} onSuccess={handleSuccess} />
                </Modal>
            }
        </>
    );
}

export default ListeBoutiques;
