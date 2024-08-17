import { CDN_URL } from "./utils/constants"

const ItemList = ({items})=>{

    console.log(items)

    return(
        <div>
            {items.map((item)=>(

                <div key={item?.card?.info?.id} className="my-4 py-8 flex justify-between border-b-2"> 

                    <div className="relative border-solid border-2 w-3/4">
                        <div> {item?.card?.info?.name} </div>
                        <div> ₹ {(item?.card?.info?.price || item?.card?.info?.defaultPrice)/100} </div>
                    

                        <p className="text-xs"> {item?.card?.info?.description} </p>


                    </div>

                    <div className="relative border-solid border-2">

                        <img className="h-[144px] w-[156px] rounded-lg"
                            src={CDN_URL + item?.card?.info?.imageId }>
                        </img>

                        <button className="absolute bottom-0 right-1/2 bg-white rounded-lg" > Add + </button>
                    </div>

                    


                </div>
            ))}
        </div>
    )
}

export default ItemList