import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./shared/components/Home/Home"
import MainPage from "./shared/components/MainPage/MainPage"
import MainNavigation from "./shared/components/Navigation/MainNavigation"

import NewCard from "./flashcard/pages/NewCard"
import UpdateCard from "./flashcard/pages/UpdateCard"
import UserCards from "./flashcard/pages/UserCards"

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
              <Route path="/card/:cardId" element={<UpdateCard/>}/>
            </Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
