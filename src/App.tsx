import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import { AuthContext } from './context/authContext';
import { useAuth } from './hooks/authHook';
import DefaultLayout from './layout/DefaultLayout';
import MainPage from './layout/MainPage';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Settings from './pages/Settings';
import ForgotPasswordEmail from './pages/ForgotPassword/ForgotPasswordEmail';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import { ForgotPasswordProvider } from './context/passwordContext';
import Cards from './pages/Cards/Cards';
import CardItem from './pages/Cards/CardItem';
import NewCard from './pages/Flashcard/NewCard';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  const uploadLink = createUploadLink({
    // uri: 'https://flash-card-app-nodejs.fly.dev/',
    uri: 'http://localhost:5068/',
    headers: {
      'apollo-require-preflight': 'true', // This header helps to bypass CSRF checks
    },
  })

  const client = new ApolloClient({
    link: uploadLink, 
    cache: new InMemoryCache()
  })
  const { token, userId, login, logout, image } = useAuth()

  const commonRoutes = (
    <Route>
      {/* <Route path='/all-users' element={<Users/>}/> */}
      {/* <Route path='/cards-user/:userId/:tag' element={<UserCards />}/> */}
      <Route path='/cards-user/:userId' element={<Cards/>}/>
      {/* <Route path='/cards-user/:userId' element={<Cards/>}/> */}
      {/* <Route path='/user-detail/:userId' element={<UserDetail />}/> */}
      <Route path='/card-detail/:cardId' element={<CardItem />}/>
      <Route path='/card/new' element={<NewCard/>}/>
    </Route>

  )
  let routes;
  if (token) {
    routes = (
        <Routes>
          <Route path='/' element={<MainPage />}>
            <Route index element={<Settings />}/>
            {commonRoutes}
            {/* <Route path='/card/new' element={<NewCard/>}/>
            <Route path='/card-update/:cardId' element={<UpdateCard/>}/>
            */}
            <Route path='/settings' element={<Settings />}/>
            <Route path='*' element={ <Navigate to='/' /> } />
          </Route>
        </Routes>
    )
  } else {
    routes = (
      <ForgotPasswordProvider>
        <Routes>
          <Route path='/' element={<MainPage />}>
            <Route index element={<Settings />}/>
            <Route path='/auth/signin' element={<SignIn/>}/>
            <Route path='/auth/signup' element={<SignUp/>}/>
            <Route path='/auth/forgot-password' element={<ForgotPasswordEmail />}/>
            <Route path='/auth/reset-password/:token' element={<ForgotPassword />}/>
            {commonRoutes}
            {/*
            <Route path='*' element={ <Navigate to='/auth' /> } /> */}
          </Route>
        </Routes>
      </ForgotPasswordProvider>
    )
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <ApolloProvider client={client}>
      <AuthContext.Provider value={{isLoggedIn: !!token, userId: userId, token: token, login:login, logout: logout, image: image}}>
          <DefaultLayout>
              {routes}
          </DefaultLayout>
      </AuthContext.Provider>
    </ApolloProvider>
  );
}

export default App;
