import { IPost } from '../../interfaces/posts'
import { api } from '../api'

// export interface IPost {
//     id: string
//     title: string
//     body: string
//     img: URL
// }
interface IPaginatedResponse<T> {
    next: number
    last: number
    pages: number
    items: number
    data: T[]
}

const postsService = {
    getAll: () => api.get<IPost[]>('posts'),
    getPaginated: (page: number, limit: number) =>
        api.get<IPaginatedResponse<IPost>>(
            `posts?_page=${page}&_per_page=${limit}`
        ),
    getById: (id: string) => api.get<IPost>(`posts/${id}`),
    create: (data: IPost) => api.post<IPost>('posts', data),
    patch: (data: Partial<IPost>, id: string) =>
        api.patch<IPost>(`posts/${id}`, data),
    delete: (id: number) => api.delete<IPost>(`posts/${id}`),
}

export default postsService
