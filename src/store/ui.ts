import {Chain, Nullable, StoreSlice, Transaction} from "@/store/types";
import {EvmChain, EvmTransaction} from "@moralisweb3/common-evm-utils";
import config from "@/constants/config";

export const createUiSlice: StoreSlice<UiSlice> = () => ({
    byDate: false,
    byAmount: false
});

export type UiSlice = {
    byDate: boolean;
    byAmount: boolean;
}