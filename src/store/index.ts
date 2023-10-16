"use client";
import { signIn, isSuperUser } from "@/services";
import { makeAutoObservable } from "mobx";
import React from "react";
import { User } from "./user";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Chemicals } from "./chemicals";
import { Laboratory } from "./laboratory";
import { IndividualLab } from "./individuaLab";

export class Root {
  public user: User;
  public chemicals: Chemicals;
  public laboratory: Laboratory;
  public individualLab: IndividualLab;

  constructor() {
    makeAutoObservable(this);
    this.user = new User(this);
    this.chemicals = new Chemicals(this);
    this.laboratory = new Laboratory(this);
    this.individualLab = new IndividualLab();
  }

  public setNavigationRoute = (router: AppRouterInstance) => {
    this.user.router = router;
  };
}

const store = new Root();

const StoreContext = React.createContext<Root>(store);

/* Hook to use store */
export const useStore = () => React.useContext(StoreContext);
