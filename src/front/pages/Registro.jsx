import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Registro = () => {
    const [form, setForm] = useState({ email: "", password: "" });
    const navigate = useNavigate();

    // Actualizar formulario
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    // Enviar datos al backend
    const handleSubmit = async (e) => {
        e.preventDefault();

        const resp = await fetch(
            import.meta.env.VITE_BACKEND_URL + "/api/signup",
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            }
        );

        if (!resp.ok) {
            alert("No se pudo crear el usuario");
            return;
        }

        navigate("/login");
    };

    return (
        <div className="container mt-5" style={{ maxWidth: "400px" }}>
            <h2 className="text-center mb-4">Crear Cuenta</h2>

            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label">Correo electrónico</label>
                    <input
                        name="email"
                        type="email"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                        name="password"
                        type="password"
                        className="form-control"
                        onChange={handleChange}
                    />
                </div>

                <button className="btn btn-primary w-100">
                    Registrarse
                </button>
            </form>
        </div>
    );
};
