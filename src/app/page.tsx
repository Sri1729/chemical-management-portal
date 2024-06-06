import Image from "next/image";
"use client";

import { observer } from "mobx-react-lite";
import { Login } from "@/components";

function Home() {
  return (
    <main className="">
      <Login />
    </main>
  );
}

export default observer(Home);
