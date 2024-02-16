import { useQuery } from '@tanstack/react-query'
import postsService from '../utils/services/posts'
import Post from '../components/posts/Post'
import SkeletonPost from '../components/posts/SkeletonPost'
import { useModal } from '../hooks/hooks'
import CreatePostProcedure from '../components/posts/CreatePostProcedure'
import { useDeletePost, usePostPost } from '../utils/postsQueries/postsQueries'

const Posts = () => {
    const { show, close, visible } = useModal()

    const { data, status, isFetching } = useQuery({
        queryKey: ['posts'],
        queryFn: () => postsService.getAll(),
        // staleTime: Infinity,
    })
    const deleteMutation = useDeletePost()
    const createMutation = usePostPost()

    if (status === 'pending') {
        return (
            <div className=" grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-rows-[repeat(auto-fill,minmax(350px,1fr))]  gap-10 px-5">
                <SkeletonPost />
                <SkeletonPost />
                <SkeletonPost />
                <SkeletonPost />
                <SkeletonPost />
                <SkeletonPost />
            </div>
        )
    }

    if (status === 'error') {
        return (
            <>
                <div className=" flex w-full justify-center text-xl">
                    Something went wrong :(
                </div>
            </>
        )
    }
    // if (isFetching) {
    //     console.log('Fetching post')
    // }

    const lastPostId = data[data.length - 1]?.id

    return (
        <div className=" flex flex-col gap-10">
            <div className=" grid w-full grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-rows-[repeat(auto-fill,minmax(350px,1fr))]  gap-10 px-5">
                {data?.map((post) => (
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
            <CreatePostProcedure
                show={show}
                close={close}
                visible={visible}
                lastPostId={lastPostId}
                createMutationFunc={createMutation.mutate}
            />
        </div>
    )
}

export default Posts
