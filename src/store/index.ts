import { addTodo, getTodos } from "@/services";
import { makeAutoObservable } from "mobx";

class CounterStore {
  count = 0;

  constructor() {
    makeAutoObservable(this);
  }

  increment = async () => {
    await getTodos();
    this.count += 1;
  };

  decrement = async () => {
    await addTodo();
    if (this.count > 0) {
      this.count -= 1;
    }
  };
}

export default new CounterStore();
