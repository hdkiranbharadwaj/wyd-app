import React, { Fragment } from "react";
function Home(params) {
  return (
    <body className="full-height ">
      <section className="background-radial-gradient overflow-hidden my-7">
        <div className="container text-center my-7">
          <div style={{ zIndex: "10" }}>
            <h1
              className=" display-5 fw-bold"
              style={{ color: "hsl(218, 81%, 95%)", marginTop: "180px" }}
            >
              {/*#fc3d03*/}
              <div className="mt-4" style={{ color: "#fc7303" }}>
                WYD!!
              </div>
            </h1>
            <h2
              style={{
                color: "hsl(218, 81%, 95%)",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            >
              <i>
                Currently engaged in the ancient art of procrastination. It's a
                work in progress!
              </i>
            </h2>
          </div>
          {/* add little space in the top to center the elements on the page */}
          <div style={{ margin: "10" }}>
            <button
              type="submit"
              className="btn button-signup"
              onClick={() => {
                params.PAtHome(false);
                params.PUserPresent(false);
              }}
            >
              <span>Sign up</span>
            </button>
            <span style={{ margin: "0 20px" }}></span>
            <button
              type="submit"
              className="btn button-signup"
              onClick={() => {
                params.PAtHome(false);
                params.PUserPresent(true);
              }}
            >
              <span>Log In</span>
            </button>
          </div>
          <br></br>
          <br></br>
          <div>
            <h2
              style={{
                color: "maroon",
                marginTop: "25px",
                marginBottom: "25px",
              }}
            >
              Create an impressionable ideology, we shall put it on our wall for
              a day, so yeah let people really know
            </h2>
            <h2
              style={{
                color: "#fc7303",
                marginTop: "25px",
                marginBottom: "50px",
              }}
            >
              Whach ya Doing
            </h2>
          </div>
        </div>
      </section>
    </body>
  );
}

export default Home;
