import { useState } from "react";
import { LOGO_URL } from "./utils/constants";
import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus";

const Header = () => {

    const [logText,setLogText] = useState("Login")

    const onlineStatus = useOnlineStatus();
    console.log(onlineStatus)

    return (
      <div className="flex justify-between m-4 border-2 border-black border-solid">
        <div className="logo-container">
          <img
            className="w-52"
            src={LOGO_URL}
          ></img>
        </div>
  
        <div className="w-[800px] text-xl">
          <ul className=" h-full flex items-center justify-between">
            <li> Status : {(onlineStatus)? "Online" : "Offline"} </li>
            <li> <Link to="/"> Home</Link> </li>
            <li> <Link to="/about"> About Us </Link> </li>
            <li> <Link to="/contact"> Contact Us </Link></li>
            <li>Cart</li>
            <div className="isLoged"
            onClick={()=>{
              setLogText((logText=="Login")? "Logout" : "Login")
            }}>
              {logText}
            </div>

          </ul>
        </div>
      </div>
    );
  };

  export default Header