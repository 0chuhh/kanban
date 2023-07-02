type oneToNine = 1|2|3|4|5|6|7|8|9;
type zeroToNine = 0|1|2|3|4|5|6|7|8|9;
type zeroToTwo = 0|1|2;
type YYYY = `19${zeroToNine}${zeroToNine}` | `20${zeroToNine}${zeroToNine}`
type MM = `0${oneToNine}` | `1${zeroToTwo}`
type DD = `${0}${oneToNine}` | `${1|2}${zeroToNine}` | `3${0|1}`


export type DateString = `${YYYY}${MM}${DD}`;
