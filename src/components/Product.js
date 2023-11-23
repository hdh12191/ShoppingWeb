import { Link } from "react-router-dom";

const Product = (props) => {
 

  return (
    <div className="col-md-4">
      <img
        src={"https://codingapple1.github.io/shop/shoes" + props.i + ".jpg"}
        width="80%"
        alt=""
      />
      <Link to={`/detail/${props.shoes.id}`}><h4>{props.shoes.title}</h4></Link>
      <p>{props.shoes.content}</p>
      <p>{`$${props.shoes.price}`}</p>
    </div>
  );
};

export default Product;
