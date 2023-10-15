export interface addStoreChemicalRequest {
  name: string;
  formula: string;
  quantity: string;
  timestamp: Date;
  action: "ADD" | "DELETE";
}
