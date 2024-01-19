import { Timestamp } from "firebase/firestore";
import { SelectLab } from ".";

export enum UpdateActions {
  ADD = "ADD",
  DELETE = "DELETE",
}
export interface AddStoreChemicalRequest {
  name: string;
  quantity: string;
  units: string;
  timestamp: Date;
  action: UpdateActions;
  mfgDate: Date;
  expDate?: Date;
  cost: string;
}

export interface ChemicalResponseLog {
  quantity: string;
  timestamp: Timestamp;
  action: UpdateActions;
  lab?: string;
}

export interface Chemical {
  id: string;
  name: string;
  formula: string;
  quantity: string;
  logs: ChemicalLogUI[];
}

export interface ChemicalLogUI {
  date: string;
  time: string;
  action: UpdateActions;
  quantity: string;
  lab?: string;
}

export interface UpdateStoreChemicalRequest {
  id: string;
  action: UpdateActions;
  quantity: string;
  remainingQuantity: string;
  timestamp: Date;
  lab?: SelectLab;
  name: string;
  formula: string;
}

export enum Sort {
  INCREASE,
  DECREASE,
}
