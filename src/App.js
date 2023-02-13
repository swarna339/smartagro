import { BrowserRouter,Routes,Route } from 'react-router-dom';
import './App.css';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartAsyncThunk } from "./features/products/productSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import {Home,Create,SingleProduct,Cart} from "../src/pages/index";
import { Header } from './Components';




function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(cartAsyncThunk());
  });
  return (
    <BrowserRouter>
    <div className="App">
      <Routes>
      <Route path="/" element={<Home />} />
          <Route path="singleproduct/:id" element={<SingleProduct />} />
          <Route path="cart" element={<Cart />} />
          <Route path="create" element={<Create />} />
      </Routes>
      <ToastContainer />
    </div>
    </BrowserRouter>
  );
}


export default App;
