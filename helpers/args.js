export const getArgs = (args) => {
    const res = {};

    const [executer, file, ...rest] = args;
    rest.forEach((value, idx, arr) => {
        if (value.charAt(0) == '-') {

            if (idx === arr.length - 1) {
                res[value.substring(1)] = true
            } else if (arr[idx + 1].charAt(0) !== '-') {
                res[value.substring(1)] = arr[idx + 1]
            } else {
                res[value.substring(1)] = true
            }
        }
    })

    return res;
}