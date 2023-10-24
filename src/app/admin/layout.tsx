
import type { Metadata } from 'next';
import Sidebar from './sidebar';
import Cookies from 'js-cookie';

export const metadata: Metadata = {
    title: 'Admin Panel',
    description: 'Admin Panel',
}
export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
