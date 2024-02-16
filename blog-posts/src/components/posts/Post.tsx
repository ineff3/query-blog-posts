import Modal from '../ui/Modal'
import { useModal } from '../../hooks/hooks'
import EditPostForm from './EditPostForm'
import { PiNavigationArrow } from 'react-icons/pi'
import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css'
import { UseMutateFunction } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { useUpdatePost } from '../../utils/postsQueries/postsQueries'

export enum PostType {
    default,
    single,
}

interface Props {
    id: string
    title: string
    body: string
    img: URL
    type?: PostType
    mutationDeleteFunction: UseMutateFunction<
        string | number,
        Error,
        string | number,
        {
            previousData: unknown
        }
    >
}

const Post = ({
    id,
    title,
    body,
    img,
    type = PostType.default,
    mutationDeleteFunction,
}: Props) => {
    const { show, close, visible } = useModal()
    const updateMutation = useUpdatePost(id)

    return (
        <div className="card h-full min-h-[300px]  bg-base-200 shadow-sm">
            <figure
                className={`${type === PostType.default ? 'h-[180px]' : 'h-[300px]'} `}
            >
                <img src={String(img)} alt="" />
            </figure>
            <div
                className={` card-body ${type === PostType.default ? 'gap-5' : 'gap-12'}`}
            >
                <h2 className=" card-title">{title}</h2>
                <p className="">{body}</p>
                {type === PostType.default && (
                    <div className="card-actions items-center justify-between">
                        <Link
                            to={`/posts/${id}`}
                            className=" btn btn-circle btn-secondary btn-sm"
                        >
                            <PiNavigationArrow size={20} />
                        </Link>
                        <div className=" flex gap-3">
                            <button
                                onClick={() =>
                                    mutationDeleteFunction(id, {
                                        onError: (err) => {
                                            toast.error(err.message)
                                        },
                                    })
                                }
                                className="btn btn-error btn-sm px-5"
                            >
                                Delete
                            </button>
                            <button
                                onClick={show}
                                className="btn btn-warning btn-sm px-5"
                            >
                                Edit
                            </button>
                        </div>
                        <Modal title="Edit Post" isOpen={visible} close={close}>
                            <EditPostForm
                                close={close}
                                postId={id}
                                updateMutationFunc={updateMutation.mutate}
                            />
                        </Modal>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Post
