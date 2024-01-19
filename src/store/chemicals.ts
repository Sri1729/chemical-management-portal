import { addStoreChemical, updateStoreChemicals } from "@/services";
import { Chemical, Sort, UpdateActions } from "@/types";
import { makeAutoObservable, runInAction } from "mobx";
import { Root } from ".";
import { ChemicalModel, newChemicalError, updateChemicalError } from "./models";

export class Chemicals {
  public root: Root;
  public chemicalModel: ChemicalModel;
  constructor(rootStore: Root) {
    makeAutoObservable(this);
    this.root = rootStore;
    this.chemicalModel = new ChemicalModel();
  }

  public onAddNewChemical = async () => {
    let error: newChemicalError = {
      name: "",
      quantity: "",
      units: "",
      cost: "",
      expiryDate: "",
      manufactureDate: "",
    };
    if (this.chemicalModel?.newChemicalName?.length === 0) {
      error.name = "This is a mandatory field";
    }
    if (this.chemicalModel?.newChemicalCost?.length === 0) {
      error.cost = "This is a mandatory field";
    }
    if (!this.chemicalModel?.newChemicalQuantity) {
      error.quantity = "This is a mandatory field";
    }
    if (!this.chemicalModel?.newChemicalQunatityUnit) {
      error.units = "This is a mandatory field";
    }
    if (!this.chemicalModel.newChemicalMfgDate) {
      error.manufactureDate = "This is a mandatory field";
    }
    if (
      this.chemicalModel.newChemicalShowExpDate &&
      !this.chemicalModel.newChemicalExpDate
    ) {
      error.expiryDate = "This is a mandatory field";
    }
    if (
      !error.name &&
      !error.cost &&
      !error.quantity &&
      !error.units &&
      !error.expiryDate &&
      !error.manufactureDate
    ) {
      try {
        this.chemicalModel.newChemicalAddLoading = true;
        await addStoreChemical({
          name: this.chemicalModel?.newChemicalName,
          timestamp: new Date(
            `${this.chemicalModel?.newChemicalDate}T${this.chemicalModel?.newChemicalTime}`
          ),
          quantity: this.chemicalModel?.newChemicalQuantity,
          action: UpdateActions.ADD,
          cost: this.chemicalModel.newChemicalCost,
          expDate: this.chemicalModel.newChemicalShowExpDate
            ? new Date(this.chemicalModel.newChemicalExpDate)
            : undefined,
          mfgDate: new Date(this.chemicalModel.newChemicalMfgDate),
          units: this.chemicalModel.newChemicalQunatityUnit,
        });
        this.chemicalModel.newChemicalModalOpen = false;
        this.chemicalModel.newChemicalAddLoading = false;
        this.chemicalModel.resetValues();
      } catch (e) {
        this.chemicalModel.newChemicalAddLoading = false;
        console.log("error", e);
      }
    } else {
      runInAction(() => {
        this.chemicalModel.newChemicalError = error;
      });
    }
  };

  public onUpdateChemical = async (action: UpdateActions) => {
    let error: updateChemicalError = {
      lab: "",
      quantity: "",
      cost: "",
      expiryDate: "",
      manufactureDate: "",
    };
    if (!this.chemicalModel.updateChemicalQuantity) {
      error.quantity = "This is a mandatory field";
    }
    if (
      !this.chemicalModel.updateChemicalLab &&
      action === UpdateActions.DELETE
    ) {
      error.lab = "This is a mandatory field";
    }
    if (!this.chemicalModel.updateChemicalCost) {
      error.cost = "This is a mandatory field";
    }
    if (!this.chemicalModel.updateChemicalMfgDate) {
      error.manufactureDate = "This is a mandatory field";
    }
    if (
      this.chemicalModel.updateChemicalShowExpDate &&
      !this.chemicalModel.updateChemicalExpDate
    ) {
      error.expiryDate = "This is a mandatory field";
    }
    if (
      !error.quantity &&
      !error.cost &&
      !error.expiryDate &&
      !error.manufactureDate &&
      (action === UpdateActions.DELETE ? !error.lab : true)
    ) {
      try {
        this.chemicalModel.updateChemicalLoading = true;
        const quantity = this.chemicalModel.updateChemicalQuantity;
        let remQuantity = quantity;
        // this?.chemicalModel.selectedChemical?.quantity;
        // if (action === UpdateActions.ADD) {
        //   remQuantity = `${Number(remQuantity) + Number(quantity)}`;
        // } else {
        //   remQuantity = `${Number(remQuantity) - Number(quantity)}`;
        // }

        await updateStoreChemicals({
          action: action,
          name: this.chemicalModel.selectedChemical?.name || "",
          id: this.chemicalModel.selectedChemical?.id || "",
          quantity: this.chemicalModel.updateChemicalQuantity,
          remainingQuantity: remQuantity,
          timestamp: new Date(
            `${this.chemicalModel.updateChemicalDate}T${this.chemicalModel.updateChemicalTime}`
          ),
          lab: this.root.laboratory.labModel.labsForSelect.filter(
            (item) => item.id === this.chemicalModel.updateChemicalLab
          )?.[0],
          cost: this.chemicalModel.updateChemicalCost,
          mfgDate: new Date(this.chemicalModel.updateChemicalMfgDate),
          expDate: this.chemicalModel.updateChemicalShowExpDate
            ? new Date(this.chemicalModel.updateChemicalExpDate)
            : undefined,
        });
        this.chemicalModel.updateChemicalLoading = false;
        this.chemicalModel.showAddChemicalModal = false;
        this.chemicalModel.showRemoveChemicalModal = false;

        this.chemicalModel.resetValues();
      } catch (e) {
        this.chemicalModel.updateChemicalLoading = false;
      }
    } else {
      runInAction(() => {
        this.chemicalModel.updateChemicalError = error;
      });
    }
  };
}
