import {extendObservable, autorun} from 'mobservable';

export default class Store {
    constructor(b, i) {
        extendObservable(this,{
            bought: b,
            items: i
        });
    }

    addItem = (name) => {
        this.items.push(name);
    };

    getBoughtItemLength = () => {
        return this.bought;
    };
}