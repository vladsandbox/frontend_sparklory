import { Outlet } from 'react-router-dom';
import CatalogSearchBar from '@/components/CatalogSearchBar';

export default function LayoutWithSearchBar() {
    return (
        <>
            <CatalogSearchBar />
            <Outlet />
        </>
    );
}