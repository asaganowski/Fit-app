import React from "react";
import { Pie } from "react-chartjs-2";

import {
    Chart as ChartJS,
    Title,
    Tooltip,
    Legend,
    ArcElement,
  } from "chart.js";


ChartJS.register(
    
    Title,
    Tooltip,
    Legend,
    ArcElement,
  );


export default function PieChart(props){

    
    const macrosName=["Protein", "Carbs", "Fat"]

    const macrosData=[]

    const allMacros = props.recipe?.content?.nutrition?.nutritionEstimates

    for(let i=0;i<allMacros?.length;i++){
        if(allMacros[i].attribute === "PROCNT" || allMacros[i].attribute === "FAT" || allMacros[i].attribute === "CHOCDF")

        macrosData.push(allMacros[i].display.value)

    }
  
    

const data ={
    labels: macrosName,
    datasets: [
        {
            data:macrosData,
            backgroundColor: [
                'rgba(0, 0, 128, 0.5)',
                'rgba(0,128,0, 0.5)',
                'rgba(128, 0, 0, 0.5)',
                
            ],
            borderColor: [
                'rgba(0, 0, 128, 0.8)',
                'rgba(0,128,0, 0.8)',
                'rgba(128, 0, 0, 0.8)',
                
            ],
        }
    ]

}

const options = {
    
    responsive: true,
    plugins: {
        legend: {

            display: props.legendDisplay,
            position: "top",
            
          
        },
        title: {
            display: props.titleDisplay,
            text: "Division of Macronutrients",
            color: "rgb(92, 146, 255)"
          },
    },
    
    layout:{
                padding: 0,
                
    },

    
  
}

const getValue = (allMacros, attribute ) => {
    return allMacros?.find((array)=>
    array.attribute===attribute)?.display.value
}



            return (
                <div className="pieChart-wrapper">
                    <div className="chart">
                        <Pie data={data} options={options} />
                    </div>
                  <div style={{
                      fontSize:"11px", 
                      textAlign: "center", 
                      width:"100%", 
                      color: "black"
                      }}
                      className="macros">
                        <p className="macro-attribute">Energy: {getValue(allMacros, "ENERC_KCAL")}kcal </p>

                        <p className="macro-attribute" style={{color: 'rgba(70, 110, 220, 0.8)'}}>Protein: {macrosData[0]}g </p>
                        
                        <p className="macro-attribute" style={{color: 'rgba(0,128,0, 0.8)'}}>Carbs: {macrosData[1]}g<br/>
                        <small className="macro-attribute">(Sugar: {getValue(allMacros, "SUGAR")}g) </small></p>

                        <p className="macro-attribute" style={{color: 'rgba(200, 0, 0, 0.8)'}}>Fat: {macrosData[2]}g </p>
                    </div>

                </div>
              );
  }