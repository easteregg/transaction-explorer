import {Badge, Card, Spinner} from "flowbite-react";
import {Network} from "@/store/types";
import {useGlobalStore} from "@/store/global";
import {useCallback} from "react";
import {getBlockchainExplorerLink, truncateEthAddress} from "@/utils/network";
import Link from "next/link";
import {Status} from "@/components/Transactions/Status";
import {getTransactionFee, isSuccessfulTransaction} from "@/utils/transaction";
import {getRelativeTime} from "@/utils/date";
import {useResponsive} from "@/hooks/useResponsive";

export function TransactionState({chain}: { chain: Network }) {
    const tx = useGlobalStore(useCallback(state => state.txDetail.detail, []))
    const isLoading = useGlobalStore(useCallback(state => state.txDetail.isLoading, []));
    const {isTablet, isMobile} = useResponsive();
    const shouldTruncate = isTablet || isMobile

    if (isLoading) return <Spinner color="info"/>;
    if (!tx) return null;

    return (
        <Card title={"Transaction info"}>
            <div className="flex flex-col sm:flex-row justify-between items-center">
                <h5 className="text-3xl">Transaction info</h5>
                <div className="flex flex-col md:flex-row gap-3 ">
                    <h6>Block number: #{tx.blockNumber}</h6>
                    <Badge color="dark">{getRelativeTime(tx.timestamp)}</Badge>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <p>Transaction Hash:</p>
                <Link target="_blank" rel="noreferrer noopener"
                      href={getBlockchainExplorerLink(chain)(tx.hash)}>{shouldTruncate ? truncateEthAddress(tx.hash) : tx.hash}</Link>
            </div>
            <div className="flex items-center justify-between">
                <p>Status:</p>
                <Status status={tx.status}/>
            </div>
            {isSuccessfulTransaction(tx.status) && (
                <div className="flex items-center justify-between"><p>Transaction Fee: </p>
                    <p>{tx.transactionFee} ETH</p></div>
            )}
            <div className="flex items-center justify-between">
                <p>Amount:</p> {tx.amount} ETH
            </div>
        </Card>
    )
}