import { Link, useNavigate } from "react-router-dom";
import useGlobalReducer from "../hooks/useGlobalReducer";

export const Navbar = () => {
    const navigate = useNavigate();
    const { store, dispatch } = useGlobalReducer();

    const isLogged = store.auth.token !== null;

    const handleLogout = () => {
        sessionStorage.removeItem("token");
        dispatch({ type: "LOGOUT" });
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">

                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Home</span>
                </Link>

                <div className="d-flex gap-2">

                    {!isLogged && (
                        <>
                            <Link to="/login">
                                <button className="btn btn-success">Login</button>
                            </Link>

                            <Link to="/signup">
                                <button className="btn btn-primary">Registro</button>
                            </Link>
                        </>
                    )}

                    {isLogged && (
                        <>
                            <button
                                className="btn btn-outline-primary"
                                onClick={() => navigate("/private")}
                            >
                                Perfil
                            </button>

                            <button
                                className="btn btn-danger"
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </>
                    )}

                </div>
            </div>
        </nav>
    );
};
