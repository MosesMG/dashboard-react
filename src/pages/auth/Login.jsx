import { Link, useLocation } from "react-router-dom";
import TextInput from "../../components/ui/TextInput";
import SubmitButton from "../../components/ui/SubmitButton";

const Login = () => {
    // const location = useLocation();
    // const from = location.state?.from?.pathname || '/accueil';

    // login(userData);
    // navigate(from, { replace: true });

    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Formulaire soumis !");
    }

    return (
        <div className="bg-gray-100 min-h-screen flex items-center justify-center">
            <div className="bg-white px-8 py-6 rounded-lg shadow-md w-full max-w-sm">
                <h3 className="text-gray-800 text-2xl font-semibold text-center">Connexion</h3>
                <p className="text-gray-600 text-sm text-center mt-2 mb-6">Connectez-vous à votre compte.</p>
                <hr className="border-gray-400" />

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    <div>
                        <TextInput label="Email" type="email" key="email" required />
                        <span className="text-red-500 text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                    </div>

                    <div>
                        <TextInput label="Mot de passe" type="password" key="password" required/>
                        <span className="text-red-500 text-xs">Lorem ipsum dolor sit, amet consectetur adipisicing elit.</span>
                    </div>

                    <SubmitButton action="Se connecter" />
                </form>

                <div className="mt-4 text-xs flex items-center justify-center space-x-2">
                    <p className="text-gray-600">Vous n'avez pas de compte ?</p>
                    <Link to="/register" className="text-blue-500 hover:underline">Inscrivez-vous</Link>
                </div>
            </div>
        </div>
    );
}

export default Login;
