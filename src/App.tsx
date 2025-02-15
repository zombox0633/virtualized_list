import { Route, Routes } from "react-router-dom"
import Layout from "./components/Layout"
import ErrorPage from "./pages/ErrorPage"
import HomePage from "./pages/HomePage"
import SignInPage from "./pages/SignInPage"
import SignUpPage from "./pages/SignUpPage"
import AdminPage from "./pages/AdminPage"

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="admin" element={<AdminPage />} caseSensitive />
        </Route>
        <Route path="sign-in" element={<SignInPage />} caseSensitive />
        <Route path="sign-up" element={<SignUpPage />} caseSensitive />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </>
  )
}

export default App
