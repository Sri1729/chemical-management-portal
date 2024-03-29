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
  units: string;
  quantity: string;
  overallCost: string;
  batches: Batch[];
}
export interface Batch {
  initialQuantity: string;
  quantity: string;
  cost: string;
  manufacturingDate: string;
  expiryDate?: string;
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
  mfgDate: Date;
  expDate?: Date;
  cost: string;
  batchId?: string;
  units: string;
}

export enum Sort {
  INCREASE,
  DECREASE,
}
