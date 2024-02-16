import React from 'react'

const Home = () => {
    return (
        <>
            <div className=" hero pt-[4rem]">
                <div className=" hero-content w-full flex-row gap-5">
                    <div className=" flex flex-auto flex-col px-3 text-primary-content">
                        <div className=" w-fit rounded-3xl border border-secondary px-2 py-1 text-[12px] font-bold text-secondary ">
                            Award winning digital agency
                        </div>
                        <div className=" flex flex-col gap-5">
                            <div className=" text-6xl font-black tracking-[0.02rem]">
                                <span className=" text-primary">
                                    POST CREATION SOLUTIONS{' '}
                                </span>
                                <span className=" text-base-content">
                                    FOR CREATIVE INDIVIDUALS
                                </span>
                            </div>
                            <p className=" max-w-[350px] text-[12px] text-secondary">
                                Elevate Your Content Game with
                                Performance-Driven and Specialized Post Creation
                                & Sharing Solutions.
                            </p>
                            <div className=" flex gap-8">
                                <button className=" btn btn-primary rounded-3xl">
                                    Get Started
                                </button>
                                <button className=" btn btn-outline btn-neutral">
                                    Read Success Stories
                                </button>
                            </div>
                        </div>
                    </div>
                    <img
                        src="/message-post.png"
                        alt="posts"
                        className=" w-[38%]"
                    />
                </div>
            </div>
            <div className=" h-64">Some content</div>
        </>
    )
}

export default Home
