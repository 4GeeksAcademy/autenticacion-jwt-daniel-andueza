import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Login = () => {
    const navigate = useNavigate();
    const { dispatch } = useGlobalReducer();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");

        try {
            const resp = await fetch(import.meta.env.VITE_BACKEND_URL + "/api/token", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!resp.ok) {
                const err = await resp.json().catch(() => ({}));
                setErrorMsg(err.msg || "Credenciales incorrectas");
                return;
            }

            const data = await resp.json();

            sessionStorage.setItem("token", data.token);

            dispatch({
                type: "LOGIN",
                payload: { token: data.token, user: { email } }
            });

            navigate("/private");

        } catch (error) {
            setErrorMsg("Error al conectar con el servidor");
        }
    };

    return (
        <div className="container mt-5 text-center">
            <h1>Iniciar Sesión</h1>

            <form className="col-4 mx-auto" onSubmit={handleLogin}>
                <input
                    className="form-control mt-3"
                    type="email"
                    placeholder="Correo electrónico"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <input
                    className="form-control mt-3"
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                {/* Mensaje de error */}
                {errorMsg && <p className="text-danger mt-2">{errorMsg}</p>}

                <button className="btn btn-success mt-4" type="submit">
                    Entrar
                </button>
            </form>
        </div>
    );
};
