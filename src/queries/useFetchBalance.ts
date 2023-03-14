import {Chain, Nullable} from "@/store/types";
import {EvmChain, EvmNative, EvmTransaction} from "@moralisweb3/common-evm-utils";
import {useQuery} from "@tanstack/react-query";
import {getTransactionDetail} from "@/api/transaction-details";
import {useEffect} from "react";
import {useGlobalStore} from "@/store/global";
import {getBalance} from "@/api/balance";
import config from "@/constants/config";

export function useFetchBalance(address: string) {
    const {isLoading, data} = useQuery(
        {
            queryKey: ["balance", address],
            queryFn: async () => ({
                [config.chainIds.polygon]: await getBalance(address, EvmChain.POLYGON),
                [config.chainIds.mainnet]: await getBalance(address, EvmChain.ETHEREUM)
            })
        }
    )

    useEffect(() => storeData(data), [data]);
    useEffect(() => storeLoading(isLoading), [isLoading]);
}


function storeData(data: Nullable<{[x: string]: {balance: EvmNative}}>) {
    useGlobalStore.setState(state => {
        if (!data) {
            return ;
        }

        Object.entries(data).forEach(([chain, value]) => {
            state.balance.chains[chain as Chain].value = value.balance?.value.toDecimal(config.ethDecimals) ?? "0.0";
        })
    })
}

function storeLoading(loading: boolean) {
    useGlobalStore.setState(state => {
        state.balance.isLoading = loading;
    })
}