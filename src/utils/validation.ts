export function validateAddress(address:  string | string[] | undefined) {
    return typeof address === "string" && /^0x[a-fA-F0-9]{40}$/.test(address)
}

export function validateTx(address:  string | string[] | undefined) {
    return typeof address === "string" && /^0x([A-Fa-f0-9]{64})$/.test(address)
}