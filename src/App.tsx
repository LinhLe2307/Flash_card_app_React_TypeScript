import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './shared/components/HomePage/HomePage';
import MainPage from './shared/components/MainPage/MainPage';
import MainNavigation from './shared/components/Navigation/MainNavigation';

import CardDetail from './flashcard/components/CardDetail/CardDetail';
import NewCard from './flashcard/pages/NewCard';
import UpdateCard from './flashcard/pages/UpdateCard';
import UserCards from './flashcard/pages/UserCards';
import { AuthContext } from './shared/context/auth-context';
import { useAuth } from './shared/hooks/auth-hook';
import UserDetail from './user/components/UserDetail/UserDetail';
import Auth from './user/pages/Auth';
import Settings from './user/pages/Settings';
import Users from './user/pages/Users';


function App() {
  const client = new QueryClient()
  const { token, userId, login, logout } = useAuth()

  const commonRoutes = (
    <Route>
      <Route path='/all-users' element={<Users/>}/>
      <Route path='/cards-user/:userId' element={<UserCards />}/>
      <Route path='/user-detail/:userId' element={<UserDetail />}/>
      <Route path='/card-detail/:cardId' element={<CardDetail />}/>
    </Route>

  )
  let routes;
  if (token) {
    routes = (
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route index element={<HomePage />}/>
          <Route path='/card/new' element={<NewCard/>}/>
          <Route path='/card-update/:cardId' element={<UpdateCard/>}/>
          {commonRoutes}
          <Route path='/settings' element={<Settings />}/>
          <Route path='*' element={ <Navigate to='/' /> } />
        </Route>
      </Routes>
    )
  } else {
    routes = (
      <Routes>
        <Route path='/' element={<MainPage />}>
          <Route index element={<HomePage />}/>
          <Route path='/auth' element={<Auth/>}/>
          {commonRoutes}
          <Route path='*' element={ <Navigate to='/auth' /> } />
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
