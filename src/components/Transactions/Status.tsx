import {Badge} from "flowbite-react";
import {isSuccessfulTransaction} from "@/utils/transaction";

export function Status({status}: {status: number}) {
    if (isSuccessfulTransaction(status)) {
        return <Badge className="w-min" color="success" >Success</Badge>
    }
    if (status === 0) {
        return <Badge className="w-min" color="failure" >Failed</Badge>
    }

    return <Badge className="w-min" color="info" >Unknown</Badge>
}