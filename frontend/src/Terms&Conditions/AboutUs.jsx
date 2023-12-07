import React from "react";

const AboutUs = () => {
  return (
    <section className="about">
      <div className="text-center">
        <img
          src="https://themewagon.github.io/malefashion/img/about/about-us.jpg"
          className="img-fluid"
          alt=""
        />
      </div>
      <div className="container py-5">
        <div className="row px-4">
          <div className="col-lg-8 col-md-12 col-12">
            <h2>About</h2>
            <p className="mt-4">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              sollicitudin, tellus vitae condimentum egestas, libero dolor
              auctor tellus, eu consectetur neque elit quis nunc. Cras elementum
              pretium est. Nullam ac justo efficitur, tristique ligula a,
              pellentesque ipsum. Quisque augue ipsum, vehicula et tellus nec,
              maximus viverra metus. Nullam elementum nibh nec pellentesque
              finibus. Suspendisse laoreet velit at eros eleifend, a
              pellentesque urna ornare. In sed viverra dui. Duis ultricies mi
              sed lorem blandit, non sodales sapien fermentum. Pellentesque
              sodales ipsum nisi.
              <br />
              <br />
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras
              sollicitudin, tellus vitae condimentum egestas, libero dolor
              auctor tellus, eu consectetur neque elit quis nunc. Cras elementum
              pretium est. Nullam ac justo efficitur, tristique ligula a,
              pellentesque ipsum. <br />
              <br />
              Quisque augue ipsum, vehicula et tellus nec, maximus viverra
              metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Cras sollicitudin, tellus vitae condimentum egestas, libero dolor
              auctor tellus, eu consectetur neque elit quis nunc. Cras elementum
              pretium est. Nullam ac justo efficitur, tristique ligula a,
              pellentesque ipsum. Quisque augue ipsum, vehicula et tellus nec,
              maximus viverra metus. Nullam elementum nibh nec pellentesque
              finibus. Suspendisse laoreet velit at eros eleifend, a
              pellentesque urna ornare. In sed viverra dui. Duis ultricies mi
              sed lorem blandit, non sodales sapien fermentum. Suspendisse
              ultrices nulla eu volutpat volutpat.
            </p>
          </div>
          <div className="col-lg-4 col-md-12 col-12 mt-4">
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

export default AboutUs;
