import { makeAutoObservable, runInAction } from "mobx";
import { ChemicalModel } from "./models";

export class IndividualLab {
  public chemicalModel: ChemicalModel;

  private _currentLabId: string = "";

  constructor() {
    makeAutoObservable(this);
    this.chemicalModel = new ChemicalModel();
  }

  public get currentLabId(): string {
    return this._currentLabId;
  }
  public set currentLabId(value: string) {
    this._currentLabId = value;
  }
}
