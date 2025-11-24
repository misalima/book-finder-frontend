"use client";
import { useEffect, useState } from "react";
import VLibrasWidget from "vlibras-nextjs";

export default function VLibras() {
  const [vlibrasLoaded, setVlibrasLoaded] = useState(false);

  useEffect(() => {
    setVlibrasLoaded(true);
  }, []);

  return (
    <>
      {vlibrasLoaded && <VLibrasWidget forceOnload />}
    </>
  );
}
