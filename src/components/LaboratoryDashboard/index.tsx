"use client";
import { Logo } from "@/assets";
import Link from "next/link";
import React, { useEffect } from "react";
import Image from "next/image";
import { LabDetails } from "./LabDetails";
import { useStore } from "@/store";
import { observer } from "mobx-react-lite";
import { getRealTimeIndividualLabUpdates } from "@/services";

const LabDashboardComp = ({ id }: { id: string }) => {
  const store = useStore();
  const isSuperUser = store.user.isSuperUser;

  useEffect(() => {
    store.individualLab.getLabDetails(id);
    // Getting real time changes from firestore chemicals collection
    const unSubscribe = getRealTimeIndividualLabUpdates(
      id,
      (val) => (store.individualLab.chemicalModel.chemicals = val)
    );
    return () => unSubscribe();
  }, []);

  useEffect(() => {
    store?.laboratory?.checkAndGetLabs();
  }, []);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(to right, #c9d6ff, #e2e2e2)" }}
    >
      <header className="flex justify-between items-center p-4 sticky top-0 bg-white border-b border-gray-300">
        <div className="flex items-center">
          <div>
            <h1 className="text-xl font-bold">{`Laboratory ${id}`}</h1>
          </div>
        </div>
        <div className="flex items-center justify-center mr-4">
          <Image src={Logo} alt="Logo" className=" h-12 w-auto" />
        </div>

        <div className="flex items-center">
          {isSuperUser && (
            <Link
              href="/users"
              className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
            >
              Users
            </Link>
          )}
          {isSuperUser && (
            <Link
              href={"/home"}
              className="bg-green-500 text-white px-4 py-2 rounded mx-2"
            >
              Store
            </Link>
          )}
          <button
            className="bg-gray-500 text-white px-2 py-2 rounded ml-2"
            onClick={() => store.user.signOut()}
          >
            Log out
          </button>
        </div>
      </header>

      <div className="flex-grow overflow-auto p-4">
        <LabDetails labId={id} />
      </div>
    </div>
  );
};

export const LabDashboard = observer(LabDashboardComp);
