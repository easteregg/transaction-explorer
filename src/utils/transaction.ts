export function isSuccessfulTransaction(status: number) {
    return status === 1 ? true : false;
}

export function getTransactionFee(gasPrice: number, gasUsed: number) {
    return Number(gasPrice) * Number(gasUsed) / 10 ** 18
}