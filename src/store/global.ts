import {create} from "zustand";
import {devtools} from "zustand/middleware";
import {immer} from "zustand/middleware/immer";
import {createTransactionsSlice} from "@/store/transactions";
import {GlobalStore} from "@/store/types";
import { createTransactionSlice } from "@/store/transaction";
import {createBalanceSlice} from "@/store/balance";
import {createUiSlice} from "@/store/ui";

export const useGlobalStore = create<GlobalStore>()(
    devtools(
        immer(
            (...a) => ({
                txs: createTransactionsSlice(...a),
                txDetail: createTransactionSlice(...a),
                balance: createBalanceSlice(...a),
                ui: createUiSlice(...a),
            })
        )
    )
)