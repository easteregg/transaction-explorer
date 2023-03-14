import {useCallback} from "react";
import {useGlobalStore} from "@/store/global";
import { Chain } from "@/store/types";

export function Balance({chain}: {chain: Chain}) {
    const balance = useGlobalStore(store => store.balance.chains[chain].value);

    return <div className="text-sm">{balance} ETH</div>
}