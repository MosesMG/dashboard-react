import React, { useState } from "react";
import PageTitle from "../../components/ui/PageTitle";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, LogIn } from "lucide-react";

interface Credentials {
    email: string;
    password: string;
}

const Login: React.FC = () => {
    const { login, loading } = useAuth();

    const [form, setForm] = useState<Credentials>({
        email: '', password: ''
    });
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const [errors, setErrors] = useState<string>("");

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors("");

        try {
            await login(form.email, form.password);
            navigate("/accueil");
        } catch (err) {
            // setErrors((err as Error).message.valueOf());
            // console.error(err?.message?.toString());
            // setErrors((err as Error).message);
            const message = (err as Error);
            console.error(message);
            setErrors(message.message);
            console.log(message.message);
        }
    }

    return (
        <>
            <PageTitle title="Connexion" />

            <div className="bg-white px-8 py-6 rounded-lg shadow-md w-full max-w-sm">
                <h3 className="text-gray-800 text-2xl font-semibold text-center">Connexion</h3>
                <p className="text-gray-600 text-sm text-center mt-2 mb-6">Connectez-vous à votre compte.</p>
                <hr className="border-gray-400" />

                <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                    {errors && <p className="text-red-500 text-xs text-center font-semibold -mt-3">{errors}</p>}

                    <div>
                        <label
                            htmlFor="email"
                            className="block text-gray-700 text-sm font-semibold mb-1"
                        >
                            Email
                        </label>

                        <input
                            type="email"
                            value={form.email}
                            onChange={handleChange}
                            id="email" name="email"
                            className="w-full p-2 text-sm border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            required
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="password"
                            className="block text-gray-700 text-sm font-semibold mb-1"
                        >
                            Mot de passe
                        </label>

                        <div className="relative">
                            <input
                                type={!showPassword ? "password" : "text"}
                                value={form.password}
                                onChange={handleChange}
                                id="password" name="password"
                                className="w-full p-2 text-sm border border-gray-400 rounded-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                required
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 hover:cursor-pointer"
                            >
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 px-4 py-2 inline-flex justify-center items-center bg-blue-500 text-white font-semibold uppercase rounded-md shadow-sm hover:bg-blue-700 hover:cursor-pointer transition duration-200"
                    >

                        {loading ?
                            <>
                                <Loader2 size={20} className="animate-spin mr-1" />
                                Connexion...
                            </> :
                            <>
                                <LogIn size={20} className="mr-2" />
                                Se connecter
                            </>
                        }
                    </button>
                </form>

                <div className="mt-4 text-xs flex items-center justify-center space-x-2">
                    <p className="text-gray-600">Vous n'avez pas de compte ?</p>
                    <Link to="/register" className="text-blue-500 hover:underline">
                        Inscrivez-vous
                    </Link>
                </div>
            </div>
        </>
    );
}

export default Login;
