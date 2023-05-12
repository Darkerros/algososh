interface IStack<T> {
    push: (item: T) => void;
    pop: () => void;
    peak: () => T | null;
    getSize: () => number;
    getElements: () => T[];
    clear: () => void;
}

export class Stack<T> implements IStack<T> {
    private items: T[] = [];

    push = (item: T): void => {
        this.items.push(item);
    };

    pop = (): void => {
        if (this.getSize()) {
            this.items.pop();
        }
    };

    peak = (): T | null => {
        if (this.items.length) {
            return this.items[this.items.length - 1];
        }
        return null;
    };

    getSize = () => this.items.length;

    getElements = () => this.items;

    clear = () => {
        this.items = [];
    };
}

