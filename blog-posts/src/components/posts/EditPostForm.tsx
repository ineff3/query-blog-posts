import { FormEvent } from 'react'
import { useUpdatePost } from '../../utils/postsQueries/postsQueries'
import { UseMutateFunction } from '@tanstack/react-query'
import { IPost } from '../../interfaces/posts'
import { toast } from 'react-toastify'

interface Props {
    postId: string
    close: () => void
    updateMutationFunc: UseMutateFunction<
        Partial<IPost>,
        Error,
        Partial<IPost>,
        {
            previousData: unknown
        }
    >
}

const EditPostForm = ({ close, postId, updateMutationFunc }: Props) => {
    const mutation = useUpdatePost(postId)

    const onSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const title = formData.get('title')
        const body = formData.get('body')
        const img = formData.get('img')

        updateMutationFunc(
            {
                title: String(title),
                body: String(body),
                img: new URL(String(img)),
            },
            {
                onError: (err) => {
                    toast.error(err.message)
                },
            }
        )
        close()
    }

    return (
        <form onSubmit={onSubmit}>
            <div className=" my-10 flex flex-col items-center gap-5">
                <input
                    type="text"
                    required
                    name="title"
                    placeholder="Title"
                    className="input input-bordered w-full max-w-xs"
                />
                <input
                    type="text"
                    required
                    name="body"
                    placeholder="Body"
                    className="input input-bordered w-full max-w-xs"
                />
                <input
                    type="text"
                    required
                    name="img"
                    placeholder="Image source (url)"
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            <div className=" mt-4 flex justify-end gap-4">
                <button
                    type="reset"
                    onClick={() => close()}
                    className=" btn btn-outline btn-error "
                >
                    Cancel
                </button>
                <button type="submit" className=" btn btn-secondary ">
                    Edit Post
                </button>
            </div>
        </form>
    )
}

export default EditPostForm
