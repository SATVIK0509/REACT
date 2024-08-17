import RestaurantCard, { withPromotedLabel } from "./RestaurantCard";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { Link } from "react-router-dom";
import useOnlineStatus from "./utils/useOnlineStatus";


const Body = () => {

    const [listOfRestaurants,setListOfRestaurants] = useState([]);
    const [filterdRestaurants,setFilteredRestaurants] = useState([]);
    const [searchText,setsearchText] = useState("")
    const [searchButtonText,setsearchButtonText] = useState("Search")

    const RestaurantCardPromoted = withPromotedLabel(RestaurantCard)

    console.log(filterdRestaurants)

    useEffect(()=>{
        fetchData()
    },[]);

    const fetchData = async ()=>{
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.65200&lng=77.16630&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
        
        const json = await data.json();

        console.log(json);
        setFilteredRestaurants(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)
        setListOfRestaurants(json.data.cards[1].card.card.gridElements.infoWithStyle.restaurants)

    };

    const onlineStatus = useOnlineStatus();

    if(onlineStatus == false) return (<h1> Looks like you are offline </h1>)


    if(listOfRestaurants.length == 0){
      return (<Loader/>)
    }
  
    return (
      <div className="body">

        <div className="filter"> 

            <div className="search m-4 p-4">

              <input type="text" 
              className="search-box px-2 rounded-lg bg-green-300 border-solid border-black" 
              placeholder="Search Restaurants" value = {searchText}
              onChange={(e)=>{
                console.log(e.target.value)
                setsearchText(e.target.value) // searchText will remain same untill it re-renders
                // And re-renders only ocurrs when this callback function will get completely implemented
                // that's why in this callback function we have to use e.target.value for current input 
                // value bcz searchText is not updated yet . searchText updation is useful to handle UI when 
                // Search/clear button is pressed
                setsearchButtonText((e.target.value.length)? "Clear": "Search")
                filteredRest =  listOfRestaurants.filter((Restaurant)=>{
                  console.log(searchText)
                  return Restaurant.info.name.toLowerCase().includes(e.target.value.toLowerCase())
                })
                setFilteredRestaurants(filteredRest)
              }}>

              </input>

              <button className="px-4 m-4 bg-slate-400"
              onClick={()=>{

                if(searchButtonText=="Clear"){
                  setsearchText("")
                  console.log('hi') // whole scope will get executed
                  setsearchButtonText("Search")
                  setFilteredRestaurants(listOfRestaurants)
                } 

              }}> {searchButtonText} </button>

            </div>

            <button className="filter-btn px-4 m-4 bg-slate-400"
            onBlur={()=>{
              setFilteredRestaurants(listOfRestaurants)
            }}

            onClick={()=>{
                const filtered = listOfRestaurants.filter((Restaurant)=>{
                    return Restaurant.info.avgRating > 4.3 
                })
                console.log(filtered.length)
                setFilteredRestaurants(filtered)
                
            }}>

            

                Top Rated Restaurants
            </button>
        </div>

  
        <div className="res-container flex flex-wrap gap-1">
          {/* <RestaurantCard resData={resList[0]} /> */}
            {console.log(listOfRestaurants)}
          { }

          { 
            (filterdRestaurants.length == 0)?<h1> Not Found </h1> :
            filterdRestaurants.map((Restaurant) => {
            // to make Restaurant Card linkable use Link
             console.log(Restaurant)
             return(
            <Link key={Restaurant.info.id} 
              to={"/restaurants/" + Restaurant.info.id } >
                
                { 
                  (Restaurant.info.veg)? <RestaurantCardPromoted resData={Restaurant}/> : <RestaurantCard  resData={Restaurant}/>
                }
                
            </Link>
            )
          })}
  
        </div>
      </div>
    );
  };

  export default Body 