import {Chain, Nullable, StoreSlice, Transaction} from "@/store/types";
import {EvmChain, EvmTransaction} from "@moralisweb3/common-evm-utils";
import config from "@/constants/config";

export const createBalanceSlice: StoreSlice<BalanceSlice> = () => ({
    chains: {
        [config.chainIds.mainnet]: {
            value: "-"
        },
        [config.chainIds.polygon]: {
            value: "-"
        },
    },
    isLoading: false
});

export type BalanceSlice = {
    chains: Record<Chain, {value: string}>;
    isLoading:boolean
}