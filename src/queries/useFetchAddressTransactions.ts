import {useQuery} from "@tanstack/react-query";
import {getAllTransactions} from "@/api/transactions";
import {EvmChain, EvmTransaction} from "@moralisweb3/common-evm-utils";
import {useEffect} from "react";
import {useGlobalStore} from "@/store/global";
import {Nullable, Transaction} from "@/store/types";
import config from "@/constants/config";

export function useFetchAddressTransactions(address: string) {
    const {isLoading, data} = useQuery({
        queryKey: [address],
        queryFn: async (ctx) => {
            const evmChainTransactions = await getAllTransactions(address, EvmChain.ETHEREUM);
            const polygonTransactions = await getAllTransactions(address, EvmChain.POLYGON);

            return {
                [config.chainIds.polygon]: polygonTransactions,
                [config.chainIds.mainnet]: evmChainTransactions
            }
        }
    });

    useEffect(() => storeValues(data), [data]);
    useEffect(() => storeLoading(isLoading), [isLoading]);
}

type TransactionResponse = Nullable<{
    [x: string] : EvmTransaction[]
}>
function storeValues(data: TransactionResponse){
    if (!data) return ;
    useGlobalStore.setState(state => {
        state.txs.transactions[config.chainIds.mainnet] = data[config.chainIds.mainnet].map(a => transformTransactions(a));
        state.txs.transactions[config.chainIds.polygon] = data[config.chainIds.polygon].map(a => transformTransactions(a));
    });
}


function transformTransactions(item: EvmTransaction): Transaction {
    return {
        amount: item.value?.ether.toString() ?? "0",
        timestamp: item.blockTimestamp,
        fromAddress: item.from.checksum,
        toAddress: item.to?.checksum,
        gasUsed: item.gasUsed.toString(),
        hash: item.hash
    }
}
function storeLoading(loading: boolean) {
    useGlobalStore.setState(state => {
        state.txs.isLoading = loading;
    })
}