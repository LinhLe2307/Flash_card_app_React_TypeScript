import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import React, { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import '@fontsource/raleway'; // Defaults to weight 400
import '@fontsource/raleway/700.css'; // For weight 700

import Loader from './common/Loader';
import { AuthContext } from './context/authContext';
import { useAuth } from './hooks/authHook';
import DefaultLayout from './layout/DefaultLayout';
import MainPage from './layout/MainPage';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Settings from './pages/Settings/Settings';
import ForgotPasswordEmail from './pages/ForgotPassword/ForgotPasswordEmail';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import { ForgotPasswordProvider } from './context/passwordContext';
import MyCards from './pages/MyCards/MyCards';
import CardItem from './pages/CardItem/CardItem';
import NewCard from './pages/Flashcard/NewCard';
import UpdateCard from './pages/Flashcard/UpdateCard';
import Dashboard from './pages/Dashboard/Dashboard';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  const uploadLink = createUploadLink({
    uri: 'https://flash-card-app-nodejs.fly.dev/',
    // uri: 'http://localhost:5068/',
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
      <Route path='/cards-user/:userId' element={<MyCards />}/>
      <Route path='/card-detail/:cardId' element={<CardItem />}/>
      <Route path='/card/new' element={<NewCard/>}/>
    </Route>

  )
  let routes;
  if (token) {
    routes = (
        <Routes>
          <Route path='/' element={<MainPage />}>
            <Route index element={<Dashboard />}/>
            <Route path='/card-update/:cardId' element={<UpdateCard />}/>
            {commonRoutes}
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
            <Route index element={<Dashboard />}/>
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
