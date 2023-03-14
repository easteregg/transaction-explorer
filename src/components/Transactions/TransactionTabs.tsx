import { Tabs, TabsRef } from "flowbite-react";
import {useRef, useState} from "react";
import {TransactionList} from "@/components/Transactions/TransactionList";
import config from "@/constants/config";

export function TransactionTabs() {
    const [activeTab, setActiveTab] = useState<number>(0); // TODO: move this to UI slice
    const tabsRef = useRef<TabsRef>(null);
    return (
        <Tabs.Group
            aria-label="Default tabs"
            style="default"
            ref={tabsRef}
            onActiveTabChange={tab => setActiveTab(tab)}
        >
            <Tabs.Item active title="Mainnet">
                <TransactionList chain={config.chainIds.mainnet} label="Mainnet transactions" network="mainnet"/>
            </Tabs.Item>
            <Tabs.Item title="Polygon">
                <TransactionList chain={config.chainIds.polygon} label="Polygon Transactions" network="polygon" />
            </Tabs.Item>
        </Tabs.Group>
    )
}