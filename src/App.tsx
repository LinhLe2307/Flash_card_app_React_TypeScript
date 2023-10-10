import { Route, Routes } from "react-router-dom"
import MainPage from "./shared/components/MainPage/MainPage"
import Home from "./shared/components/Home/Home"
import AddCard from "./flashcard/pages/AddCard/AddCard"
import Header from "./shared/components/Header/Header"

function App() {

  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Home />}/>
          <Route path="/add-card" element={<AddCard />}/>
        </Route>
      </Routes>
    </>
  )
}

export default App
