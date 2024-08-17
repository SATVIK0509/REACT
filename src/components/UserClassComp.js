import React from "react";

class UserClassComp extends React.Component {

    constructor(props){
        super(props)

        // to crate state variables
        this.state = {
            count : 0,
            count2: 2,

            // variable to store and update data fetched from API
            // initially with dummy information(not necessary can be  
            // held empty also) object
            // Initially React will render the component with this 
            // dummy data , before the API call
            userInfo: {
                name : "XYZ",
                location: "Default",
            }
        }

    }


    // make it async to make API call
    async componentDidMount(){

        const data = await fetch("https://api.github.com/users/akshaymarch7")
        const json = await data.json()
        console.log(json)

        // when we get the data from API, update its corresponding state 
        // variable (which is handling API data) to re-render the component

        this.setState({
            // json object fetched from API
            userInfo: json
        })
    }

    componentDidUpdate(){
        console.log("Component Did Update")
    }

    componentWillUnmount(){
        console.log("Component Will Unmount")
    }

    render(){

        // destructure from props object
        const {experience,skills} = this.props;
        // destructure state varable from this.state Object
        const {count} = this.state;

        const {name, location,avatar_url} = this.state.userInfo

        return(
            <div className="user-card">

                <h1> Count : {count} </h1>
                <button
                onClick={()=>{
                    // to update the state variable use this.setState({Updated variables})
                    this.setState({
                        count : this.state.count + 1, // OR
                        // count: count + 1
                    })
                    // will print the previous value of count bcz in will
                    // only get update after the component re-renders
                    console.log(count)
                }}>
                    Increase Count
                </button>

                <h2> Experience : {experience} </h2>
                <h3> skills :{skills} </h3>

                <h3> Name : {name} </h3>
                <h3> location : {location} </h3>
                <img src={avatar_url} alt="image"/> 
    
            </div>
        )
    }
    
}

export default UserClassComp