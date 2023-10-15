"use client";
import { signIn, isSuperUser } from "@/services";
import { makeAutoObservable } from "mobx";
import React from "react";
import { User } from "./user";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Chemicals } from "./chemicals";

export class Root {
  public user: User = new User();
  public chemicals: Chemicals = new Chemicals();

  constructor() {
    makeAutoObservable(this);
  }

  public setNavigationRoute = (router: AppRouterInstance) => {
    this.user.router = router;
  };
}

const store = new Root();

const StoreContext = React.createContext<Root>(store);

/* Hook to use store */
export const useStore = () => React.useContext(StoreContext);
