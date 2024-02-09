import { useCallback, useEffect, useState } from 'react'
import { useDebounce } from './useDebounce';
import { containsObject } from 'services/isObjectInArray';

export function useSearchableList<T>(
    searchValue: string,
    searchFunc: (value: string) => Promise<T[]>,
    initList?: T[],
    filterFunc?:(list:T[])=>T[]
): [T[], boolean] {
    const [list, setList] = useState<T[]>([])
    const [fetching, setfetching] = useState<boolean>(true)
    const debouncedValue = useDebounce(searchValue, 500);

    const search = useCallback(async () => {
        let newList = await searchFunc(debouncedValue)
        if(filterFunc){
            newList = filterFunc(newList)
            console.log(filterFunc(newList), 'f')
        }
        setList(newList)
        setfetching(false)
    }, [debouncedValue, searchFunc, filterFunc])

    useEffect(() => {
        search()
    }, [debouncedValue, search])

    useEffect(() => {
        setfetching(true)
    }, [searchValue])

    return [list, fetching]
}
