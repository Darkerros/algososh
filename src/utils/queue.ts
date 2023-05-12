interface IQueue<T> {
    enqueue: (item: T) => void;
    dequeue: () => void;
    peak: () => T | null;
    getElements: () => T[];
    getHead: () => number;
    getTail: () => number;
    getTailIndex: () => number;
    clear: () => void;
    isEmpty: () => void;
    isFull: () => void;
}

export class Queue<T> implements IQueue<T> {
    private items: T[] = [];
    private head = 0;
    private tail = 0;
    private tailIndex = 0;
    private readonly size: number = 0;
    private length: number = 0;

    constructor(size: number) {
        this.size = size;
        this.items = Array(size).fill("");
    }

    enqueue = (item: T) => {
        if (this.length >= this.size) {
            throw new Error("Maximum length exceeded");
        } else {
            this.tailIndex = this.tail;
            this.items[this.tail] = item;
            this.tail = (this.tail + 1) % this.size;
            this.length++;
        }
    };

    dequeue = () => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        } else {
            delete this.items[this.head];
            this.head = (this.head + 1) % this.size;
            this.length--;
        }
    };

    peak = (): T | null => {
        if (this.isEmpty()) {
            throw new Error("No elements in the queue");
        }
        if (!this.isEmpty()) {
            return this.items[this.head % this.size];
        } else {
            return null;
        }
    };

    isEmpty = () => this.length === 0;

    isFull = () => this.length === this.size;

    getElements = () => this.items;

    getHead = (): number => this.head;

    getTail = (): number => this.tail;

    getTailIndex = (): number => this.tailIndex;

    clear = () => {
        this.items = Array(this.size).fill("");
        this.length = 0;
        this.head = 0;
        this.tail = 0;
        this.tailIndex = 0;
    };
}