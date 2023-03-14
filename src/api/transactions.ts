import {EvmChain, EvmTransaction} from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";

export async function getAllTransactions(address: string, chain: EvmChain): Promise<EvmTransaction[]> {
    const response= await Moralis.EvmApi.transaction.getWalletTransactions({
        address,
        chain,
    });


    return response.result;
}