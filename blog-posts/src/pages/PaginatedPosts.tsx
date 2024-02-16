import {
    keepPreviousData,
    useQuery,
    useQueryClient,
} from '@tanstack/react-query'
import postsService from '../utils/services/posts'
import Post from '../components/posts/Post'
import SkeletonPost from '../components/posts/SkeletonPost'
import { useModal } from '../hooks/hooks'
import Pagination from '../components/ui/Pagination'
import { useSearchParams } from 'react-router-dom'
import { useEffect } from 'react'
import CreatePostProcedure from '../components/posts/CreatePostProcedure'
import { useDeletePost, usePostPost } from '../utils/postsQueries/postsQueries'

const postsPerPageLimit = 3

const PaginatedPosts = () => {
    const queryClient = useQueryClient()
    const [searchParams] = useSearchParams()
    const paramsPage = Number(searchParams.get('page'))
    const currentPage = paramsPage ? paramsPage : 1
    const { show, close, visible } = useModal()

    const {
        data: posts,
        status,
        error,
        isPlaceholderData,
    } = useQuery({
        queryKey: ['posts', { page: currentPage }],
        queryFn: () =>
            postsService.getPaginated(currentPage, postsPerPageLimit),
        placeholderData: keepPreviousData,
        staleTime: 1000 * 60 * 30,
    })
    const deleteMutation = useDeletePost()
    const createMutation = usePostPost()

    useEffect(() => {
        if (posts?.last) {
            if (!isPlaceholderData && currentPage < posts.last) {
                queryClient.prefetchQuery({
                    queryKey: ['posts', { page: currentPage + 1 }],
                    queryFn: () =>
                        postsService.getPaginated(
                            currentPage + 1,
                            postsPerPageLimit
                        ),
                })
            }
        }
    }, [posts, isPlaceholderData, currentPage, queryClient])

    let lastPostId = '-1'
    if (posts?.data) {
        lastPostId = posts?.data[posts?.data.length - 1]?.id
    }

    if (status === 'pending') {
        return (
            <div className=" grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-rows-[repeat(auto-fill,minmax(350px,1fr))] gap-10  px-5 lg:grid-cols-[repeat(3,minmax(300px,1fr))]">
                {[...Array(postsPerPageLimit)].map((_, index) => (
                    <SkeletonPost key={index} />
                ))}
            </div>
        )
    }

    if (error) {
        return (
            <>
                <div className=" flex w-full justify-center text-xl">
                    Something went wrong :(
                </div>
            </>
        )
    }

    return (
        <div className=" flex flex-col gap-10">
            <CreatePostProcedure
                show={show}
                close={close}
                visible={visible}
                lastPostId={lastPostId}
                createMutationFunc={createMutation.mutate}
            />
            <div className=" grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-rows-[repeat(auto-fill,minmax(350px,1fr))] gap-10  px-5 lg:grid-cols-[repeat(3,minmax(300px,1fr))]">
                {posts?.data?.map((post) => (
                    <Post
                        key={post.id}
                        id={post.id}
                        title={post.title}
                        body={post.body}
                        img={post.img}
                        mutationDeleteFunction={deleteMutation.mutate}
                    />
                ))}
            </div>
            <div className=" self-center">
                <Pagination currentPage={currentPage} lastPage={posts.last} />
            </div>
        </div>
    )
}

export default PaginatedPosts
