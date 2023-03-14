import {useGlobalStore} from "@/store/global";
import React, {useCallback, useMemo} from "react";
import {Chain, Network} from "@/store/types";
import { NoResult } from "../Shared/NoResult";
import {Button, Card, Spinner, Table} from "flowbite-react";
import {useRouter} from "next/router";
import {Balance} from "@/components/Balance";
import { getRelativeTime } from "@/utils/date";
import {sortByAmount, sortByDate} from "@/utils/sort";
import {toggleSortByAmount, toggleSortByDate } from "@/store/uiActions";

export function TransactionList({network, chain, label}: {network: Network, chain: Chain, label: string}) {
    const txs = useGlobalStore(useCallback(state => state.txs.transactions[chain], [chain]));
    const isLoading = useGlobalStore(useCallback(state => state.txs.isLoading, []));
    const {byDate, byAmount } = useGlobalStore(useCallback(state => state.ui,[]));
    const router = useRouter();
    const goToDetails = ( path: string) => {
        router.push(`/txs/${network}/${path}`);
    }

    const sortedTxs = useMemo(() => {
        let copy = [...txs];
        if (byDate) {
            copy.sort(sortByDate)
        }
        if (byAmount) {
            copy.sort(sortByAmount)
        }
        return copy;
    }, [byAmount, byDate, txs]);

    if (isLoading) {
        return <Spinner color="info" aria-label={`loading results for ${label}`} />
    }

    if (txs.length === 0) {
        return <NoResult title={`No result found for ${label}`} description="Try other supported networks, or enter another address"/>
    }



    return (
            <Card>
                <div className="flex justify-between items-center">
                    <h2 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">{label}</h2>
                    <div>
                        <h4 className="text-2xl">Balance</h4>
                        <Balance chain={chain} />
                    </div>
                </div>

                <Table hoverable={true} striped={true}>
                    <Table.Head>
                        <Table.Cell className="cursor-pointer" onClick={toggleSortByAmount}>
                            Amount
                        </Table.Cell>
                        <Table.Cell className="cursor-pointer"  onClick={toggleSortByDate}>
                            Date
                        </Table.Cell>
                        <Table.Cell>
                            Gas used
                        </Table.Cell>
                        <Table.Cell>From</Table.Cell>
                        <Table.Cell>To</Table.Cell>
                        <Table.Cell></Table.Cell>
                    </Table.Head>
                    <Table.Body>
                        {sortedTxs.map(tx => {

                            return (
                                <Table.Row key={tx.hash}>
                                    <Table.Cell>
                                        {tx.amount}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">
                                        {getRelativeTime(tx.timestamp)}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">
                                        {tx.gasUsed}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">
                                        {tx.fromAddress}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">
                                        {tx.toAddress}
                                    </Table.Cell>
                                    <Table.Cell className="whitespace-nowrap">
                                        <Button color="purple" onClick={() => {
                                            goToDetails( tx.hash)
                                        }
                                        } >
                                            More details
                                        </Button>
                                    </Table.Cell>
                                </Table.Row>
                            )
                        })}
                    </Table.Body>

                </Table>
            </Card>
    )
}