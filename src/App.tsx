import { useCallback, useState } from "react"
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import Home from "./shared/components/Home/Home"
import MainPage from "./shared/components/MainPage/MainPage"
import MainNavigation from "./shared/components/Navigation/MainNavigation"

import NewCard from "./flashcard/pages/NewCard"
import UpdateCard from "./flashcard/pages/UpdateCard"
import UserCards from "./flashcard/pages/UserCards"
import { AuthContext } from "./shared/context/auth-context"
import Auth from "./user/pages/Auth"

function App() {
  const [isLoggedIn, setIsLogin] = useState(false)

  const login = useCallback(() => {
    setIsLogin(true)
  }, [])
  const logout = useCallback(() => {
    setIsLogin(false)
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
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/*" element={ <Navigate to="/auth" /> } />
        </Route>
      </Routes>
    )
  }

  return (
    <AuthContext.Provider value={{isLoggedIn: isLoggedIn, login:login, logout: logout}}>
        <BrowserRouter>
          <MainNavigation />
          <main>
                  {routes}
          </main>
        </BrowserRouter>

    </AuthContext.Provider>
  )
}

export default App
