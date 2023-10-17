import { makeAutoObservable, runInAction } from "mobx";
import { ChemicalModel, updateChemicalError } from "./models";
import {
  getIndividualLabDetails,
  updateIndividualLabChemical,
} from "@/services";
import { LabDetails, UpdateActions } from "@/types";
import { Root } from ".";

export class IndividualLab {
  public chemicalModel: ChemicalModel;
  public root: Root;

  private _currentLabDetails: LabDetails | null = null;

  constructor(rootStore: Root) {
    makeAutoObservable(this);
    this.chemicalModel = new ChemicalModel();
    this.root = rootStore;
  }

  public async getLabDetails(id: string) {
    try {
      const labDetails = await getIndividualLabDetails(id);
      this.currentLabDetails = labDetails;
    } catch (e) {}
  }

  public get currentLabDetails(): LabDetails | null {
    return this._currentLabDetails;
  }
  public set currentLabDetails(value: LabDetails | null) {
    this._currentLabDetails = value;
  }

  public async onUpdateChemical(action: UpdateActions) {
    let error: updateChemicalError = { lab: "", quantity: "" };
    if (!this.chemicalModel.updateChemicalQuantity) {
      error.quantity = "This is a mandatory field";
    }

    if (!error.quantity) {
      try {
        this.chemicalModel.updateChemicalLoading = true;
        const quantity = this.chemicalModel.updateChemicalQuantity;
        await updateIndividualLabChemical({
          id: this.chemicalModel.selectedChemical?.id || "",
          lab: this._currentLabDetails?.id || "",
          quantity: quantity,
          timestamp: new Date(
            `${this.chemicalModel.updateChemicalDate}T${this.chemicalModel.updateChemicalTime}`
          ),
        });
        this.chemicalModel.updateChemicalLoading = false;
        this.chemicalModel.showAddChemicalModal = false;
        this.chemicalModel.showRemoveChemicalModal = false;
        this.chemicalModel.resetValues();
      } catch (e) {
        console.log(e);
        this.chemicalModel.updateChemicalLoading = false;
      }
    } else {
      runInAction(() => {
        this.chemicalModel.updateChemicalError = error;
      });
    }
  }
}
