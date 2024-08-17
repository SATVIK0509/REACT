import { CDN_URL } from "./utils/constants";

const RestaurantCard = (props) => {
    // console.log(props);
    const { resData } = props;
    const { name, cuisines, avgRating, cloudinaryImageId } = resData?.info;
    const { deliveryTime } = resData?.info?.sla;
    return (
      <div className="res-card  p-1 w-[300px] h-[400px] rounded-md border bg-gray-50 hover:bg-gray-200">

        <div className="res-logo-container"> 
          <img
            className="res-logo w-full h-[200px]"
            src={
              CDN_URL +
              cloudinaryImageId
            }
          ></img>
        </div>
  
        <div className="res-text ">
          <h3 className="font-bold text-lg my-4"> {name}</h3>
          <h4> {cuisines.join(", ")}</h4>
          <h4> {avgRating}</h4>
          <h4> {`${deliveryTime} Minutes`}</h4>
  
        </div>
          
      </div>
    );
  };

  export const withPromotedLabel = (RestaurantCard)=>{

    return (props)=>{

      return(
        <div>
          <label className=" absolute text-green-400 bg-black font-bold"> Pure Veg </label>
          <RestaurantCard {...props}/>
        </div>
      )
    }
  }

  export default RestaurantCard;