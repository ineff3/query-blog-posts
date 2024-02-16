import { useParams } from 'react-router-dom'
import Post, { PostType } from '../components/posts/Post'
import { useQuery } from '@tanstack/react-query'
import postsService from '../utils/services/posts'

const PostPage = () => {
    const { postId } = useParams()
    const { data, status, error } = useQuery({
        queryKey: ['posts', postId],
        queryFn: () => postsService.getById(String(postId)),
        staleTime: Infinity,
    })

    if (status === 'pending') {
        return (
            <div className=" mx-auto flex max-w-xl justify-center">
                <span className="loading loading-spinner loading-lg"></span>
            </div>
        )
    }

    if (error) {
        return (
            <div role="alert" className="alert alert-error mx-auto max-w-xl">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 shrink-0 stroke-current"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                </svg>
                <span>{error.message}</span>
            </div>
        )
    }

    return (
        <div className=" mx-auto flex w-full max-w-xl flex-col">
            <Post
                id={data.id}
                title={data.title}
                body={data.body}
                img={data.img}
                type={PostType.single}
            />
        </div>
    )
}

export default PostPage
