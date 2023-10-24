'use client'
import { useRouter } from "next/navigation";
import AppTable from '@/components/posts/app.tables';
import useSWR from 'swr';
import Cookies from 'js-cookie';

const BlogsPost = () => {

    const router = useRouter();

    const handleBtn = () => {
        router.push('/')
    }
    return (
        <div className="blogs-post col-9 mt-5">
            <AppTable blogs={[]} categories={[]} />
        </div>
    )
}

export default BlogsPost;