"use client";

import { useEffect, useState } from "react";
import VLibras from "@djpfs/react-vlibras";

export default function VLibrasContainer() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return <VLibras forceOnload={true} />;
}