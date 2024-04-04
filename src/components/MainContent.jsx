import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { useMediaQuery } from "@mui/material";

const MainContent = () => {
  const isMobile = useMediaQuery("(max-width:600px)"); // Adjust the value as needed

  const containerStyle = {
    marginLeft: isMobile ? "0" : "240px",
    width: isMobile ? "100%" : "calc(100% - 240px)",
  };

  return (
    <div style={containerStyle}>
      <Outlet />
      <Footer />
    </div>
  );
};

export default MainContent;
