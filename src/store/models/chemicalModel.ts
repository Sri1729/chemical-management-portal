import { Chemical, Sort } from "@/types";
import { makeAutoObservable, runInAction } from "mobx";

export interface newChemicalError {
  name: string;
  quantity: string;
  units: string;
  cost: string;
  manufactureDate: string;
  expiryDate: string;
}

export interface updateChemicalError {
  quantity: string;
  lab: string;
}

export const qunatity_units = ["kg", "g", "lt", "ml"];

export class ChemicalModel {
  constructor() {
    makeAutoObservable(this);
  }

  private _chemicals: Chemical[] = [];
  private _newChemicalName: string = "";
  private _newChemicalCost: string = "";
  private _newChemicalDate: string = new Date().toISOString().split("T")[0];
  private _newChemicalMfgDate: string = "";
  private _newChemicalExpDate: string = "";
  private _newChemicalShowExpDate: boolean = false;
  private _newChemicalTime: string = "09:00";
  private _newChemicalQuantity: string = "";
  private _newChemicalQunatityUnit: string = "";
  private _newChemicalModalOpen: boolean = false;
  private _newChemicalAddLoading: boolean = false;
  private _newChemicalError: newChemicalError = {
    name: "",
    quantity: "",
    units: "",
    cost: "",
    expiryDate: "",
    manufactureDate: "",
  };
  private _updateChemicalError: updateChemicalError = {
    lab: "",
    quantity: "",
  };
  private _updateChemicalLoading: boolean = false;
  private _selectedChemical: Chemical | null = null;

  private _updateChemicalQuantity: string = "";
  private _updateChemicalDate: string = new Date().toISOString().split("T")[0];
  private _updateChemicalTime: string = "09:00";
  private _updateChemicalLab: string = "";
  private _showRemoveChemicalModal: boolean = false;
  private _showAddChemicalModal: boolean = false;
  private _showViewChemicalLogModal: boolean = false;

  private _searchText: string = "";
  private _sortBy: Sort = Sort.INCREASE;

