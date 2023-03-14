import {Nullable, StoreSlice, Transaction} from "@/store/types";
import {EvmChain, EvmTransaction} from "@moralisweb3/common-evm-utils";

export const createTransactionSlice: StoreSlice<TransactionDetail> = () => ({
    detail: null,
    isLoading: false
});

type TransactionDetailItem = {
    blockNumber: string;
    value: string;
    timestamp: Date;
    fromAddress: string;
    toAddress: string;
    hash: string;
    gas: string;
    gasPrice: string;
    gasUsed: string;
    amount: string;
    status: number;
    transactionFee: string;
}

export type TransactionDetail = {
    detail: Nullable<TransactionDetailItem>,
    isLoading: boolean
}