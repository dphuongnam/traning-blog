'use client'
import { useRouter } from "next/navigation";
import AppTable from '@/components/posts/post.tables';
import Sidebar from "./sidebar";
import useSWR from 'swr';
import Cookies from 'js-cookie';

const BlogsPost = () => {

    const router = useRouter();

    const handleBtn = () => {
        router.push('/')
    }
    return (
        <div className='post-page' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Sidebar />
            <div className="blogs-post col-9 mt-5">
                <AppTable blogs={[]} categories={[]} />
            </div>
        </div>

    )
}

export default BlogsPost;