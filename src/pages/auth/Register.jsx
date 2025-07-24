import { Link } from "react-router-dom";
import SubmitButton from "../../components/ui/SubmitButton";
import TextInput from "../../components/ui/TextInput";

const Register = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Formulaire soumis !");
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white px-8 py-6 rounded-lg shadow-md w-full max-w-sm">
                <h3 className="text-gray-800 text-2xl font-semibold text-center">Inscription</h3>
                <p className="text-gray-600 text-sm text-center mt-2 mb-6">Créez un compte pour continuer.</p>
                <hr className="border-gray-400" />

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                        <TextInput label="Nom" type="text" key="name" required />
                        <span className="text-red-500 text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                    </div>

                    <div>
                        <TextInput label="Email" type="email" key="email" required />
                        <span className="text-red-500 text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                    </div>

                    <div>
                        <TextInput label="Mot de passe" type="password" key="password" required/>
                        <span className="text-red-500 text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                    </div>

                    <TextInput label="Confirmer le mot de passe" type="password" key="password_confirmation" required/>
                    
                    <SubmitButton action="S'inscrire" />
                </form>

                <div className="mt-4 text-xs flex items-center justify-center space-x-2">
                    <p className="text-gray-600">Vous avez déjà un compte ?</p>
                    <Link to="/login" className="text-blue-500 hover:underline">Connectez-vous</Link>
                </div>
            </div>
        </div>
    );
}

export default Register;
