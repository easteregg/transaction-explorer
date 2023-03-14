import {EvmChain, GetNativeBalanceResponse} from "@moralisweb3/common-evm-utils";
import Moralis from "moralis";

export async function getBalance(address: string, chain: EvmChain): Promise<GetNativeBalanceResponse> {
    const response= await Moralis.EvmApi.balance.getNativeBalance({
        address,
        chain,
    });




    return response.result;
}