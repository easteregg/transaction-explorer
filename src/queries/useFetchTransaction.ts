import {Nullable} from "@/store/types";
import {EvmChain, EvmTransaction} from "@moralisweb3/common-evm-utils";
import {useQuery} from "@tanstack/react-query";
import {getTransactionDetail} from "@/api/transaction-details";
import {useEffect} from "react";
import {useGlobalStore} from "@/store/global";
import {getTransactionFee} from "@/utils/transaction";

export function useFetchTransaction(txHash: string, chain: EvmChain) {
    const {isLoading, data} = useQuery(
        {
            queryKey: [txHash, chain.hex],
            queryFn: () => {
                return getTransactionDetail(txHash, chain)
            }
        }
    )

    useEffect(() => storeData(data), [data]);
    useEffect(() => storeLoading(isLoading), [isLoading]);
}


function storeData(data: Nullable<EvmTransaction>) {
    useGlobalStore.setState(state => {
        if (!data) {
            state.txDetail.detail = null;
            return;
        }

        state.txDetail.detail = {
            blockNumber: data.blockNumber.toString(),
            value: data.value?.ether ?? "-",
            timestamp: data.blockTimestamp,
            fromAddress: data.from.checksum,
            toAddress: data.to?.checksum ?? "-",
            hash: data.hash.toString(),
            gas: data.gas?.toString() ?? "-",
            gasPrice: data.gasPrice.toString(),
            gasUsed: data.gasUsed.toString(),
            amount: data.value?.ether.toString() ?? "0",
            status: data.receiptStatus ?? 0,
            transactionFee: data.receiptStatus === 1 ? data.gasPrice.mul(data.gasUsed).toDecimal(18) : "0"
        }
    })
}

function storeLoading(loading: boolean) {
    useGlobalStore.setState(state => {
        state.txDetail.isLoading = loading;
    })
}