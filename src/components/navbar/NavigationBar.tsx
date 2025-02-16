import { NavLink, useNavigate } from "react-router-dom"
import ToggleThemeButton from "../button/ToggleThemeButton"

function NavigationBar() {
  const navigate = useNavigate()
  const avatar = localStorage.getItem("avatar")

  const handleLogout = () => {
    localStorage.removeItem("avatar")
    navigate("/sign-in")
  }

  return (
    <nav className="sticky inset-0 z-10 w-full">
      <div className="relative flex w-full items-center justify-between px-6 py-4">
        <div className="absolute inset-0 -z-10 backdrop-blur-2xl" />
        <div className="flex items-center gap-x-8">
          <ToggleThemeButton />
          <div className="flex items-end gap-x-4">
            <NavLink to={"/"}>
              <span className="text-2xl uppercase">home</span>
            </NavLink>
          </div>
        </div>
        {avatar ? (
          <div className="flex items-center gap-4">
            <button className="flex h-10 w-10 items-center justify-center rounded-sm bg-amber-400 font-bold">
              {avatar.charAt(1).toUpperCase()}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="flex h-10 w-10 items-center justify-center rounded-sm border-2 bg-transparent"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="m12.75 15 3-3m0 0-3-3m3 3h-7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <NavLink to={"/sign-up"} className="uppercase">
              sign up
            </NavLink>
            <NavLink to={"/sign-in"} className="uppercase">
              sign in
            </NavLink>
          </div>
        )}
      </div>
    </nav>
  )
}

export default NavigationBar
