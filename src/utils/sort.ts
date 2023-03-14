import { Transaction } from "@/store/types";

export function sortByDate(a: Transaction, b: Transaction) {
    return a.timestamp.getTime() > b.timestamp.getTime() ? 1 : -1;
}

export function sortByAmount(a: Transaction, b: Transaction) {
    return  Number(a.amount) < Number(b.amount) ? 1 : -1;
}