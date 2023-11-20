import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';

const AuthenticationForm = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors }, getValues } = useForm();
    const [isSignUp, setIsSignUp] = useState(location.state?.isSignUp ?? true);
    const [selectedRole, setSelectedRole] = useState('jugador');
    const [error, setError] = useState(null);

    // Escucha los cambios en la ubicación y actualiza el estado isSignUp
    useEffect(() => {
        setIsSignUp(location.state?.isSignUp ?? true);
    }, [location]);

    const onSignUp = async (data) => {
        const signUpRequest = {
            username: data.username,
            email: data.email, // Asumiendo que agregas un campo de email en tu formulario
            password: data.password,
        };
    
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(signUpRequest),
            });
    
            if (response.ok) {
                if (response.headers.get("Content-Type").includes("application/json")) {
                    const jsonResponse = await response.json();
                    console.log('Username:', data.username);
                    localStorage.setItem('userId', jsonResponse.userId);
                    localStorage.setItem('username', data.username);                    
                    localStorage.setItem('token', jsonResponse.token); // Guardar el token
                }
                navigate('/RoleSelectionPage'); // Redirige a la página de elección de rol
            } else {
                const textResponse = await response.text(); // Manejar como texto plano
                setError(textResponse);
            }
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Error en la red o servidor');
        }
    };
    const onSignIn = async (data) => {
        const loginRequest = {
            username: data.username,
            password: data.password
        };
    
        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(loginRequest),
            });
    
            if (response.ok) {
                const jsonResponse = await response.json();
                localStorage.setItem('token', jsonResponse.accessToken); // Asegúrate de que el nombre de la propiedad sea correcto
                localStorage.setItem('userId', jsonResponse.userId); // Asegúrate de que el nombre de la propiedad sea correcto
                localStorage.setItem('username', jsonResponse.username); // Asegúrate de que el nombre de la propiedad sea correcto
                localStorage.setItem('userRole', jsonResponse.userRole); // Asegúrate de obtener el rol desde la respuesta
                navigate('/main'); // o alguna ruta de éxito
            } else {
                setError('Usuario o contraseña incorrectos');
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setError('Error en la red o servidor');
        }
    };
    

    const handleRoleChange = (e) => {
        setSelectedRole(e.target.value);
    };

    return (
        <div>
            <Navbar />
            <div className="flex justify-center items-center" style={{ height: 'calc(100vh - 180px)' }}>
                <div className="authentication w-full max-w-md p-4">
                    <h2 className="text-2xl font-bold mb-4">
                        {isSignUp ? (
                            <span className="text-blue-500">Sign Up</span>
                        ) : (
                            <span className="text-blue-500">Sign In</span>
                        )}
                    </h2>
                    <form onSubmit={handleSubmit(isSignUp ? onSignUp : onSignIn)}>
                        <input
                            {...register('username', { required: 'Username is required' })}
                            placeholder="Username"
                            className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500"
                        />
                        <p className="text-red-500 text-sm">{errors.username?.message}</p>
    
                        <input
                            type="password"
                            {...register('password', {
                                required: 'La contraseña es obligatoria',
                                minLength: {
                                    value: 6,
                                    message: 'La contraseña debe tener al menos 6 caracteres'
                                },
                                maxLength: {
                                    value: 20,
                                    message: 'La contraseña no debe exceder los 20 caracteres'
                                }
                            })}
                            placeholder="Password"
                            className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500"
                        />

                        <p className="text-red-500 text-sm">{errors.password?.message}</p>
    
                        {isSignUp && (
                            <>
                                <input
                                    type="email"
                                    {...register('email', {
                                        required: 'Email is required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                                            message: 'Invalid email address',
                                        },
                                    })}
                                    placeholder="Email"
                                    className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500"
                                />
                                <p className="text-red-500 text-sm">{errors.email?.message}</p>
    
                                <input
                                    type="password"
                                    {...register('confirmPassword', {
                                        required: 'Confirm Password is required',
                                        validate: {
                                            matchesPassword: value => value === getValues('password') || 'Passwords do not match',
                                        },
                                    })}
                                    placeholder="Confirm Password"
                                    className="border rounded-md p-2 mt-2 w-full focus:outline-none focus:ring focus:border-indigo-500"
                                />
                                <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
                            </>
                        )}
    
                        {error && <p className="text-red-500 text-sm">{error}</p>}
    
                        <button
                            type="submit"
                            className="bg-indigo-600 text-white rounded-md py-2 px-4 mt-4 w-full hover:bg-indigo-500 focus:outline-none focus:ring focus:border-indigo-500"
                        >
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                    </form>
    
                    <button
                        className="text-blue-500 text-sm mt-4 hover:text-blue-500 focus:outline-none w-full"
                        onClick={() => setIsSignUp(!isSignUp)}
                    >
                        {isSignUp ? 'Already have an account? Sign In' : 'Need an account? Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    );
    
};

export default AuthenticationForm;
