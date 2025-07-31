import axiosClient from "../../api/axios";

const DeleteForm = ({ id, name, onCancel }) => {
    const handleDelete = async (e) => {
        e.preventDefault();

        try {
            await axiosClient.delete(`/api/boutiques/${id}`, id);
            onCancel();
        } catch (err) {
            console.error('Erreur: ', err.respnse?.data || err.message);
        }
    }

    return (
        <form onSubmit={handleDelete}>
            <div className="border-b border-gray-400 pb-3">
                <h4 className=" font-semibold">Voulez vous supprimer la 
                    boutique <span className="text-purple-900">{name}</span> ?
                </h4>
                <p className="text-sm mt-3">Celà va entraîner une suppression définitive de tout ce qui lui est relié.</p>
            </div>
            <div className="px-3 pt-3 text-sm flex items-center justify-end space-x-4">
                <button type="submit"
                        className="px-6 py-2 text-white bg-blue-400 rounded-md hover:bg-blue-600 hover:cursor-pointer transition-colors duration-300">
                    <i className="fa fa-check mr-1"></i>
                    <span className="uppercase font-semibold">Oui</span>
                </button>
                <button className="px-6 py-2 text-white bg-rose-400 rounded-md hover:bg-rose-600 hover:cursor-pointer transition-colors duration-300"
                        onClick={onCancel}>
                    <i className="fa fa-ban mr-1"></i>
                    <span className="uppercase font-semibold">Non</span>
                </button>
            </div>
        </form>
    );
}

export default DeleteForm;
