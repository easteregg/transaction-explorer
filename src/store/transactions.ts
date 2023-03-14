import {StoreSlice, Transaction} from "@/store/types";
import {EvmChain, EvmTransaction} from "@moralisweb3/common-evm-utils";

export const createTransactionsSlice: StoreSlice<Transactions> = () => ({
    transactions: {
        "0x89": [],
        "0x1": [],
    },
    isLoading: false
});

export type Transactions = {
    transactions: {
        "0x1": Array<Transaction>,
        "0x89": Array<Transaction>
    },
    isLoading: boolean
}