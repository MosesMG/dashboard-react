import { useEffect, useState } from "react";

const ListeStore = () => {
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('https://jsonplaceholder.typicode.com/posts?_limit=25')
            .then((res) => res.json())
            .then((data) => setPosts(data))
    }, []);

    return (
        <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">Liste des boutiques</h1>

            <div className="overflow-x-auto my-10">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                Nom de la boutique
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                Adresse
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {posts.map((post) => (
                            <tr key={post.id}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                                    {post.title.slice(0, 30)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    {post.body.slice(0, 90)}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                                    <button className="text-blue-500 hover:text-blue-700 mr-8 hover:cursor-pointer">
                                        <i className="fas fa-edit"></i>
                                    </button>
                                    <button className="text-red-500 hover:text-red-700 hover:cursor-pointer">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListeStore;
