import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'
import { api } from './api'

export const useOptimisticMutation = <T, S>(
    func: (data: S) => Promise<S>,
    url: string,
    updater: (oldData: T, newData: S) => T,
    params?: object
) => {
    const queryClient = useQueryClient()
    const qKey = params ? [url, params] : [url]
    return useMutation({
        mutationFn: func,
        onMutate: async (data) => {
            // Cancel any outgoing refetches
            // (so they don't overwrite our optimistic update)
            await queryClient.cancelQueries({ queryKey: qKey })

            // Snapshot the previous value
            const previousData = queryClient.getQueryData(qKey)

            // Optimistically update to the new value
            queryClient.setQueryData(qKey, (oldData: T) => {
                return updater(oldData, data)
            })

            // Return a context object with the snapshotted value
            return { previousData }
        },
        // If the mutation fails,
        // use the context returned from onMutate to roll back
        onError(error, _, context) {
            console.log(error)
            queryClient.setQueryData(qKey, context?.previousData)
        },
        // Always refetch after error or success:
        onSettled: () => {
            queryClient.invalidateQueries({
                queryKey: qKey,
            })
        },
    })
}

export const usePost = <T, S>(
    url: string,
    updater: (oldData: T, newData: S) => T,
    params?: object
) => {
    return useOptimisticMutation(
        (data) => api.post<S>(url, data),
        url,
        updater,
        params
    )
}

export const useUpdate = <T, S>(
    path: string,
    url: string,
    updater: (oldData: T, updatedData: S) => T,
    params?: object
) => {
    return useOptimisticMutation(
        (data) => api.patch(path, data),
        url,
        updater,
        params
    )
}

export const useDelete = <T>(
    url: string,
    updater: (oldData: T, id: string | number) => T,
    params?: object
) => {
    return useOptimisticMutation(
        (id) => api.delete(`${url}/${id}`),
        url,
        updater,
        params
    )
}
