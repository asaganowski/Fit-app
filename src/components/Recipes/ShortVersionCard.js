import React from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import './ShortVersionCard.scss';

export default function ShortVersionCard({recipe}){

    const color= recipe?.content?.reviews?.averageRating>3.5 ? "green" : "red" 

    console.log(recipe)

    return (
        
                <Link 
                to={`/recipeDetails/${recipe?.content?.details?.id}`}
                className="shortVersion-card"
                >
                    <Card>
                        <Card.Img variant="top" src={recipe?.display?.images} alt="image"/>
                        <Card.Body  >
                            <Card.Subtitle>{recipe?.display?.displayName}</Card.Subtitle>
                
                            <div className="ratings" style={{ color: color}} >
                                <i className="ri-user-star-line"/> 
                                <span>{recipe?.content?.reviews.averageRating.toFixed(2)}/5</span>
                            </div>
                    
                        </Card.Body>
                
                    </Card>
                </Link>
           

    )
}