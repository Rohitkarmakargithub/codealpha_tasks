import React, { useEffect, useState, useRef } from 'react'
import { useDispatchCart, useCart } from './ContextReducer';
export default function Card(props) {

  let dispatch = useDispatchCart();
  let data = useCart();
  const priceRef = useRef();
  let options = props.options;
  let priceOptions = props.options ? Object.keys(props.options) : [];
  let foodItem = props.foodItem;
  const [qty, setQty] = useState(1)
  const [size, setSize] = useState("")
  const handleAddToCart = async () => {
    let food = []
    for (const item of data) {
      if (item.id === props.foodItem._id) {
        food = item;
        break;
      }
    }

    if (food !== 0) {
      if (food.size === size) {
        await dispatch({ type: "UPDATE", id: foodItem._id, price: finalPrice, qty: qty })
        return
      }
      else if (food.size !== size) {
        await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size,img: props.ImgSrc })
        console.log("Size different so simply ADD one more to the list")
        return
      }
      return
    }

    await dispatch({ type: "ADD", id: foodItem._id, name: foodItem.name, price: finalPrice, qty: qty, size: size })


  }

  let finalPrice = qty * parseInt(options[size]);
  useEffect(() => {
    setSize(priceRef.current.value)
  }, [])

  return (
    <div>
      <div className="card mt-3" style={{ "width": "18rem", "height": "400px", "display": "inline-block", "marginRight": "10px" }}>
        <img src={props.foodItem.img} className="card-img-top" alt="..." style={{ height: "200px", width: "100%" }} />
        <div className="card-body">
          <h5 className="card-title">{props.foodItem.name}</h5>
          <div className='container w-100'>
            <select className='m-2 h-100 bg-success rounded' onChange={(_e) => setQty(_e.target.value)}>
              {Array.from(Array(6), (_, i) => {
                return (
                  <option key={i + 1} value={i + 1}>{i + 1}</option>
                )
              })}
            </select>

            <select className='m-2 h-100 bg-success rounded' ref={priceRef} onChange={(_e) => setSize(_e.target.value)}>
              {
                priceOptions.map((data) => {
                  return <option key={data} value={data}>{data}</option>
                })
              }
            </select>

            <div className='d-inline -100 fs-5'>
              {finalPrice}/-
            </div>
            <hr>
            </hr>
            <button className={'btn btn-success justify-center ms-2'} onClick={handleAddToCart}>Add to Cart</button>
          </div>
        </div>
      </div>

    </div>
  )
}
