import React, { Fragment } from "react";
function Home(params) {
  return (
    <body className="full-height">
      <section className="background-radial-gradient overflow-hidden my-7">
        <div className="container text-center my-7">
          <div style={{ zIndex: "10" }}>
            <h1
              className=" display-5 fw-bold"
              style={{ color: "hsl(218, 81%, 95%)", marginTop: "180px" }}
            >
              Welcome <div className="mt-3">To</div>
              <div className="mt-4" style={{ color: "hsl(218, 81%, 75%)" }}>
                Dynamic-CV
              </div>
            </h1>
            <h2
              style={{
                color: "hsl(218, 81%, 95%)",
                marginTop: "50px",
                marginBottom: "50px",
              }}
            >
              Get Ready to Experience the Wildest Résumé Managing Platfrom Ever
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
        </div>
      </section>
    </body>
  );
}

export default Home;
