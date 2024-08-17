import { useState } from "react";
import ItemList from "./ItemList";

const RestaurantCategory = ({data,showItems,setShowIndex,index})=>{

    console.log(data?.itemCards)
    console.log(setShowIndex)
    
    // const [showItems,setShowItems]  = useState(false)
    // const [icon,setIcon]  = useState('⬇️')
    
    const handleClick = ()=>{

        console.log("clicked")

        // already opened category is clicked
        if(showItems){
            setShowIndex(null)
            // setIcon('⬇️')
        }

        // different category is clicked
        else{
            setShowIndex(index)
            // setIcon('⬆️')
        } 
        
    }

    return(
        <div>

            <div className="bg-gray-50 my-4 shadow-lg p-4"> 

                <div className=" flex justify-between cursor-pointer"
                onClick={handleClick}>
                    <div className="font-bold text-lg"> {data?.title} ({data?.itemCards?.length}) </div>
                    <div> {(showItems)?'⬆️': '⬇️'} </div>
                </div>

                { showItems &&  <ItemList items={data.itemCards}/>}

            </div>

        </div>


    )
}

export default RestaurantCategory