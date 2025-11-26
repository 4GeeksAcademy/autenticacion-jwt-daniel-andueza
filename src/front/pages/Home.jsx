import React from "react";

export const Home = () => {
	return (
		<div className="container mt-5 text-center">
			<h1 className="mb-4">Bienvenido</h1>

			<p className="lead">
				Esta es una app con autenticación JWT (React + Flask).
			</p>

			<p className="text-muted">
				Usa el menú para registrarte o iniciar sesión.
			</p>
		</div>
	);
};
