import { ReactNode, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

export const useModal = () => {
    const [isOpen, setIsOpen] = useState(false)
    const visible = isOpen

    const show = () => {
        setIsOpen(true)
    }

    const close = () => {
        setIsOpen(false)
    }

    return { show, close, visible }
}

interface PaginationProps {
    initialPage: number | typeof NaN
}
// export const usePagination = ({ initialPage }: PaginationProps) => {
//     const [page, setPage] = useState(initialPage ? initialPage : 1)
//     const [searchParams, setSearchParams] = useSearchParams()

//     const nextPage = () => {
//         setPage((prev) => {
//             const next = prev + 1
//             setSearchParams({ page: String(next) })
//             return next
//         })
//     }

//     const previousPage = () => {
//         setPage((prev) => {
//             const previous = prev - 1
//             setSearchParams({ page: String(previous) })
//             return previous
//         })
//     }

//     return { currentPage: page, nextPage, previousPage }
// }
