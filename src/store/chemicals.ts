import { addStoreChemical, updateStoreChemicals } from "@/services";
import { Chemical, Sort, UpdateActions } from "@/types";
import { makeAutoObservable, runInAction } from "mobx";
import { Root } from ".";

interface newChemicalError {
  name: string;
  formula: string;
  quantity: string;
}

interface updateChemicalError {
  quantity: string;
  lab: string;
}

export class Chemicals {
  private _chemicals: Chemical[] = [];
  private _newChemicalName: string = "";
  private _newChemicalFormula: string = "";
  private _newChemicalDate: string = new Date().toISOString().split("T")[0];
  private _newChemicalTime: string = "09:00";
  private _newChemicalQuantity: string = "";
  private _newChemicalModalOpen: boolean = false;
  private _newChemicalAddLoading: boolean = false;
  private _newChemicalError: newChemicalError = {
    name: "",
    formula: "",
    quantity: "",
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
  constructor(rootStore: Root) {
    makeAutoObservable(this);
  }

  public onAddNewChemical = async () => {
    let error: newChemicalError = { name: "", formula: "", quantity: "" };
    if (this._newChemicalName?.length === 0) {
      error.name = "This is a mandatory field";
    }
    if (this._newChemicalFormula?.length === 0) {
      error.formula = "This is a mandatory field";
    }
    if (!this._newChemicalQuantity) {
      error.quantity = "This is a mandatory field";
    }
    if (!error.name && !error.formula && !error.quantity) {
      try {
        this.newChemicalAddLoading = true;
        await addStoreChemical({
          name: this._newChemicalName,
          formula: this._newChemicalFormula,
          timestamp: new Date(
            `${this._newChemicalDate}T${this._newChemicalTime}`
          ),
          quantity: this._newChemicalQuantity,
          action: UpdateActions.ADD,
        });
        this.newChemicalModalOpen = false;
        this.newChemicalAddLoading = false;
      } catch (e) {
        this.newChemicalAddLoading = true;
      }
    } else {
      runInAction(() => {
        this._newChemicalError = error;
      });
    }
  };

  public onUpdateChemical = async (action: UpdateActions) => {
    let error: updateChemicalError = { lab: "", quantity: "" };
    if (!this.updateChemicalQuantity) {
      error.quantity = "This is a mandatory field";
    }
    if (!this.updateChemicalLab && action === UpdateActions.DELETE) {
      error.lab = "This is a mandatory field";
    }
    if (
      !error.quantity &&
      (action === UpdateActions.DELETE ? !error.lab : true)
    ) {
      try {
        this.updateChemicalLoading = true;
        const quantity = this.updateChemicalQuantity;
        let remQuantity = this?.selectedChemical?.quantity;
        if (action === UpdateActions.ADD) {
          remQuantity = `${Number(remQuantity) + Number(quantity)}`;
        } else {
          remQuantity = `${Number(remQuantity) - Number(quantity)}`;
        }

        await updateStoreChemicals({
          action: action,
          id: this.selectedChemical?.id || "",
          quantity: this.updateChemicalQuantity,
          remainingQuantity: remQuantity,
          timestamp: new Date(
            `${this.updateChemicalDate}T${this.updateChemicalTime}`
          ),
          lab: this._updateChemicalLab,
        });
        this.updateChemicalLoading = false;
        this.showAddChemicalModal = false;
        this.showRemoveChemicalModal = false;
      } catch (e) {
        this.updateChemicalLoading = false;
      }
    } else {
      runInAction(() => {
        this._updateChemicalError = error;
      });
    }
  };

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

  public set newChemicalFormula(val: string) {
    runInAction(() => {
      this._newChemicalFormula = val;
      this._newChemicalError = { ...this._newChemicalError, formula: "" };
    });
  }
  public get newChemicalFormula() {
    return this._newChemicalFormula;
  }

  public set newChemicalDate(val: string) {
    runInAction(() => {
      this._newChemicalDate = val;
    });
  }
  public get newChemicalDate() {
    return this._newChemicalDate;
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
}
