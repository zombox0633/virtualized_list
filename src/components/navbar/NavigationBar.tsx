import { NavLink } from "react-router-dom"
import ToggleThemeButton from "./ToggleThemeButton"

function NavigationBar() {
  return (
    <nav className="sticky inset-0 flex w-full items-center justify-between bg-(--color-rich-black) text-white px-6 py-4">
      <div className="flex items-center gap-4">
        <ToggleThemeButton />
        <NavLink to={"/"}>
          <span className="text-2xl uppercase">home</span>
        </NavLink>
      </div>
      <div className="flex items-center gap-4">
        <NavLink to={"/sign-up"}>
          <span className="uppercase">sign up</span>
        </NavLink>
        <NavLink to={"/sign-in"}>
          <span className="uppercase">sign in</span>
        </NavLink>
        <button>cart</button>
      </div>
    </nav>
  )
}

export default NavigationBar
