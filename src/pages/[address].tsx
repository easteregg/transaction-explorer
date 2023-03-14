import {validateAddress} from "@/utils/validation";
import config from "@/constants/config";
import {ParsedUrlQuery} from "querystring";
import {useFetchAddressTransactions} from "@/queries/useFetchAddressTransactions";
import {TransactionTabs} from "@/components/Transactions/TransactionTabs";
import {useFetchBalance} from "@/queries/useFetchBalance";
import {HorCenter} from "@/components/Layout/hor-center";

export default function TransactionPage({address}: { address: string }) {
    useFetchAddressTransactions(address);
    useFetchBalance(address);

    return (
        <HorCenter>
            <TransactionTabs/>
        </HorCenter>
    )
}

export const getServerSideProps = ({query}: { query: ParsedUrlQuery }) => {
    // Parse the transaction to be proper evm address
    const addressQuery = query.address;
    const address = validateAddress(addressQuery) ? addressQuery : config.defaultAddress;

    return {
        props: {
            address,
        }
    }
}