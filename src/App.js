import React, { useState, useEffect } from "react";
import axios from "axios";
import Nav from "./components/nav.js";
import "./App.css";

const App = () => {
  const [menus, setMenus] = useState([]);

  const truncate = str => {
    return str.length > 10 ? str.substring(0, 100) + "..." : str;
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("https://deliveroo-api.now.sh/menu");
      console.log(response.data.menu);
      setMenus(response.data.menu);
    } catch (e) {
      console.log("An error occurred");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="nav">
        <Nav></Nav>
      </div>
      <div className="hero"></div>
      <ul>
        {Object.keys(menus).map((menu, index) => {
          console.log("Menus : " + menu);

          return (
            <div className="cardsWrapper">
              <div key={index}>
                <div>
                  <h1>{menu}</h1>
                </div>
              </div>
              <div className="categories">
                {menus[menu].map((meal, index) => {
                  return (
                    <div className="card">
                      <div className="cardTextElements">
                        <div key={index}>
                          {" "}
                          <h4>{meal.title}</h4>
                        </div>
                        <div key={index}>
                          <p className="description">
                            {truncate(meal.description)}
                          </p>
                        </div>
                        <div className="price" key={index}>
                          {meal.price + "€"}
                        </div>
                      </div>
                      <img className="images" key={index} src={meal.picture} />
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default App;
