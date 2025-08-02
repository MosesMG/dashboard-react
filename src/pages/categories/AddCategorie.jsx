import { useState } from "react";
import axiosClient from "../../api/axios";

const AddCategorie = ({ onCancel, onSucess }) => {
    const [form, setForm] = useState({
        libelle: '',
        description: '',
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
        setErrors({ ...errors, [e.target.name]: null });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});

        try {
            await axiosClient.post('/api/categories', form);
            onSucess();
        } catch (err) {
            if (err.response?.status === 422) {
                setErrors(err.response.data.errors);
            } else {
                console.error('Erreur: ', err);
            }
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="flex flex-col space-y-5">
            <div>
                <label htmlFor="libelle" className="text-sm text-gray-800 font-semibold">Libellé</label>
                <input type="text" name="libelle" id="libelle" required onChange={handleChange}
                    className="w-full text-sm p-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"/>
                {errors.libelle &&
                    <span className="text-red-500 text-xs">
                        <i className="fa fa-exclamation-triangle mr-1"></i>{errors.libelle[0]}
                    </span>
                }
            </div>
            
            <div className="border-b border-gray-400 pb-6 mb-1">
                <label htmlFor="description" className="text-sm text-gray-800 font-semibold">Description</label>
                <input type="text" name="description" id="description" onChange={handleChange}
                    className="w-full text-sm p-2 border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"/>
                {errors.description &&
                    <span className="text-red-500 text-xs">
                        <i className="fa fa-exclamation-triangle mr-1"></i>{errors.description[0]}
                    </span>
                }
            </div>

            <div className="px-3 pt-3 text-sm flex items-center justify-end space-x-4">
                <button type="submit" disabled={loading}
                        className="px-6 py-2 text-white bg-blue-400 rounded-md hover:bg-blue-600 hover:cursor-pointer transition-colors duration-300">
                    {loading ?
                        <>
                            <i className="fa fa-spinner fa-spin mr-1"></i>
                            <span className="uppercase font-semibold">Ajout...</span>
                        </> :
                        <>
                            <i className="fa fa-plus mr-1"></i>
                            <span className="uppercase font-semibold">Ajouter</span>
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

export default AddCategorie;
