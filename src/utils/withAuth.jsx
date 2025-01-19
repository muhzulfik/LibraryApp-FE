import { useEffect } from "react";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const withAuth = (WrappedComponent) => {
	const AuthenticatedComponent = (props) => {
		const navigate = useNavigate();

		const authToken = Cookies.get("authToken");

		// Cek status autentikasi atau token di sini;
		const isAuthenticated = authToken ? true : false; // Ganti dengan logika autentikasi sesuai kebutuhan
		useEffect(() => {
			if (!isAuthenticated) {
				// Jika pengguna tidak terautentikasi, redirect ke halaman login
				navigate("/");
			}
		}, [isAuthenticated, navigate]);

		// Render komponen yang sudah ditingkatkan jika pengguna terautentikasi
		return isAuthenticated ? <WrappedComponent {...props} /> : null;
	};

	return AuthenticatedComponent;
};

export default withAuth;
