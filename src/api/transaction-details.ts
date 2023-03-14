import {EvmChain, EvmTransaction} from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";
import {Nullable} from "@/store/types";

export async function getTransactionDetail(txHash: string, chain: EvmChain): Promise<Nullable<EvmTransaction>> {
    const response= await Moralis.EvmApi.transaction.getTransaction({
        transactionHash: txHash,
        chain,
    });

    if (response) {

    return response.result;
    }

    return null;
}