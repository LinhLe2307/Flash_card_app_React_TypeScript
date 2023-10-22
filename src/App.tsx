import { useCallback, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import Home from "./shared/components/Home/Home"
import MainPage from "./shared/components/MainPage/MainPage"
import MainNavigation from "./shared/components/Navigation/MainNavigation"

import NewCard from "./flashcard/pages/NewCard"
import UpdateCard from "./flashcard/pages/UpdateCard"
import UserCards from "./flashcard/pages/UserCards"
import { AuthContext } from "./shared/context/auth-context"
import Auth from "./user/pages/Auth"
import { GenericProps } from "./shared/types/sharedTypes"

function App() {
  const [isLoggedIn, setIsLogin] = useState(false)
  const [userId, setUserId] = useState('')
  const client = new QueryClient()

  const login:GenericProps<string> = useCallback((uid) => {
    setIsLogin(true)
    setUserId(uid)
  }, [])
  const logout = useCallback(() => {
    setIsLogin(false)
    setUserId('')
  }, [])

  let routes;
  if (isLoggedIn) {
    routes = (
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Home />}/>
          <Route path="/card/new" element={<NewCard/>}/>
          <Route path="/:userId/cards" element={<UserCards />}/>
          <Route path="/card/:cardId" element={<UpdateCard/>}/>
          <Route path="/*" element={ <Navigate to="/" /> } />
        </Route>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Home />}/>
          <Route path="/card/new" element={<NewCard/>}/>
          <Route path="/:userId/cards" element={<UserCards />}/>
          <Route path="/card/:cardId" element={<UpdateCard/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/*" element={ <Navigate to="/auth" /> } />
        </Route>
      </Routes>
    )
  }

  return (
    <QueryClientProvider client={client}>
      <AuthContext.Provider value={{isLoggedIn: isLoggedIn, userId: userId, login:login, logout: logout}}>
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
