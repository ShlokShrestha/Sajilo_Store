import React, { useEffect, useState } from "react";
import SiderBar from "./SiderBar";
import "./admin.css";
import { useDispatch, useSelector } from "react-redux";
import { clearErrors, createProduct } from "../../actions/productAction";
import { useNavigate } from "react-router-dom";
import { NEW_PRODUCT_RESET } from "../../contants/productConstants";
import Navbar from "./Navbar";
const NewProduct = () => {
  const navigate = useNavigate();

  const categories = [
    "Electronic",
    "Clothing",
    "Bags",
    "Footwear",
    "Accessories",
  ];
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.newProduct);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [Stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  useEffect(() => {
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (success) {
      alert("Product Create Succesfully");
      navigate("/admin/dashboard");
      dispatch({ type: NEW_PRODUCT_RESET });
    }
  }, [dispatch, error, navigate, success]);

  const createProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("Stock", Stock);
    myForm.append("category", category);
    myForm.append("description", description);
    images.forEach((image) => myForm.append("images", image));
    dispatch(createProduct(myForm));
  };

  const createProductImagesChange = (e) => {
    const file = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);

    file.forEach((file) => {
      const render = new FileReader();
      render.onload = () => {
        if (render.readyState === 2) {
          setImagesPreview((old) => [...old, render.result]);
          setImages((old) => [...old, render.result]);
        }
      };

      render.readAsDataURL(file);
    });
  };
  return (
    <>
      <div className="bg-light">
        <div className="container-fluid row">
          <div className="col-lg-3">
            <Navbar />
          </div>

          <div className="col-lg-9 col-md-12 col-12 mt-5">
            <h3 className="my-4">Add New Product</h3>
            <div className="line mb-4"></div>

            <form
              className="mx-auto bg-white p-4 shadow-sm my-3"
              onSubmit={createProductSubmitHandler}
            >
              <div className="mb-3">
                <label className="form-label" encType="multipart/form-data">
                  Product Name
                </label>
                <input
                  type="Text"
                  className="form-control shadow-none"
                  placeholder="Product Name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Price</label>
                <input
                  type="number"
                  className="form-control shadow-none"
                  placeholder="Product Price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control shadow-none"
                  placeholder="Product Stock"
                  onChange={(e) => setStock(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select shadow-none"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  <option disabled>Choose Category</option>
                  {categories.map((item, index) => (
                    <option key={index}>{item}</option>
                  ))}
                </select>
              </div>
              <div className="my-3">
                <label className="form-label">Description</label>
                <textarea
                  className="form-control shadow-none"
                  placeholder="Product Description"
                  onChange={(e) => setDescription(e.target.value)}
                ></textarea>
              </div>
              <div className="my-3 addImage ">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  multiple
                  className="mx-auto"
                  onChange={createProductImagesChange}
                />
              </div>
              <div className="imagePreview ">
                {imagesPreview.map((image, index) => (
                  <img src={image} alt="Image PReview" key={index} />
                ))}
              </div>
              <div className="my-3"></div>
              <button
                type="submit"
                className="w-100"
                disabled={loading ? true : false}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewProduct;
