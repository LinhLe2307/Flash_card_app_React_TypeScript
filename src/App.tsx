import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddCard from "./flashcard/pages/AddCard/AddCard"
import Home from "./shared/components/Home/Home"
import MainPage from "./shared/components/MainPage/MainPage"
import MainNavigation from "./shared/components/Navigation/MainNavigation"

import UserCards from "./flashcard/pages/UserCards"
import NewCard from "./flashcard/pages/NewCard"

function App() {

  return (
    <BrowserRouter>
      {/* <Header /> */}
      {/* <MainNavigation /> */}
      <MainNavigation />
      <main>
        <Routes>
            <Route path="/" element={<MainPage />}>
              <Route index element={<Home />}/>
              {/* <Route path="/add-card" element={<AddCard />}/> */}
              <Route path="/:userId/cards" element={<UserCards />}/>
              <Route path="/card/new" element={<NewCard/>}/>
            </Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
