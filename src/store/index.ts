import { makeAutoObservable } from "mobx";

class CounterStore {
    count = 0;

    constructor() {
        makeAutoObservable(this);
    }

    increment = () => {
        this.count += 1;
    };

    decrement = () => {
        if (this.count > 0) {
            this.count -= 1;
        }
    };
}

export default new CounterStore();
