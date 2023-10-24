'use client'
import { useRouter } from "next/navigation";
import AppTable from '@/components/posts/post.tables';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import Sidebar from "./sidebar";
import CategoryTable from "@/components/category/category.tables";

const CategoryTableView = () => {

    const router = useRouter();

    const handleBtn = () => {
        router.push('/')
    }
    return (
        <div className='post-page' style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Sidebar />
            <div className="category-table col-9 mt-5">
                <CategoryTable categories={[]} blogs={[]} setBlogPosts={function (value: IBlog[]): void {
                    throw new Error("Function not implemented.");
                }} />
            </div>
        </div>
    )
}

export default CategoryTableView;