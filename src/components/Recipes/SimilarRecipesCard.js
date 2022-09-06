import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './SimilarRecipesCard.scss';

export default function SimilarRecipesCard({recipe}){

    const color= recipe?.content?.reviews?.averageRating>3.5 ? "green" : "red" 

    console.log(recipe)

    return (
        
                <Link 
                to={`/recipeDetails/${recipe?.content?.details?.id}`}
                className="similarRecipes-card"
                >
                    <Card>
                        <Card.Img variant="top" src={recipe?.display?.images} alt="image"/>
                        <Card.Body  >
                            <Card.Subtitle>{recipe?.display?.displayName}</Card.Subtitle>
                
                            <Card.Text>

                
                    
                            </Card.Text>
                            <div className="ratings" style={{ color: color}} >
                                <i className="ri-user-star-line" style={{verticalAlign: "middle"}}/> 
                                <span style={{verticalAlign: "middle"}}>{recipe?.content?.reviews.averageRating.toFixed(2)}/5</span>
                            </div>
                    
                        </Card.Body>
                
                    </Card>
                </Link>
           

    )
}