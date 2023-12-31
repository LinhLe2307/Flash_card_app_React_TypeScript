import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./shared/components/Home/Home"
import MainPage from "./shared/components/MainPage/MainPage"
import MainNavigation from "./shared/components/Navigation/MainNavigation"

import CardDetail from "./flashcard/components/CardDetail"
import NewCard from "./flashcard/pages/NewCard"
import UpdateCard from "./flashcard/pages/UpdateCard"
import UserCards from "./flashcard/pages/UserCards"
import { AuthContext } from "./shared/context/auth-context"
import { useAuth } from "./shared/hooks/auth-hook"
import Auth from "./user/pages/Auth"


function App() {
  const client = new QueryClient()
  const { token, userId, login, logout } = useAuth()

  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Home />}/>
          <Route path="/card/new" element={<NewCard/>}/>
          <Route path="/cards-user/:userId" element={<UserCards />}/>
          <Route path="/card-detail/:cardId" element={<CardDetail />}/>
          <Route path="/card-update/:cardId" element={<UpdateCard/>}/>
          <Route path="/*" element={ <Navigate to="/" /> } />
        </Route>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Home />}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/*" element={ <Navigate to="/auth" /> } />
        </Route>
      </Routes>
    )
  }

  return (
    <QueryClientProvider client={client}>
      <AuthContext.Provider value={{isLoggedIn: !!token, userId: userId, token: token, login:login, logout: logout}}>
          <BrowserRouter>
            <MainNavigation />
            <main>
                    {routes}
            </main>
          </BrowserRouter>
      </AuthContext.Provider>
    </QueryClientProvider>
  )
}

export default App
