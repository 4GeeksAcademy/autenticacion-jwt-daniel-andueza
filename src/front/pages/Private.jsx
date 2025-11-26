import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const token = sessionStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        const loadUser = async () => {
            try {
                const res = await fetch(
                    import.meta.env.VITE_BACKEND_URL + "/api/private",
                    {
                        method: "GET",
                        headers: {
                            "Authorization": "Bearer " + token
                        }
                    }
                );

                if (!res.ok) {
                    navigate("/login");
                    return;
                }

                const data = await res.json();
                setUser(data.user);

            } catch (e) {
                navigate("/login");
            }
        };

        loadUser();
    }, []);

    return (
        <div className="container mt-5 text-center">
            <h1>Bienvenido</h1>
            {!user && <p>Cargando...</p>}
            {user && <p>Hola {user.email} 👋</p>}
        </div>
    );
};
