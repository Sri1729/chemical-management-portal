"use client";
import React, { useEffect } from "react";
import { ChemicalTable } from "../Common/ChemicalTable";
import Image from "next/image";
import { Logo } from "@/assets";
import Link from "next/link";
import { useStore } from "@/store";
import { getRealTimeUpdates } from "@/services";

export const SuperUserDashboard = () => {
  const store = useStore();

  useEffect(() => {
    // Getting real time changes from firestore chemicals collection
    const unSubscribe = getRealTimeUpdates(
      (val) => (store.chemicals.chemicals = val)
    );
    return () => unSubscribe();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to right, #c9d6ff, #e2e2e2)" }}
    >
      <header className="flex justify-between items-center p-4 sticky top-0 bg-white border-b border-gray-300">
        <div className="flex items-center">
          <div>
            <h1 className="text-xl font-bold">Store Management</h1>
          </div>
        </div>
        <div className="flex items-center justify-center mr-4">
          <Image src={Logo} alt="Logo" className=" h-12 w-auto" />
        </div>
        <div className="flex items-center">
          <Link
            href="/users"
            className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
          >
            Users
          </Link>
          <Link
            href={"/laboratory/all"}
            className="bg-green-500 text-white px-4 py-2 rounded mx-2"
          >
            Labs
          </Link>
        </div>
      </header>

      <div className="flex-grow overflow-auto p-4">
        <ChemicalTable />
      </div>
    </div>
  );
};

export default SuperUserDashboard;
