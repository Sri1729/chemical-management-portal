"use client";
import { Logo } from "@/assets";
import Link from "next/link";
import React from "react";
import Image from "next/image";
import { LabDetails } from "./LabDetails";

export const LabDashboard = ({ id }: { id: string }) => {
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
          <Link
            href="/users"
            className="bg-blue-500 text-white px-4 py-2 rounded mx-2"
          >
            Users
          </Link>
          <Link
            href={"/home"}
            className="bg-green-500 text-white px-4 py-2 rounded mx-2"
          >
            Store
          </Link>
        </div>
      </header>

      <div className="flex-grow overflow-auto p-4">
        <LabDetails labId={id} />
      </div>
    </div>
  );
};