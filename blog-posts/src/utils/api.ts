import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3500/',
})

export const api = {
    get: <T>(url: string) => instance.get<T>(url).then((res) => res.data),

    post: <T>(url: string, data: any) =>
        delayActionWithConditionalError(
            () => instance.post<T>(url, data).then((res) => res.data),
            data
        ),

    patch: <T>(url: string, data: any) =>
        instance.patch<T>(url, data).then((res) => res.data),

    delete: <T>(url: string) => instance.delete<T>(url).then((res) => res.data),
    // instance.delete<T>(url).then((res) => res.data),
}

// const delayActionError = <T>(promise: () => Promise<T>): Promise<T> => {
//     return new Promise<T>((resolve, reject) =>
//         setTimeout(() => {
//             console.log('Perfoming action...')
//             reject(new Error('Something went wrong...'))
//             // resolve(promise)
//         }, 2000)
//     )
// }
const delayActionWithConditionalError = <T>(
    promise: () => Promise<T>,
    data: any
) => {
    return new Promise<T>((resolve, reject) => {
        setTimeout(() => {
            console.log('Performing creation...')
            if ('title' in data) {
                if (String(data.title).trim().toLowerCase() === 'fail') {
                    reject(new Error('Something went wrong...'))
                } else {
                    resolve(promise())
                }
            } else {
                resolve(promise())
            }
        }, 2000)
    })
}
