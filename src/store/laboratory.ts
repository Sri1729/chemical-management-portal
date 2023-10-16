import { makeAutoObservable, runInAction } from "mobx";
import { Root } from ".";
import { createLaboratory, getAllLaboratory } from "@/services";
import { LabCreationError, LabModel } from "./models";

export class Laboratory {
  private rootStore: Root;
  public labModel: LabModel;

  constructor(rootStore: Root) {
    this.labModel = new LabModel();
    makeAutoObservable(this);
    this.rootStore = rootStore;
  }

  public async onAddLab() {
    let error: LabCreationError = { id: "", name: "", roomNumber: "" };
    if (!this.labModel.labId) {
      error.id = "This is a required field";
    }
    if (!this.labModel.labName) {
      error.name = "This is a required field";
    }
    if (!this.labModel.labRoomNumber) {
      error.roomNumber = "This is a required field";
    }
    if (!error.id && !error.name && !error.roomNumber) {
      try {
        this.labModel.labCreateLoading = true;
        await createLaboratory({
          id: this.labModel.labId,
          name: this.labModel.labName,
          roomNumber: this.labModel.labRoomNumber,
          createdBy: this.rootStore.user?.user?.email || "",
          createdAtDate: this.labModel.labCreateDate,
          createdAtTime: this.labModel.labCreationTime,
        });
        this.labModel.labCreateLoading = false;
        this.labModel.showAddLabModal = false;
      } catch (e) {
        this.labModel.labCreateLoading = false;
      }
    } else {
      runInAction(() => {
        this.labModel.labCreationErrors = error;
      });
    }
  }

  public async checkAndGetLabs() {
    if (this.labModel.allLabs?.length === 0) {
      try {
        this.labModel.allLabs = await getAllLaboratory();
      } catch (e) {}
    }
    this.labModel.labsForSelect = this.labModel.allLabs.map((item) => ({
      id: item.id,
      name: item.name,
    }));
  }
}
