import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function DefaultLayout() {
  return (
    <div>
      <div className="bg-dark text-light">
        <Header />
      </div>
      <div className="bg-light">
        <Outlet />
      </div>
      <div className="bg-dark text-light">
        <Footer />
      </div>
    </div>
  );
}
