import { useState } from "react"
import { NavLink, useNavigate } from "react-router-dom"
import bcrypt from "bcryptjs"

import ToggleThemeButton from "./button/ToggleThemeButton"
import { validatePassword } from "../helpers/utils"

type AuthFormPropsType = {
  isLogin: boolean
}

type AuthFormInputType = {
  email: string
  password: string
}

const authFormInput_df = {
  email: "",
  password: "",
}

function AuthForm({ isLogin }: AuthFormPropsType) {
  const navigate = useNavigate()
  const [authFormInput, setAuthFormInput] =
    useState<AuthFormInputType>(authFormInput_df)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target
    setAuthFormInput((prev) => ({ ...prev, [name]: value }))
  }

  const handleRegister = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      if (!validatePassword(authFormInput.password)) {
        alert(
          "Password must be at least 8 characters long and contain both letters and numbers.",
        )
      }

      const users: AuthFormInputType[] = JSON.parse(
        localStorage.getItem("users") || "[]",
      )

      if (users.some((user) => user.email === authFormInput.email)) {
        alert("Email already registered!")
        return
      }

      const salt = await bcrypt.genSalt(10)
      const hashedPassword = await bcrypt.hash(authFormInput.password, salt)
      const newUser: AuthFormInputType = {
        email: authFormInput.email,
        password: hashedPassword,
      }

      users.push(newUser)
      localStorage.setItem("users", JSON.stringify(users))

      alert("Registered successfully! You can now log in.")
      setAuthFormInput(authFormInput_df)
      setTimeout(() => {
        navigate("/sign-in")
      }, 1000)
    } catch (error) {
      console.log(error)
      return
    }
  }

  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault()

    try {
      const users: AuthFormInputType[] = JSON.parse(
        localStorage.getItem("users") || "[]",
      )

      const user = users.find((user) => user.email === authFormInput.email)

      if (!user) {
        alert("User not found!")
        return
      }

      const isMatch = await bcrypt.compare(
        authFormInput.password,
        user.password,
      )
      if (!isMatch) {
        alert("Password Incorrect!")
        return
      }

      alert("Login successful!")
      localStorage.setItem("avatar", JSON.stringify(user.email))
      setAuthFormInput(authFormInput_df)
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } catch (error) {
      console.log(error)
      return
    }
  }

  return (
    <div className="relative flex h-screen items-center justify-center">
      <div className="absolute top-0 flex w-full items-center justify-between p-4">
        <NavLink to={"/"} className="text-base hover:text-blue-500">
          <button className="rounded-sm border-2 bg-white p-1 text-center dark:bg-(--color-rich-black) dark:text-white">
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
                d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
              />
            </svg>
          </button>
        </NavLink>
        <ToggleThemeButton />
      </div>
      <div className="w-full max-w-md border-2 p-6 shadow-lg">
        <h2 className="text-center text-2xl font-semibold">
          {isLogin ? "Sign In" : "Sign Up"}
        </h2>
        <form
          onSubmit={isLogin ? handleLogin : handleRegister}
          className="mt-4"
        >
          <div className="mt-3">
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={authFormInput?.email}
              required
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 p-2"
            />
          </div>
          <div className="mt-3">
            <label className="block text-sm font-medium">Password</label>
            <input
              type="password"
              name="password"
              minLength={8}
              placeholder="Your password"
              value={authFormInput?.password}
              required
              onChange={handleInputChange}
              className="mt-1 w-full border border-gray-300 p-2"
            />
            <p className="pt-1 text-[10px]">
              must contain at least 1 letter and 8 characters
            </p>
          </div>
          <button
            type="submit"
            className={`mt-4 w-full border-2 py-2 transition hover:border-blue-500 hover:text-blue-500`}
          >
            {isLogin ? "Login" : "Register"}
          </button>
        </form>
        <p className="mt-4 flex items-end justify-center gap-x-2">
          <span className="text-sm">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
          </span>
          <NavLink
            to={isLogin ? "/sign-up" : "/sign-in"}
            className="text-base hover:text-blue-500"
          >
            {isLogin ? "sign up" : "sign in"}
          </NavLink>
        </p>
      </div>
    </div>
  )
}

export default AuthForm
