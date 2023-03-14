import {useGlobalStore} from "@/store/global";

export function toggleSortByDate() {
    useGlobalStore.setState(state => {
        state.ui.byDate = !state.ui.byDate;
        state.ui.byAmount = false;
    })
}

export function toggleSortByAmount() {
    useGlobalStore.setState(state => {
        state.ui.byAmount = !state.ui.byAmount;
        state.ui.byDate = false;
    })
}