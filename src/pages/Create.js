import React  from "react";

// components

import { Navbar } from "../Components/index";

//reactforms
import { useForm } from "react-hook-form";

//uuid for unique id
import { v4 as uuidv4 } from "uuid";

import { useDispatch } from "react-redux";

//create new product
import { addAsyncThunk } from "../features/products/productSlice";

//react router dom
import { useNavigate } from "react-router-dom";

//tostify
import { toast, ToastContainer } from "react-toastify";

import styles from "../styles/Create.module.css";

//to reset to default value and show this a  the inital value through react forms
const defaultValues = {
  quantity: "",
  vegetable: "",
  name: "",
  amount: "",
  description:"",
  url: "",
};

function Create() {
  const dispatch = useDispatch();

  //destructruing objects from useForms

  const navigate = useNavigate();

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({ defaultValues });

  //function to disptch async action and rest the data of form and navigate to home page
  const createAproduct = async (data) => {
    const uniqueid = uuidv4;

    const newProduct = {
      id: uniqueid,
      ...data,
    };

    const response = dispatch(addAsyncThunk(newProduct));

    reset({
        quantity:"",
      vegetable: "",
      name: "",
      amount: "",
      description:"",
      url: "",
    });
    //if fulfilled navigat to home
    if (response.type === "products/addAsyncThunk/fulfilled") {
      navigate("/");
    }
  };
  return (
    <>
      <Navbar />
      <div className={styles.detailsWrapper}>
        <div className={styles.detailForms}>
          <h1>Create product</h1>
          <form
            onSubmit={handleSubmit((product) => {
              //create a new product in db after vallidation
              createAproduct(product);
            })}
          >
            <fieldset>
              {/* name */}
              <div className={styles.inputGroup}>
                <label for="pname">Product name:</label>
                <input
                  id="pname"
                  placeholder="Product Name"
                  name="name"
                  type="text"
                  {...register("name", { required: true, maxLength: 200 })}
                />
              </div>
              {/* price */}
              <div className={styles.inputGroup}>
                <label for="pprice">Product Price:</label>
                <input
                  id="pprice"
                  placeholder="Product Price"
                  type="number"
                  name="amount"
                  {...register("amount", { required: true, maxLength: 10000 })}
                />
              </div>
              {/* size */}
              {/* description */}
              <div className={styles.inputGroup}>
                <label for="pd">Product description:</label>
                <input
                  id="pd"
                  name="description"
                  placeholder="Product descriptiob"
                  {...register("description", { required: true })}
                />
              </div>
          
              
                {/* image */}
              <div className={styles.inputGroup}>
                <label for="pUrl">Product image url:</label>
                <input
                  id="pUrl"
                  placeholder="Product image url"
                  name="url"
                  {...register("url", { required: true })}
                />
              </div>

              <br />

              <button
                type="submit"

                // handles submit aciton 


                onClick={() => {
                  //form validation
                  if (
                    errors.url ||
                    errors.quantity ||
                    errors.name ||
                    errors.vegetable ||
                    errors.amount
                  ) {
                    //if not filled 
                    toast.warn("fill all feald", {
                      autoClose: 600,
                      theme: "colored",
                    });
                  }
                }}
              >
                submit
              </button>
            </fieldset>
          </form>
          
          {/* to send notification */}
          <ToastContainer />
        </div>
      </div>
    </>
  );
}

export default Create;