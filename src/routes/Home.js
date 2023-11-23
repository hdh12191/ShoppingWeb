import Product from "../components/Product";
import { useState } from "react";
import Data from "../data";
import axios from "axios";

const Home = () => {
  let [shoes, setShoes] = useState(Data);
  let [count, setCount] = useState(0);

  return (
    <>
      <div className="main-bg"></div>
      <div className="container">
        <div className="row">
          {shoes.map((a, i) => {
            return <Product shoes={shoes[i]} i={i + 1} key={i} />;
          })}
        </div>
      </div>
      <button
        onClick={() => {
          if (count === 0) {
            axios
              .get("https://codingapple1.github.io/shop/data2.json")
              .then((data2) => {
                shoes = [...shoes, ...data2.data];
                setShoes(shoes);
                setCount(count + 1);
              })
              .catch(() => {
                console.log("실패함");
              });
          } else if (count === 1) {
            axios
              .get("https://codingapple1.github.io/shop/data3.json")
              .then((data3) => {
                shoes = [...shoes, ...data3.data];
                setShoes(shoes);
                setCount(count + 1);
              })
              .catch(() => {
                console.log("실패함");
              });
          } else if (count === 2) {
            alert("상품이 없습니다!");
          }
        }}
      >
        더보기{count}
      </button>
    </>
  );
};

export default Home;
