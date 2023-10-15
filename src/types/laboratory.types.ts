import { Timestamp } from "firebase/firestore";

export interface Laboratory {
  id: string;
  name: string;
  roomNumber: string;
  createdBy: string;
  createdAt: Timestamp;
}
export interface LaboratoryUI {
  id: string;
  name: string;
  roomNumber: string;
  createdBy: string;
  createdAt: string;
}

export interface CreateLab {
  id: string;
  name: string;
  roomNumber: string;
  createdBy: string;
  createdAtDate: string;
  createdAtTime: string;
}
