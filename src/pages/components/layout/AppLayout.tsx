import { Outlet } from 'react-router-dom'

const AppLayout = () => {
    return (
        <>
            <div>
                <h1>これはレイアウト部分です</h1>
            </div>
            <Outlet></Outlet>
        </>
    )
}

export default AppLayout
