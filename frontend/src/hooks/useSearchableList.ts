import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from './useDebounce';

export function useSearchableList<T>(
    searchValue: string,
    searchFunc: (value: string) => Promise<T[]>,
    initList?: T[],
): [T[], boolean] {
    const [list, setList] = useState<T[]>([])
    const [fetching, setfetching] = useState<boolean>(true)
    const debouncedValue = useDebounce(searchValue, 500);

    const search = useCallback(async () => {
        const newList = await searchFunc(debouncedValue)
        setList(newList)
        setfetching(false)
    }, [debouncedValue, searchFunc])

    useEffect(() => {
        search()
    }, [debouncedValue, search])

    useEffect(() => {
        setfetching(true)
    }, [searchValue])

    return [list, fetching]
}
