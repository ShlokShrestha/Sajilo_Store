import React, { useEffect, useState } from "react";
import SiderBar from "./SiderBar";
import "./admin.css";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getProductDetails,
  updateProduct,
} from "../../actions/productAction";
import { useNavigate, useParams } from "react-router-dom";
import { UPDATE_PRODUCT_RESET } from "../../contants/productConstants";
const UpdateProduct = () => {
  const navigate = useNavigate();
  const categories = ["Men", "Women", "Bags", "Shoes", "Accessories", "Kids"];
  const dispatch = useDispatch();
  const {
    loading,
    isUpdate,
    error: updateError,
  } = useSelector((state) => state.product);
  const { product, error } = useSelector((state) => state.productDetails);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [description, setDescription] = useState("");
  const [Stock, setStock] = useState(0);
  const [category, setCategory] = useState("");
  const [images, setImages] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);

  const { id } = useParams();

  useEffect(() => {
    if (product && product._id !== id) {
      dispatch(getProductDetails(id));
    } else {
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setStock(product.Stock);
      setCategory(product.category);
      setOldImages(product.image);
    }
    if (error) {
      alert(error);
      dispatch(clearErrors());
    }
    if (updateError) {
      alert(updateError);
      dispatch(clearErrors());
    }
    if (isUpdate) {
      alert("Product Update Succesfully");
      navigate("/admin/products");
      dispatch({ type: UPDATE_PRODUCT_RESET });
    }
  }, [dispatch, navigate, error, id, product, updateError, isUpdate]);

  const updateProductSubmitHandler = (e) => {
    e.preventDefault();

    const myForm = new FormData();
    myForm.append("name", name);
    myForm.append("price", price);
    myForm.append("Stock", Stock);
    myForm.append("category", category);
    myForm.append("description", description);
    images.forEach((image) => myForm.append("images", image));
    dispatch(updateProduct(id, myForm));
  };

  const updateProductImagesChange = (e) => {
    const file = Array.from(e.target.files);
    setImages([]);
    setImagesPreview([]);
    setOldImages([]);
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
            <SiderBar />
          </div>

          <div className="col-lg-9">
            <h3 className="my-4">Update Product</h3>
            <div className="line mb-4"></div>

            <form
              className=" w-50 mx-auto bg-white p-4"
              onSubmit={updateProductSubmitHandler}
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
                  value={name}
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
                  value={price}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Stock</label>
                <input
                  type="number"
                  className="form-control shadow-none"
                  placeholder="Product Stock"
                  onChange={(e) => setStock(e.target.value)}
                  value={Stock}
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Category</label>
                <select
                  className="form-select shadow-none"
                  onChange={(e) => setCategory(e.target.value)}
                  value={category}
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
                  value={description}
                ></textarea>
              </div>
              <div className="my-3 addImage ">
                <input
                  type="file"
                  name="avatar"
                  accept="image/*"
                  multiple
                  className="mx-auto"
                  onChange={updateProductImagesChange}
                />
              </div>
              <div className="imagePreview ">
                {oldImages &&
                  oldImages.map((image, index) => (
                    <img src={image.url} alt="Image preview" key={index} />
                  ))}
              </div>
              <div className="imagePreview ">
                {imagesPreview.map((image, index) => (
                  <img src={image} alt="Image preview" key={index} />
                ))}
              </div>
              <div className="my-3"></div>
              <button
                type="submit"
                className="btn btn-primary"
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

export default UpdateProduct;
