import { useEffect, useState } from "react";

export default function (request) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null)

    useEffect(() => {
        setIsLoading(true);
        request()
            .then(response => setData(response.data))
            .catch(error => setError(error))
            .finally(() => setIsLoading(false))
    }, [])

    return [data, isLoading, error]

}