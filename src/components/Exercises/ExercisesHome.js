import React from "react";
import {useGetExerciseRapidQuery } from "../../services/ExercisesRapid";
import Loading from "../Loading/Loading";
import ExercisesCard from "./ExercisesCard";
import "./Exercises.scss"


export default function ExercisesHome() {

    

    const {data, isFetching} = useGetExerciseRapidQuery()

    console.log(data)

    const count = 8 

    if(isFetching) return <Loading />

    let arr = [];
            while(arr.length < count){
                let num = Math.floor(Math.random() * (data?.length)) + 1;
                if(arr.indexOf(num) === -1) arr.push(num);
            }
    



    return (
        <div className="exercises-wrapper">

            <p style={{color: "red"}}>Click to google the details</p>

         
            <div className="exercises-cards">
                {data?.filter((data,index)=>arr.some((num)=>{return num===index})).map((exercise, index)=>{
            
                    return (
               
                        <ExercisesCard exercise={exercise} key={index}/>
               
       
                    )})}
            </div>


        </div>

    );
}