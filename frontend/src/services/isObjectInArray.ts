import { shallowEqual } from "react-redux";

export function containsObject<T>(obj: any, list: T[]) {
    var i;
    for (i = 0; i < list.length; i++) {
        if (shallowEqual(list[i], obj)) {
            return true;
        }
    }

    return false;
}
