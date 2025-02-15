import { useNavigate } from "react-router"

function ErrorPage() {
  const navigate = useNavigate()
  return (
    <div className="grid h-dvh w-full grid-rows-6 p-4 text-xl sm:p-8 md:p-12">
      <span className="font-medium">404</span>
      <div className="row-start-2 sm:row-start-3">
        <div className="my-8">
          <h1>Page not found</h1>
        </div>
        <p>The page you are looking for doesn't exist.</p>
        <div className="mt-12">
          <button
            type="button"
            className="button__df_theme"
            onClick={() => navigate("/")}
          >
            home
          </button>
        </div>
      </div>
    </div>
  )
}

export default ErrorPage
