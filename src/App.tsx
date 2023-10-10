import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddCard from "./flashcard/pages/AddCard/AddCard"
import Home from "./shared/components/Home/Home"
import MainPage from "./shared/components/MainPage/MainPage"
import MainNavigation from "./shared/components/Navigation/MainNavigation"

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
              <Route path="/add-card" element={<AddCard />}/>
            </Route>
        </Routes>
      </main>
    </BrowserRouter>
  )
}

export default App
