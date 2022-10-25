import React, { useState} from "react";
import { useGetExerciseByBodyPartQuery } from "../../services/ExercisesRapid";
import ExercisesCard from "./ExercisesCard";
import "./Exercises.scss"
import Select from "react-select";
import ReactPaginate from "react-paginate";





export default function Exercises() {

    const listOfBodyParts = [

        {value: "chest", label:"Chest"},
        {value: "shoulders", label:"Shoulders"},
        {value: "lower%20arms", label:"Lower arms"},
        {value: "lower%20legs", label:"Lower legs"},
        {value: "neck", label:"Neck"},
        {value: "upper%20arms", label:"Upper arms"},
        {value: "waist", label:"Waist"},
        {value: "upper%20legs", label:"Upper legs"},
        {value: "back", label:"Back"},

        
    ]

    const [currentPage, setCurrentPage] = useState(0)
    const [bodyPart,setBodyPart] = useState(listOfBodyParts[0].value)

    const {data} = useGetExerciseByBodyPartQuery(bodyPart)

    console.log(data)
  
    const count = 12

   const firstIndexOfPage = currentPage * count
    
   const currentData = data?.slice(firstIndexOfPage, firstIndexOfPage + count)

    const amountOfPage = Math.ceil(data?.length / count)

    
    return (
      <div className="exercises-wrapper">


            <Select
                options={listOfBodyParts}
                defaultValue={listOfBodyParts[0]}
                onChange={({value})=>{
                    
                    setBodyPart(value)
                    
                    }}
                className="bodyPartSelector"
                placeholder="Select a body part"
                theme={(theme) => ({
                    ...theme,
                    borderRadius: 5,

                    colors: {  
                      ...theme.colors,
                      text: "black",
                      primary: "rgb(92, 146, 255)",
                      neutral0: "white",
                      primary25: "rgb(92, 146, 255)",
                      primary50: "rgb(92, 146, 255)",
                      neutral40: "#3b3636",
                      
                    },

                  })}
                />

                

            <div className="exercises-cards">

              {currentData?.map((exercise, index)=>{
            
                return (
                  
                <ExercisesCard exercise={exercise} key={index}/>
               
              )})}
            </div> 



          <ReactPaginate
            previousLabel="Prev"
            nextLabel="Next"
            pageCount={amountOfPage}
            onPageChange={({selected})=>
            setCurrentPage(selected)
            }
            containerClassName="pagination"
            activeLinkClassName="active"
            onClick={() => {
                window.scrollTo({top: 0, left: 0, behavior: 'smooth'});
              }}
            pageRangeDisplayed={3}
            marginPagesDisplayed={2}
            
          />


    </div>

    );
}