import React from "react";

import AddService from "./Addservice";
import ServiceTable from "./Service";
import Demo from "../../components/admin/demo";
import Mechanics from "../../components/admin/Mechanics";

import Header from "../../components/admin/Header";
import Sidebaradmin from "../../components/admin/Sidbaradmin";
import Mechanicdetails from "../../components/admin/Mechanicdetails";

const Adminhome = () => {
  return (
   
      <div>
        <div className="fixed w-full z-30 bg-[rgb(31, 31, 58)]">
        <Header />
        </div>
     

        <div className="flex sm:max-w-[95%] p-3 mx-auto gap-4">
          <div>
          <Sidebaradmin />
          </div>

          <div className="flex-grow  mt-[12rem] min-h-screen lg:ml-[20rem] ">
            <Mechanics />
            {/* <Mechanicdetails/> */}
          </div>
        </div>
      </div>

  );
};

export default Adminhome;
