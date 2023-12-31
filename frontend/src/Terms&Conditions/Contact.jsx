import React, { useEffect } from "react";

const Contact = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <section className="contact">
      <div className="container py-5">
        <div className="row  gy-4">
          <div className="col-lg-6 col-md-12 col-12">
            <h3>Contact Us</h3>
            <p className="text-secondary mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus
              alias eius sit error illum ipsa? Lorem ipsum dolor sit amet.
            </p>
            <div className="form">
              <form>
                <input type="text" placeholder="Name"  className="form-control shadow-none my-2"/>
                <input type="email" placeholder="Email" className="form-control shadow-none my-2" />
                <input type="text" placeholder="Subject"  className="form-control shadow-none my-2"/>
                <textarea
                  name=""
                  id=""
                  cols="30"
                  rows="8"
                  placeholder="Message"
                  className="form-control shadow-none my-2"
                ></textarea>
                <button className="submit text-uppercase fw-semibold">
                  Submit
                </button>
              </form>
            </div>
          </div>
          <div className="col-lg-6 col-md-12 col-12">
            <iframe
              width="100%"
              height="60%"
              title="map"
              src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d6863.662628014158!2d85.3086123474441!3d27.705192274086084!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2snp!4v1691829221117!5m2!1sen!2snp"
            ></iframe>
            <div className="mt-3">
              <h4>Kathmandu Office</h4>
              <div className="text-secondary">
                <p>Baneshwor, Kathmandu</p>
                <p>Phone: +977 9876541232</p>
                <p>abc@gmail.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
