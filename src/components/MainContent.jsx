import { Outlet } from "react-router-dom";
import { Footer } from "./Footer";
import { useMediaQuery } from "@mui/material";
import { useEffect, useRef, useState } from "react";

const MainContent = () => {
  const [height, setHeight] = useState(0);
  const outletRef = useRef(null);
  
  useEffect(() => {
    if (outletRef.current) {
      setHeight(outletRef.current.clientHeight);
    }
  }, []);

  const isMobile = useMediaQuery("(max-width:600px)"); // Adjust the value as needed

  const containerStyle = {
    marginLeft: isMobile ? "0" : "240px",
    width: isMobile ? "100%" : "calc(100% - 240px)",
    display: "flex",
    minHeight: "90vh",
    flexDirection: "column" 
  };

  return (
    <div style={containerStyle}>
      <div className="content" style={{flex: 1}}>
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default MainContent;
