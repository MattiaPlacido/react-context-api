import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function AlternativeLayout() {
  return (
    <div>
      <div className="bg-light text-dark">
        <Header />
      </div>
      <div className="bg-dark">
        <Outlet />
      </div>
      <div className="bg-light text-dark">
        <Footer />
      </div>
    </div>
  );
}
