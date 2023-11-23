import "./App.css";
import { Routes, Route, Link } from "react-router-dom";
import Detail from "./routes/Detail";
import Home from "./routes/Home";
import Event from "./routes/Event";
import Cart from "./routes/Cart";
import { useNavigate } from "react-router-dom";

import { Navbar, Container, Nav } from "react-bootstrap";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

function App() {
  let navigate = useNavigate();

  const result = useQuery({
    queryKey: ["result"],
    queryFn: () => {
      return (
        axios.get("https://codingapple1.github.io/userdata.json").then((a) => {
          return a.data;
        }),
        { staleTime: 2000 }
      );
    },
  });

  useEffect(() => {
    localStorage.setItem("watched", JSON.stringify([]));
  }, []);

  return (
    <div className="App">
      <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">ShoeShop</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link
              onClick={() => {
                navigate("/");
              }}
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/detail/0");
              }}
            >
              Detail
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate("/cart");
              }}
            >
              Cart
            </Nav.Link>
          </Nav>
          <Nav className="ms-auto">
            {result.isLoading ? "Loading..." : result.data.name}
          </Nav>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="event" element={<Event />}>
            <Route path="one" element={<div>첫 주문시 양배추즙 서비스</div>} />
            <Route path="two" element={<div>생일기념 쿠폰받기</div>} />
          </Route>
        </Route>
        <Route path="/detail/:id" element={<Detail navigate={navigate} />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </div>
  );
}

export default App;
