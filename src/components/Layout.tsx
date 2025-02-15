import { Outlet } from "react-router-dom"
import NavigationBar from "./navbar/NavigationBar"
// import Backdrop from "./Backdrop"

function Layout() {
  return (
    <div className="relative z-0 flex h-screen w-full flex-col items-center justify-center">
      <NavigationBar />
      {/* <Backdrop/> */}
      <main className="w-full max-w-7xl flex-grow p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
