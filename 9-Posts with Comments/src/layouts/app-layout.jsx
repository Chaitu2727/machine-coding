import { Outlet, useNavigation } from "react-router-dom";
import Header from "../components/Header";
const Layout = () => {
  const navigate = useNavigation();
  const isLoading = navigate.state === "loading";
  return (
    <div className="layout-container">
      Comment Section
      <Header />
      {isLoading && <div>Loading...</div>}
      <Outlet />
    </div>
  );
};

export default Layout;
