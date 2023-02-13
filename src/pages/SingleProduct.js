

//components
import { Navbar } from "../Components/index";

//react hooks
import React, { useEffect, useState } from "react";

//redux
import { useDispatch, useSelector } from "react-redux";

//router dom
import { useNavigate, useParams } from "react-router-dom";

//redux thunks
import {
  getMovieAsyncThunk,
  addToFavAsyncThunk,
  getItemsFromcart,
  deleteProductAsyncThunk,
  deleteFromFavAsyncThunk,
} from "../features/products/productSlice";

import styles from "../styles/Singleproduct.css";

function SingleProduct() {
  //gets id from the url
  let { id } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //state to hold the fetched product detial
  const [product, setProduct] = useState({});

  const cartItmes = useSelector(getItemsFromcart);

  //fetches the details on page reload
  useEffect(() => {
    const getdatas = async () => {
      const response = dispatch(getMovieAsyncThunk(id));
      if (response.type === "products/getMovieAsyncThunk/fulfilled") {
        setProduct(response.payload);
      }
    };

    getdatas();
  }, []);

  //fucntion to check is the product is false

  function checkFav(id) {
    let result = false;
    if (cartItmes !== undefined) {
      //iterates over the product to check is the produc is fav
      cartItmes.map((item) => {
        if (item.id === id) {
          result = true;
        }
      });
    }
    return result;
  }

  //detlet a product
  const deleteItem = async (id) => {
    const response = dispatch(deleteProductAsyncThunk(id));
    if (response.type === "products/deleteProductAsyncThunk/fulfilled") {
      navigate(`/`);
    }
  };

  return (
    <>
      <Navbar />
      <div className={styles.detailsWrapper}>
        <div className={styles.imageContainer}>
          <div className={styles.mainImgContainer}>
            <img src={product.url} />
          </div>

          <div className={styles.secondaryImgContainer}>
            <div className={styles.secondaryImages}>
              <img className={styles.images} src={product.url} />
              <img className={styles.images} src={product.url} />
            </div>
          </div>
        </div>

        <div className={styles.detailsContainer}>
          <h3>{product.name}</h3>
          <h3>{product.price}$</h3>
          <h3>Price {product.price}</h3>
          <h3>Quantity {product.quantity}</h3>
          

          {/* favourtie and unfavourite button */}
          <button
            onClick={() => {
              if (checkFav(product.id)) {
                dispatch(deleteFromFavAsyncThunk(product));
                console.log("dele to fav")
              } else {
                console.log("add to fav")
                dispatch(addToFavAsyncThunk({ ...product, quantity: 1 }));
              }
            }}
          >
            {checkFav(product.id) ? "Remove from cart" : "Add to cart"}
          </button>

          {/* delte the product butotn */}
          <button
            onClick={() => {
              deleteItem(product.id);
            }}
          >
            Delete product
          </button>
        </div>
      </div>
    </>
  );
}

export default SingleProduct;