import { Outlet } from "react-router-dom"
import NavigationBar from "./navbar/NavigationBar"
// import Backdrop from "./Backdrop"

function Layout() {
  return (
    <div className="relative z-0 flex h-screen w-full items-center justify-center flex-col">
      <NavigationBar />
      {/* <Backdrop/> */}
      <main className="w-full max-w-7xl flex-grow p-6">
        <Outlet />
      </main>
    </div>
  )
}

export default Layout
