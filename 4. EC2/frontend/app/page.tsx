'use client'

import Login from "@/components/Login";
import OSinfo from "@/components/OSinfo";
import { useState } from "react";

export default function Home() {
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div>
      {!isLogged && <Login onLogin={() => setIsLogged(true)} />}
      {isLogged && <OSinfo />}
    </div>
  );
}
