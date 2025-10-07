import { Outlet } from 'react-router'
import Header from '@/App/Layout/Components/Header'
import Sidebar from '@/App/Layout/Components/Sidebar'

const MasterLayout = () => {
    return (
        <div className='flex flex-col w-full min-h-screen bg-background'>
            <Header />
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default MasterLayout