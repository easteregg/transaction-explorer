import {Card} from "flowbite-react";

export  function NoResult({title, description}: {title: string; description: string}) {
    return (
        <Card>
            <h5 className="mb-2 text-2xl font-bold text-gray-900 dark:text-white">
                {title}
            </h5>
            <p className="mb-5 text-base text-gray-500 dark:text-gray-400 sm:text-lg">
                {description}
            </p>
        </Card>
    )
}