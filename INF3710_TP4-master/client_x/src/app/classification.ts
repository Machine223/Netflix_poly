import { SortType } from "./enums";

export class Classification {
    title: string;
    sortType: SortType;

    constructor(title: string, sortType: SortType) {
        this.title = title;
        this.sortType = sortType;
    }
}