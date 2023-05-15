import React from "react";
import Landing from "./Landing";
import Info from "./Info";
import Operation from "./Operation";
import FAQ from "./FAQ";

function Home() {
  return (
    <div className="container-fluid p-0">
      {/* <div className="bg-img"></div> */}
      <Landing />
      <Info />
      <Operation />
      <FAQ />
    </div>
  );
}

export default Home;
