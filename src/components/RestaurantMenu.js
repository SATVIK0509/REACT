import Loader from "./Loader"
import { useParams } from "react-router-dom"
import useRestaurantMenu from "./utils/useRestaurantMenu"
import RestaurantCategory from "./RestaurantCategory"
import { useState } from "react"

// After using CUSTOM HOOK to fetch data

const RestaurantMenu = ()=>{

    // to extract resId from Route
    const {resId} = useParams()
    console.log(resId)

    // fetching of data will be done by custom Hook
    const resInfo = useRestaurantMenu(resId)

    const [showIndex,setShowIndex] = useState(null)

    if(resInfo == null) return <Loader/>

    const {name,cuisines} = resInfo?.cards[2]?.card?.card?.info;

    // console.log(resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards)

    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c)=>{
        return c?.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    })

    console.log(categories)
   
    return(
        <div className="menu border-solid border-2 w-[800px] mx-auto">
            <h1> {name} </h1>
            <h2> {cuisines.join(", ")} </h2>

            <h2> Menu </h2>
            
            {categories.map((category,ind) =>(
                < RestaurantCategory key={category?.card?.info?.id} 
                data={category?.card?.card} 
                showItems={(ind===showIndex)? true : false}
                setShowIndex= {(newInd)=>{setShowIndex(newInd)}}
                index = {ind}
                />
            ))}
                               
        </div>
    )
}

export default RestaurantMenu