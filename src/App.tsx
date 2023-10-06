import { Container } from "react-bootstrap"
import { Route, Routes } from "react-router-dom"
import MainPage from "./components/MainPage/MainPage"
import Home from "./components/Home/Home"

function App() {

  return (
    <Container>
      <Routes>
        <Route path="/" element={<MainPage />}>
          <Route index element={<Home />}/>
        </Route>
      </Routes>
    </Container>
  )
}

export default App
