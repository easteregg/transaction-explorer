import {ParsedUrlQuery} from "querystring";
import {validateTx} from "@/utils/validation";
import {useFetchTransaction} from "@/queries/useFetchTransaction";
import {Network} from "@/store/types";
import {EvmChain} from "@moralisweb3/common-evm-utils";
import {TransactionState} from "@/components/Transactions/TransactionState";
import {HorCenter} from "@/components/Layout/hor-center";

export default function TXDetailsPage({hash, chain}: {hash: string; chain: Network}) {
    useFetchTransaction(hash, chain === "polygon" ? EvmChain.POLYGON : EvmChain.ETHEREUM);
    return (
        <HorCenter>
            <TransactionState chain={chain} />
        </HorCenter>
    )
}

export const getServerSideProps = ({query}: {query: ParsedUrlQuery}) =>  {
    const hashQuery = query.txHash;
    const chainQuery = query.chain;

    if (validateTx(hashQuery) && typeof chainQuery === 'string' && ['mainnet', 'polygon'].includes(chainQuery)) {
        return {
            props: {
                hash: hashQuery,
                chain: chainQuery
            }
        }
    }

    return {
        notFound: true
    }
}