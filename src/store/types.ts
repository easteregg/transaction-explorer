import {Transactions} from "@/store/transactions";
import {StateCreator} from "zustand";
import config from "@/constants/config";
import {TransactionDetail} from "@/store/transaction";
import {BalanceSlice} from "@/store/balance";
import {UiSlice} from "@/store/ui";

export type GlobalStore = {
    txs: Transactions,
    txDetail: TransactionDetail,
    balance: BalanceSlice,
    ui: UiSlice
}

export type StoreSlice<T> = StateCreator<
    GlobalStore,
    [
        ["zustand/immer", never],
        ["zustand/devtools", never]
    ],
    [],
    T
>;

export type Transaction = { amount: string; gasUsed: string; fromAddress: string; toAddress: string | undefined; hash: string; timestamp: Date };

export type Network = keyof typeof config.chainIds;
export type Chain = typeof config.chainIds[Network];
export type Nullish = undefined | null;
export type Nullable<T> = Nullish | T;