import { useEffect, useState } from "react"
import axiosClient from "../../api/axios";

const EditStore = ({ id, onCancel, onSuccess }) => {
    const [form, setForm] = useState({
        nom:'', responsable:''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    }

    useEffect(() => {
        const fetchStore = async () => {
            try {
                const result = await axiosClient.get(`/api/boutiques/${id}`);
                setForm({
                    nom: result.data.nom,
                    responsable: result.data.responsable,
                });
            } catch (err) {
                console.error('Erreur de récupération: ', err);
            }
        }

        if (id) {
            fetchStore();
        }
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await axiosClient.put(`/api/boutiques/${id}`, form);
            onSuccess();
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response?.data.errors);
            } else {
                console.error('Erreur: ', err);
            }
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mt-1 mb-6">
                <label htmlFor="nom" className="text-sm text-gray-800 font-semibold">Nom de la boutique</label>
                <input type="text" name="nom" id="nom" required onChange={handleChange} autoFocus
                    className="w-full p-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={form.nom} />
                {errors.nom &&
                    <span className="text-red-500 text-xs">
                        <i className="fa fa-exclamation-triangle mr-1"></i>{errors.nom[0]}
                    </span>
                }
            </div>

            <div className="border-b border-gray-400 pb-6 mb-1">
                <label htmlFor="responsable" className="text-sm text-gray-800 font-semibold">Responsable</label>
                <input type="text" name="responsable" id="responsable" required onChange={handleChange}
                    className="w-full p-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                    value={form.responsable} />
                {errors.responsable &&
                    <span className="text-red-500 text-xs">
                        <i className="fa fa-exclamation-triangle mr-1"></i>{errors.responsable[0]}
                    </span>
                }
            </div>

            <div className="px-3 pt-3 text-sm flex items-center justify-end space-x-4">
                <button type="submit" disabled={loading}
                    className="px-6 py-2 text-white bg-blue-400 rounded-md hover:bg-blue-600 hover:cursor-pointer transition-colors duration-300">
                    {loading ?
                        <>
                            <i className="fa fa-spinner fa-spin mr-1"></i>
                            <span className="uppercase font-semibold">Modification...</span>
                        </> :
                        <>
                            <i className="fa fa-pen-alt mr-1"></i>
                            <span className="uppercase font-semibold">Modifier</span>
                        </>}
                </button>
                <button className="px-6 py-2 text-white bg-rose-400 rounded-md hover:bg-rose-600 hover:cursor-pointer transition-colors duration-300"
                    onClick={onCancel}>
                    <i className="fa fa-ban mr-1"></i>
                    <span className="uppercase font-semibold">Annuler</span>
                </button>
            </div>
        </form>
    )
}

export default EditStore;
