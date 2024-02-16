import React from 'react'
import Modal from '../ui/Modal'
import CreatePostForm from './CreatePostForm'
import { UseMutateFunction } from '@tanstack/react-query'
import { IPost } from '../../interfaces/posts'

interface Props {
    show: () => void
    close: () => void
    visible: boolean
    lastPostId: string
    createMutationFunc: UseMutateFunction<
        IPost,
        Error,
        IPost,
        {
            previousData: unknown
        }
    >
}

const CreatePostProcedure = ({
    show,
    close,
    visible,
    lastPostId,
    createMutationFunc,
}: Props) => {
    return (
        <>
            <button
                onClick={show}
                className=" btn btn-neutral w-fit self-center"
            >
                Create a Post
            </button>
            <Modal title="New Post" isOpen={visible} close={close}>
                <CreatePostForm
                    close={close}
                    lastPostId={lastPostId}
                    createMutationFunc={createMutationFunc}
                />
            </Modal>
        </>
    )
}

export default CreatePostProcedure
