import { useEffect, useState } from "react";
import PageTitle from "../components/ui/PageTitle";
import axiosClient from "../api/axios";

const Users = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        axiosClient.get('/api/utilisateurs')
            .then(res => {
                setUsers(res.data);
            })
            .catch(err => {
                console.error('Erreur: ', err);
            })
    }, [])

    const handleClick = () => {
        alert('RIEN NE VA SE PASSER 😊');
    }
    
    return (
        <>
            <PageTitle title="Les utilisateurs" />

            <section>
                <h1 className="text-2xl font-bold text-gray-800 mb-4">Liste des utilisateurs</h1>

                <div className="overflow-x-auto rounded-sm shadow mt-8">
                    <table className="min-w-full divide-y divide-gray-400 bg-white">
                        <thead className="bg-gray-100">
                            <tr>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Id</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            {users.map(user =>
                                <tr className="hover:bg-gray-50" key={user.id}>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{user.id}</td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{user.name}</td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">{user.email}</td>
                                    <td className="px-6 py-3 whitespace-nowrap text-sm text-gray-900">
                                        <div className="space-x-3">
                                            <button type="button" onClick={handleClick}
                                                    className="px-3 py-2 rounded-md bg-blue-400 text-white text-xs hover:bg-blue-600">
                                                <i className="fa fa-pen"></i>
                                            </button>
                                            <button type="button" onClick={handleClick}
                                                    className="px-3 py-2 rounded-md bg-red-400 text-white text-xs hover:bg-red-600">
                                                <i className="fa fa-trash"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    )
}

export default Users;
