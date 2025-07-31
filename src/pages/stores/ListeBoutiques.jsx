import { useEffect, useState } from "react";
import PageTitle from "../../components/ui/PageTitle";
import axiosClient from "../../api/axios";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/ui/BreadCrumb";
import Modal from "../../components/ui/Modal";
import DeleteForm from "./DeleteForm";

const ListeBoutiques = () => {
    const [boutiques, setBoutiques] = useState([]);

    useEffect(() => {
        axiosClient.get('/api/boutiques')
            .then(res => {
                setBoutiques(res.data)
            })
            .catch(err => {
                console.log('Erreur: ', err)
            })
    }, [boutiques]);

    const breadCrumbItems = [
        { name: 'Accueil', link: '/accueil' },
        { name: 'Boutiques' }
    ];

    const [showModalForm, setShowModalForm] = useState(false);
    const [btqId, setBtqId] = useState(null);
    const [btqName, setBtqName] = useState(null);

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
                    <h1 className="text-2xl font-bold text-gray-800 ms-12">Liste des boutiques</h1>

                    <Link className="px-4 py-2 me-32 text-white text-sm font-semibold bg-blue-400 rounded-3xl">
                        <i className="fa fa-plus me-2"></i>
                        Ajouter une boutique
                    </Link>
                </div>

                <div className="overflow-x-auto mt-12 mb-6 flex justify-center">
                    <table className="min-w-5xl bg-white divide-y border border-gray-300 shadow-sm">
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
                                            <button className="bg-green-500 w-8 h-7 rounded-sm text-white">
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

            {showModalForm &&
                <Modal title="Confirmer la suppression" onClose={() => setShowModalForm(false)}>
                    <DeleteForm id={btqId} name={btqName} onCancel={() => setShowModalForm(false)} />
                </Modal>
            }
        </>
    );
}

export default ListeBoutiques;
