import React, {useState, useEffect} from "react";
import './Recipes.scss';
import Select from 'react-select';
import { useGetRecipesByParamsQuery, useGetTagsQuery } from "../../services/getRecipes";
import RecipeCard from "./RecipeCard"
import Loading from "../Loading/Loading";
import {
  protein,
  carb,
  fat,
  sugar,
  calorie
  } from "../images/photos";
import { Button } from "react-bootstrap";


export default function Recipes({homeView}){

  const[attribute,setAttribute]  = useState("")
  const[ingredient, setIngredient] = useState("")
  const[q, setQ] = useState("")
  const[category, setCategory] = useState("---")
  const[isVisible, setIsVisible] = useState(false)
  



  useEffect(() => {
    if(category!=="---")
      setIsVisible(true)

      else{
      setIsVisible(false)
      setAttribute("")
      }
  },[category]); 


  const count = homeView ? 4 : 40;

            
  const {data:recipes,isLoading}=useGetRecipesByParamsQuery({
       ingredient,
       attribute
  }) // some recipes doesnt have macros data which are neccessary for me, that is why I have 18 recipes fetched first, and then used slice() method

  //Generally best recipe API I found. In spite of that some recipes doesnt have the most common info e.g. macros or ratings 

  const {data}=useGetTagsQuery()

  console.log(data)

  const courses = data?.["en-US"]?.course?.map((course)=>({

    value: course.searchValue.toString().replace("^","%5E"),
    label: course.description,
    icon: course.imageUrl

  }))

const cuisine = data?.["en-US"]?.cuisine?.filter(data=>data.imageUrl!==null).map((cuisine)=>({

  value: cuisine.searchValue.toString().replace("^","%5E"),
  label: cuisine.description,
  icon: cuisine.imageUrl

}))//cuisines wihout image have no recipes to present


const nutrition = [  

  {value: "nutrition%5Enutrition-high-protein", label: "High Protein", icon:protein},
  {value: "nutrition%5Enutrition-low-calorie", label: "Low Calorie", icon:calorie},
  {value: "nutrition%5Enutrition-low-fat", label: "Low Fat", icon:fat},
  {value: "nutrition%5Enutrition-low-carb", label: "Low Carb", icon:carb},
  {value: "nutrition%5Enutrition-low-sugar", label: "Low Sugar", icon:sugar},
  
]//some interesting nutrition attributes which I have to add manually, because there was no other option



const categories = [  

  {value: "---", label: "---"},
  {value: "courses", label: "Courses", function: courses},
  {value: "nutrition", label: "Nutrition", function: nutrition},
  {value: "cuisine", label: "Cuisine", function: cuisine},

]



const renderAttributes = (category) => {

  for(let i=1;i<categories.length;i++){
    if(categories[i].value===category)
      return categories[i].function
      
  }
}

const onSubmit = e =>{
  e.preventDefault()
  console.log(q)
  setIngredient(q)

}
    
if(isLoading) return <Loading/>


    return (
      <div className="recipes-wrapper">

        {!homeView && 

          <div className="filters">
            
            <div className="selectors">
                <h5>Filter by:</h5>
                <Select
                  options={categories}
                  className="attributeSelector"
                  placeholder="Category"
                  onChange={(e)=>{
                    
                    setCategory(e?.value)
                  }}
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
                  

                {isVisible && 

                  <Select
                    className="attributePicker"
                    onChange={({value})=>{
                      setAttribute(value)
                    }}
                    options={renderAttributes(category)}
                    getOptionLabel={e => {
                    
                      return(
                      <div style={{ display: 'flex', alignItems: 'center'}}>
                        
                        {e.icon!==null && 
                        <img style={{width:"30px", height:"100%" }} src={e?.icon} alt="icon"/>}
                        <span style={{ marginLeft: e.icon!==null ? "5px" : "0"}}>{e?.label}</span>
                      </div>)
                    }}
                  
                  />

                }
              </div>

              <div className="ingredient-picker">
                <h5>Type: </h5>
                
                <form onSubmit={onSubmit}>
                  
                  <input
                    className="ingredient-input" 
                    type="search"
                    onChange={(ingredient)=>{
                      setQ(ingredient.target.value)
                      }
                    }
                    placeholder=" Key Word"
                  />

                  <Button type="submit"><i className="fas fa-search"/></Button>
                </form>
              </div>
            </div>
        }


        <div className="recipeCard-wrapper">
          {recipes?.feed?.filter((data)=>data.content.nutrition.nutritionEstimates.length!==0).slice(0,count).map((recipe, index) => {

            return(
    
              <RecipeCard recipe={recipe} key={index} />
    
          )})}
        </div>

        <a 
        href="https://www.yummly.com/"
        target="_blank"
        rel="noreferrer"
        >
          <Button variant="outline-info">For more recipes and filters, click the link</Button></a>
      </div>
    );
  }

  





