import { IPost } from '../../interfaces/posts'
import { useDelete, usePost, useUpdate } from '../reactQuery'

const posts_api_path = 'posts'

export const usePostPost = () => {
    return usePost<IPost[], IPost>(posts_api_path, (oldData, newData) => [
        ...oldData,
        newData,
    ])
}

export const useDeletePost = () => {
    return useDelete<IPost[]>(posts_api_path, (oldData, id) => [
        ...oldData.filter((post) => post.id != id),
    ])
}

export const useUpdatePost = (id: string | number) => {
    return useUpdate<IPost[], Partial<IPost>>(
        `${posts_api_path}/${id}`,
        posts_api_path,
        (oldData, updatedData) =>
            oldData.map((post) => {
                if (post.id === id) {
                    return {
                        ...post,
                        ...updatedData,
                    }
                }
                return post
            })
    )
}
