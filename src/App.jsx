import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutDashboard from "./components/organism/LayoutDashboard";
// import withAuth from "./utils/withAuth";
import LoginPage from "./components/pages/Login";
import MasterBukuPage from "./components/pages/MasterBuku";
import withAuth from "./utils/withAuth";
import MasterMahasiswaPage from "./components/pages/MasterMahasiswa";
import HistoryPeminjamanPage from "./components/pages/HistoryPeminjaman";
import InventoryBukuPage from "./components/pages/InventoryBuku";
import TransaksiPeminjamanPage from "./components/pages/TransaksiPeminjaman";

const AuthLayoutDashboard = withAuth(LayoutDashboard);

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<LoginPage />} />
				<Route element={<LayoutDashboard />}>
					<Route path="/master-buku" element={<MasterBukuPage />} />
					<Route path="/master-mahasiswa" element={<MasterMahasiswaPage />} />
					<Route
						path="/history-peminjaman"
						element={<HistoryPeminjamanPage />}
					/>
					<Route path="/inventory-buku" element={<InventoryBukuPage />} />
					<Route
						path="/transaksi-peminjaman"
						element={<TransaksiPeminjamanPage />}
					/>
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
