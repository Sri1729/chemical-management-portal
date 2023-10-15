import { makeAutoObservable, runInAction } from "mobx";
import { Laboratory as LaboratoryI, LaboratoryUI, SelectLab } from "@/types";
import { Root } from ".";
import { createLaboratory, getAllLaboratory } from "@/services";

interface LabCreationError {
  id: string;
  name: string;
  roomNumber: string;
}
export class Laboratory {
  private rootStore: Root;

  constructor(rootStore: Root) {
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  private _labId: string = "";
  private _labName: string = "";
  private _labRoomNumber: string = "";
  private _labCreateDate: string = new Date().toISOString().split("T")[0];
  private _labCreationTime: string = "09:00";
  private _showAddLabModal: boolean = false;
  private _allLabs: LaboratoryI[] = [];
  private _labCreateLoading: boolean = false;
  private _labsForSelect: SelectLab[] = [];

  private _labCreationErrors: LabCreationError = {
    id: "",
    name: "",
    roomNumber: "",
  };

  public set labId(_val: string) {
    runInAction(() => {
      this._labId = _val;
      this._labCreationErrors = { ...this._labCreationErrors, id: "" };
    });
  }
  public get labId(): string {
    return this._labId;
  }

  public set labName(_val: string) {
    runInAction(() => {
      this._labName = _val;
      this._labCreationErrors = { ...this._labCreationErrors, name: "" };
    });
  }
  public get labName(): string {
    return this._labName;
  }

  public get labRoomNumber() {
    return this._labRoomNumber;
  }
  public set labRoomNumber(value) {
    this._labRoomNumber = value;
    this._labCreationErrors = { ...this._labCreationErrors, roomNumber: "" };
  }

  public get labCreateDate(): string {
    return this._labCreateDate;
  }
  public set labCreateDate(value: string) {
    this._labCreateDate = value;
  }

  public get labCreationTime(): string {
    return this._labCreationTime;
  }
  public set labCreationTime(value: string) {
    this._labCreationTime = value;
  }

  public get labCreationErrors(): LabCreationError {
    return this._labCreationErrors;
  }
  public set labCreationErrors(value: LabCreationError) {
    this._labCreationErrors = value;
  }

  public async onAddLab() {
    let error: LabCreationError = { id: "", name: "", roomNumber: "" };
    if (!this._labId) {
      error.id = "This is a required field";
    }
    if (!this._labName) {
      error.name = "This is a required field";
    }
    if (!this._labRoomNumber) {
      error.roomNumber = "This is a required field";
    }
    if (!error.id && !error.name && !error.roomNumber) {
      try {
        this.labCreateLoading = true;
        await createLaboratory({
          id: this._labId,
          name: this._labName,
          roomNumber: this._labRoomNumber,
          createdBy: this.rootStore.user?.user?.email || "",
          createdAtDate: this._labCreateDate,
          createdAtTime: this._labCreationTime,
        });
        this.labCreateLoading = false;
        this.showAddLabModal = false;
      } catch (e) {
        this.labCreateLoading = false;
      }
    } else {
      runInAction(() => {
        this.labCreationErrors = error;
      });
    }
  }

  public get showAddLabModal(): boolean {
    return this._showAddLabModal;
  }
  public set showAddLabModal(value: boolean) {
    this._showAddLabModal = value;
  }

  public get allLabs(): LaboratoryUI[] {
    return this._allLabs.map((item) => ({
      ...item,
      createdAt: new Date(item?.createdAt?.seconds * 1000).toLocaleString(),
    }));
  }
  public set allLabs(value: LaboratoryI[]) {
    this._allLabs = value;
  }

  public get labCreateLoading(): boolean {
    return this._labCreateLoading;
  }
  public set labCreateLoading(value: boolean) {
    this._labCreateLoading = value;
  }

  public async checkAndGetLabs() {
    if (this._allLabs?.length === 0) {
      try {
        this.allLabs = await getAllLaboratory();
      } catch (e) {}
    }
    this.labsForSelect = this._allLabs.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  }

  public get labsForSelect(): SelectLab[] {
    return this._labsForSelect;
  }
  public set labsForSelect(value: SelectLab[]) {
    this._labsForSelect = value;
  }
}
