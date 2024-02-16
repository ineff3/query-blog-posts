const SkeletonPost = () => {
    return (
        <div className="flex flex-col gap-4 w-full">
            <div className="skeleton h-[200px] w-full"></div>
            <div className="skeleton h-4 w-40"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
            <div className="skeleton h-4 w-full"></div>
        </div>
    )
}

export default SkeletonPost