import { useSearchParams } from 'react-router-dom'

interface Props {
    currentPage: number
    lastPage: number
}

const Pagination = ({ currentPage, lastPage }: Props) => {
    const [searchParams, setSearchParams] = useSearchParams()
    return (
        <div className="join">
            <button
                className={`btn join-item ${currentPage === 1 ? ' btn-disabled' : ''}`}
                onClick={() =>
                    setSearchParams({ page: String(currentPage - 1) })
                }
            >
                «
            </button>

            <PageBtnsSetup amountOfPages={lastPage} currentPage={currentPage} />

            <button
                className={`btn join-item ${currentPage === lastPage ? ' btn-disabled' : ''}`}
                onClick={() =>
                    setSearchParams({ page: String(currentPage + 1) })
                }
            >
                »
            </button>
        </div>
    )
}

export default Pagination

const PageBtnsSetup = ({
    amountOfPages,
    currentPage,
}: {
    amountOfPages: number
    currentPage: number
}) => {
    const [searchParams, setSearchParams] = useSearchParams()
    if (amountOfPages < 6) {
        return (
            <>
                {[...Array(amountOfPages)].map((_, index) => (
                    <button
                        key={index}
                        className={`btn join-item ${currentPage === index + 1 ? ' btn-active' : ''}`}
                        onClick={() =>
                            setSearchParams({ page: String(index + 1) })
                        }
                    >
                        {index + 1}
                    </button>
                ))}
            </>
        )
    }
}