  public get chemicals(): Chemical[] {
    let chemicalsArray: Chemical[];
    if (this.searchText) {
      chemicalsArray = this._chemicals.filter(
        (item: Chemical) =>
          item.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          item.formula.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      chemicalsArray = this._chemicals;
    }
    return chemicalsArray.slice().sort((a, b) => {
      return this._sortBy === Sort.DECREASE
        ? Number(a.quantity) - Number(b.quantity)
        : Number(b.quantity) - Number(a.quantity);
    });
  }
  public set chemicals(_val) {
    runInAction(() => {
      this._chemicals = _val;
    });
  }

  // new chemical add modal methods
  public set newChemicalName(val: string) {
    runInAction(() => {
      this._newChemicalName = val;
      this._newChemicalError = { ...this._newChemicalError, name: "" };
    });
  }
  public get newChemicalName() {
    return this._newChemicalName;
  }

  public set newChemicalCost(val: string) {
    runInAction(() => {
      this._newChemicalCost = val;
      this._newChemicalError = { ...this._newChemicalError, cost: "" };
    });
  }
  public get newChemicalCost() {
    return this._newChemicalCost;
  }

  public set newChemicalDate(val: string) {
    runInAction(() => {
      this._newChemicalDate = val;
    });
  }
  public get newChemicalDate() {
    return this._newChemicalDate;
  }

  public set newChemicalMfgDate(val: string) {
    runInAction(() => {
      this._newChemicalMfgDate = val;
      this._newChemicalError = {
        ...this._newChemicalError,
        manufactureDate: "",
      };
    });
  }
  public get newChemicalMfgDate() {
    return this._newChemicalMfgDate;
  }

  public set newChemicalExpDate(val: string) {
    runInAction(() => {
      this._newChemicalExpDate = val;
      this._newChemicalError = { ...this._newChemicalError, expiryDate: "" };
    });
  }
  public get newChemicalExpDate() {
    return this._newChemicalExpDate;
  }

  public set newChemicalShowExpDate(val: boolean) {
    runInAction(() => {
      this._newChemicalShowExpDate = val;
      this._newChemicalError = { ...this._newChemicalError, expiryDate: "" };
    });
  }
  public get newChemicalShowExpDate() {
    return this._newChemicalShowExpDate;
  }

  public set newChemicalTime(val: string) {
    runInAction(() => {
      this._newChemicalTime = val;
    });
  }
  public get newChemicalTime() {
    return this._newChemicalTime;
  }

  public set newChemicalQuantity(val: string) {
    runInAction(() => {
      this._newChemicalQuantity = val;
      this._newChemicalError = { ...this._newChemicalError, quantity: "" };
    });
  }

  public get newChemicalQuantity() {
    return this._newChemicalQuantity;
  }

  public set newChemicalQunatityUnit(val: string) {
    runInAction(() => {
      this._newChemicalQunatityUnit = val;
      this._newChemicalError = { ...this._newChemicalError, units: "" };
    });
  }

  public get newChemicalQunatityUnit() {
    return this._newChemicalQunatityUnit;
  }

  public set newChemicalModalOpen(val: boolean) {
    runInAction(() => {
      this._newChemicalModalOpen = val;
    });
  }
  public get newChemicalModalOpen() {
    return this._newChemicalModalOpen;
  }

  public set newChemicalAddLoading(val: boolean) {
    runInAction(() => {
      this._newChemicalAddLoading = val;
    });
  }
  public get newChemicalAddLoading() {
    return this._newChemicalAddLoading;
  }

  public get newChemicalError() {
    return this._newChemicalError;
  }
  public set newChemicalError(val) {
    runInAction(() => {
      this._newChemicalError = val;
    });
  }

  public set updateChemicalDate(_val: string) {
    runInAction(() => {
      this._updateChemicalDate = _val;
    });
  }
  public get updateChemicalDate(): string {
    return this._updateChemicalDate;
  }

  public set updateChemicalTime(_val: string) {
    runInAction(() => {
      this._updateChemicalTime = _val;
    });
  }
  public get updateChemicalTime(): string {
    return this._updateChemicalTime;
  }

  public set updateChemicalQuantity(_val: string) {
    runInAction(() => {
      this._updateChemicalQuantity = _val;
      this._updateChemicalError = {
        ...this._updateChemicalError,
        quantity: "",
      };
    });
  }
  public get updateChemicalQuantity(): string {
    return this._updateChemicalQuantity;
  }

  public set updateChemicalLab(_val: string) {
    runInAction(() => {
      this._updateChemicalLab = _val;
      this._updateChemicalError = {
        ...this._updateChemicalError,
        lab: "",
      };
    });
  }
  public get updateChemicalLab(): string {
    return this._updateChemicalLab;
  }

  public set showRemoveChemicalModal(_val: boolean) {
    runInAction(() => {
      this._showRemoveChemicalModal = _val;
    });
  }
  public get showRemoveChemicalModal(): boolean {
    return this._showRemoveChemicalModal;
  }

  public set showAddChemicalModal(_val: boolean) {
    runInAction(() => {
      this._showAddChemicalModal = _val;
    });
  }
  public get showAddChemicalModal(): boolean {
    return this._showAddChemicalModal;
  }

  public set selectedChemical(_val: Chemical) {
    runInAction(() => {
      this._selectedChemical = _val;
    });
  }
  public get selectedChemical(): Chemical | null {
    return this._selectedChemical;
  }

  public set showViewChemicalLogModal(_val: boolean) {
    runInAction(() => {
      this._showViewChemicalLogModal = _val;
    });
  }
  public get showViewChemicalLogModal(): boolean {
    return this._showViewChemicalLogModal;
  }

  public get updateChemicalError(): updateChemicalError {
    return this._updateChemicalError;
  }
  public set updateChemicalError(_val) {
    runInAction(() => {
      this._updateChemicalError = _val;
    });
  }

  public set updateChemicalLoading(_val: boolean) {
    runInAction(() => {
      this._updateChemicalLoading = _val;
    });
  }
  public get updateChemicalLoading(): boolean {
    return this._updateChemicalLoading;
  }

  public set searchText(_val: string) {
    runInAction(() => {
      this._searchText = _val;
    });
  }
  public get searchText(): string {
    return this._searchText;
  }

  public alterSortBy() {
    let _val: Sort;
    if (this._sortBy === Sort.DECREASE) {
      _val = Sort.INCREASE;
    } else {
      _val = Sort.DECREASE;
    }
    runInAction(() => {
      this._sortBy = _val;
    });
  }
  public get sortBy(): Sort {
    return this._sortBy;
  }

  public resetValues() {
    runInAction(() => {
      this._newChemicalName = "";
      this._newChemicalQuantity = "";
      this._newChemicalQunatityUnit = "";
      this._newChemicalDate = new Date().toISOString().split("T")[0];
      this._newChemicalTime = "09:00";
      this._newChemicalCost = "";

      this._updateChemicalDate = new Date().toISOString().split("T")[0];
      this._updateChemicalTime = "09:00";
      this._updateChemicalQuantity = "";
      this._updateChemicalLab = "";
    });
  }
}
