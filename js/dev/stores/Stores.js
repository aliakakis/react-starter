import {observable} from 'mobx';

export default class Store {
    @observable bought = 0;
    @observable items = [];

    constructor(b, i) {
        this.bought = b;
        this.items = i;
    }

    addItem = (name) => {
        this.items.push(name);
    };

    getBoughtItemLength = () => {
        return this.bought;
    };
}