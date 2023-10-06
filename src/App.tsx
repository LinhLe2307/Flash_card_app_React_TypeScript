import { Route, Routes } from "react-router-dom"
import MainPage from "./components/MainPage/MainPage"
import Home from "./components/Home/Home"
import AddCard from "./features/FlashCard/pages/AddCard/AddCard"
import Header from "./components/Header/Header"

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
