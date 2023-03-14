import Moralis from "moralis";
import { EvmChain } from "@moralisweb3/common-evm-utils";


export async function initApi() {
    if (!Moralis.Core.isStarted) {
        await Moralis.start({
            apiKey: process.env.NEXT_PUBLIC_MORALIS_KEY,
        });
    }
}
export async function getApi() {
    return {
        getTransactions: Moralis.EvmApi.transaction.getWalletTransactions,
    }
}