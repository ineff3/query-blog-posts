import { Route, Routes } from 'react-router-dom'
import BasicLayout from './layouts/BasicLayout'
import { Home, PaginatedPosts, PostPage, Posts } from './pages/index'

const App = () => {
    return (
        <Routes>
            <Route element={<BasicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/posts">
                    <Route index element={<Posts />} />
                    <Route path=":postId" element={<PostPage />} />
                </Route>
                <Route path="/paginated-posts">
                    <Route index element={<PaginatedPosts />} />
                    <Route path=":postId" element={<PostPage />} />
                </Route>
            </Route>
        </Routes>
    )
}

export default App
