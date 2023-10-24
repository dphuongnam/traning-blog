'use client'
import { useRouter } from "next/navigation";
import AppTable from '@/components/posts/app.tables';
import useSWR from 'swr';
import Cookies from 'js-cookie';
import CategoryTable from "@/components/category/category.tables";

const CategoryTableView = () => {

    const router = useRouter();

    const handleBtn = () => {
        router.push('/')
    }
    return (
        <div className="category-table col-9 mt-5">
            <CategoryTable categories={[]} blogs={[]} setBlogPosts={function (value: IBlog[]): void {
                throw new Error("Function not implemented.");
            }} />
        </div>
    )
}

export default CategoryTableView;