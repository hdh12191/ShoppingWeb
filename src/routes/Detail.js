import { useEffect, useState } from "react";
import Data from "../data";
import { useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import { addItem } from "../store";
import { useDispatch } from "react-redux";

const Detail = (props) => {
  let [shoes] = useState(Data);
  let { id } = useParams();
  let [alerts, setAlerts] = useState(true);
  let [value, setValue] = useState(0);
  let [tab, setTab] = useState(0);
  let [fade2, setFade2] = useState("");
  let dispatch = useDispatch();

  let selectShoes = shoes.find((t) => {
    return t.id === parseInt(id);
  });

  useEffect(() => {
    let a = setTimeout(() => setAlerts(false), 2000);
    return () => {
      clearTimeout(a);
    };
  }, []);

  useEffect(() => {
    if (isNaN(value) == true) {
      alert("숫자만 입력해주세요!");
    }
  }, [value]);

  useEffect(() => {
    setTimeout(() => {
      setFade2("end");
    }, 1000);
  }, [fade2]);

  useEffect(() => {
    let getOut = localStorage.getItem("watched");
    getOut = JSON.parse(getOut);
    getOut.push(selectShoes.id);
    getOut = new Set(getOut);
    getOut = Array.from(getOut);
    localStorage.setItem("watched", JSON.stringify(getOut));
  }, []);

  return (
    <div className={`container start ${fade2}`}>
      {alerts === true ? (
        <div className="alert alert-warning">2초이내 구매시 할인 </div>
      ) : null}
      <div className="row">
        <div className="col-md-6">
          <img
            src={
              "https://codingapple1.github.io/shop/shoes" +
              (selectShoes.id + 1) +
              ".jpg"
            }
            width="100%"
            alt=""
          />
        </div>
        <div className="col-md-6">
          <input
            onChange={(e) => {
              setValue(e.target.value);
            }} placeholder="숫자만 입력해주세요."
          />
          <h4 className="pt-5">{selectShoes.title}</h4>
          <p>{selectShoes.content}</p>
          <p>{selectShoes.price}</p>
          <button
            className="btn btn-danger"
            onClick={() => {
              dispatch(
                addItem({
                  id: selectShoes.id,
                  name: selectShoes.title,
                  count: 1,
                })
              );
              props.navigate("/cart");
            }}
          >
            주문하기
          </button>
        </div>
      </div>

      <Nav variant="tabs" defaultActiveKey="link0">
        <Nav.Item>
          <Nav.Link onClick={() => setTab(0)} eventKey="link0">
            버튼0
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(1)} eventKey="link1">
            버튼1
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link onClick={() => setTab(2)} eventKey="link2">
            버튼2
          </Nav.Link>
        </Nav.Item>
      </Nav>
      {<TabContent tab={tab} />}
    </div>
  );

  function TabContent({ tab }) {
    let [fade, setFade] = useState("");

    useEffect(() => {
      setTimeout(() => {
        setFade("end");
      }, 500);
    }, [tab]);
    //   if(tab === 0){
    //     return <div>내용0</div>
    //   }
    //   if(tab === 1){
    //     return <div>내용1</div>
    //   }
    //   if(tab === 2){
    //     return <div>내용2</div>
    //   }

    return (
      <div className={`start ${fade}`}>
        {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
      </div>
    );
  }
};

export default Detail;
