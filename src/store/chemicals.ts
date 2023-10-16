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
    let error: newChemicalError = { name: "", formula: "", quantity: "" };
    if (this.chemicalModel?.newChemicalName?.length === 0) {
      error.name = "This is a mandatory field";
    }
    if (this.chemicalModel?.newChemicalFormula?.length === 0) {
      error.formula = "This is a mandatory field";
    }
    if (!this.chemicalModel?.newChemicalQuantity) {
      error.quantity = "This is a mandatory field";
    }
    if (!error.name && !error.formula && !error.quantity) {
      try {
        this.chemicalModel.newChemicalAddLoading = true;
        await addStoreChemical({
          name: this.chemicalModel?.newChemicalName,
          formula: this.chemicalModel?.newChemicalFormula,
          timestamp: new Date(
            `${this.chemicalModel?.newChemicalDate}T${this.chemicalModel?.newChemicalTime}`
          ),
          quantity: this.chemicalModel?.newChemicalQuantity,
          action: UpdateActions.ADD,
        });
        this.chemicalModel.newChemicalModalOpen = false;
        this.chemicalModel.newChemicalAddLoading = false;
      } catch (e) {
        this.chemicalModel.newChemicalAddLoading = true;
      }
    } else {
      runInAction(() => {
        this.chemicalModel.newChemicalError = error;
      });
    }
  };

  public onUpdateChemical = async (action: UpdateActions) => {
    let error: updateChemicalError = { lab: "", quantity: "" };
    if (!this.chemicalModel.updateChemicalQuantity) {
      error.quantity = "This is a mandatory field";
    }
    if (
      !this.chemicalModel.updateChemicalLab &&
      action === UpdateActions.DELETE
    ) {
      error.lab = "This is a mandatory field";
    }
    if (
      !error.quantity &&
      (action === UpdateActions.DELETE ? !error.lab : true)
    ) {
      try {
        this.chemicalModel.updateChemicalLoading = true;
        const quantity = this.chemicalModel.updateChemicalQuantity;
        let remQuantity = this?.chemicalModel.selectedChemical?.quantity;
        if (action === UpdateActions.ADD) {
          remQuantity = `${Number(remQuantity) + Number(quantity)}`;
        } else {
          remQuantity = `${Number(remQuantity) - Number(quantity)}`;
        }

        await updateStoreChemicals({
          action: action,
          name: this.chemicalModel.selectedChemical?.name || "",
          formula: this.chemicalModel.selectedChemical?.formula || "",
          id: this.chemicalModel.selectedChemical?.id || "",
          quantity: this.chemicalModel.updateChemicalQuantity,
          remainingQuantity: remQuantity,
          timestamp: new Date(
            `${this.chemicalModel.updateChemicalDate}T${this.chemicalModel.updateChemicalTime}`
          ),
          lab: this.root.laboratory.labModel.labsForSelect.filter(
            (item) => item.id === this.chemicalModel.updateChemicalLab
          )?.[0],
        });
        this.chemicalModel.updateChemicalLoading = false;
        this.chemicalModel.showAddChemicalModal = false;
        this.chemicalModel.showRemoveChemicalModal = false;
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
