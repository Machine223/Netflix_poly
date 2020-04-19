import { SortType } from './enums';

export class Filter {
    title: string;
    type: SortType;

    constructor(title: string, type: SortType) {
        this.title = title;
        this.type = type;
    }
}