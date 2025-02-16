import { NavLink } from "react-router-dom"
import ToggleThemeButton from "./ToggleThemeButton"

function NavigationBar() {
  return (
    <nav className="sticky inset-0 z-10 w-full">
      <div className="relative flex w-full items-center justify-between px-6 py-4">
        <div className=" absolute inset-0 backdrop-blur-2xl -z-10"/>
        <div className="flex items-center gap-x-8">
          <ToggleThemeButton />
          <div className="flex items-end gap-x-4">
            <NavLink to={"/"}>
              <span className="text-2xl uppercase">home</span>
            </NavLink>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <NavLink to={"/sign-up"} className="uppercase">
            sign up
          </NavLink>
          <NavLink to={"/sign-in"} className="uppercase">
            sign in
          </NavLink>
          {/* <button>cart</button> */}
        </div>
      </div>
    </nav>
  )
}

export default NavigationBar
