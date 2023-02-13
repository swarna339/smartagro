import { Tabs, ProductCard, Header } from "../Components/index";

import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

//actions
import {
  fetchAsyncThunk,
  getAllProducts,
  getItemsFromcart,
} from "../features/products/productSlice";

import styles from "../styles/Home.css";

function Home() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAsyncThunk());
  }, []);

  //get the product list from state
  const products = useSelector(getAllProducts);

  //get the cart items from state
  const cartItmes = useSelector(getItemsFromcart);

  //to toggle between sessions
  const [showVeg, setShowVeg] = useState(true);

  //to render list based on selection
  function renderCards(products) {
    if (products != undefined) {
      const renderedProducts = products.map((product) => {
        return <ProductCard product={product} />;
      });

      return renderedProducts;
    }
  }
  //to seletc the produts from state based on user action
  function showVegorFruit() {
    if (showVeg) {
      //sends men product
      return renderCards(products.vegetables);
    } else {
      //sends women product
      return renderCards(products.fruits);
    }
  }

  return (
    <>
      <Header />
      <div className={styles.homeWrapper}>

        {/* tab components show the product sessions */}
        <Tabs setShowVeg={setShowVeg} showVeg={showVeg} />

        {/* displays products from product sessoion */}
        <div className={styles.cardsContainer}>{showVegorFruit()}</div>
        
      </div>
    </>
  );
}

export default Home;