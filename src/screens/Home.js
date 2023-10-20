import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Card from '../components/card';
export default function Home() {

  const [search, setSearch] = useState('');


  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);
  const loadData = async () => {
    let response = await fetch("http://localhost:5000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    response = await response.json();
    setFoodItem(response[0]);
    setFoodCat(response[1]);
    // console.log(response[0],response[1]);
  }
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div>
      <div><Navbar /></div>
      <div><div id="carouselExampleIndicators" className="carousel slide carousel-fade" style={{ objectFit: "contain !important" }}>
        <div className="carousel-inner" id="carousel">

          <div className="carousel-item active">
            <img src="https://source.unsplash.com/random/900×700/?pizza" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?pizzahut" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
          </div>
          <div className="carousel-item">
            <img src="https://source.unsplash.com/random/900×700/?pizzaslice" className="d-block w-100" alt="..." style={{ filter: "brightness(50%)" }} />
          </div>
        </div>
        <div className="carousel-captoin" style={{ zIndex: "10", width: "60%", position: "absolute", bottom: "40px", left: "50%", transform: "translateX(-50%)" }}>
          <form className="d-flex" role="search">
            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-outline-success text-white bg-success" type="submit" onClick={(e) => { e.preventDefault(); setSearch(e.target.form[0].value.toLowerCase()) }}>
              Search
            </button>

          </form>
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div></div>
     
      <div class="container">
        {
          foodCat.map((data) => {
            return (
              <div key={data._id}>
              <br/>

                <div className="fs-1-mt-3">{data.CategoryName}</div>
                <hr />
                <div className="scroll-container">
                  {
                    foodItem.filter((item) =>
                      item.CategoryName === data.CategoryName &&
                      item.name.toLowerCase().includes(search.toLowerCase())
                    )
                      .map(filterItems => {
                        return (
                          <div className='col-12 col-md-6 col-lg-3 m-3' key={filterItems._id}>
                            <Card foodItem={filterItems}
                              // foodName={filterItems.name}
                              options={filterItems.price_options}
                              // imgSrc={filterItems.img}
                            />
                          </div>
                        )
                      })
                  }
                </div>
              </div>
            )
          })
        }

      </div>
      <div><Footer /></div>
    </div>
  )
}
