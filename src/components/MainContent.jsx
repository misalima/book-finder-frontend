import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";

const MainContent = () => {
  return (
    <div style={{ marginLeft: "240px", width: "calc(100% - 240px)" }}>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainContent;
