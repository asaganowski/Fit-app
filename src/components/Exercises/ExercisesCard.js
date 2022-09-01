import React from "react";
import './ExercisesCard.scss';
import {Card} from 'react-bootstrap';




export default function ExercisesCard({exercise}) {


    const name = exercise?.name.toString().replace(/ /g,"+")

    const exerciseURL = `https://www.google.com/search?q=${name}`


    
return (
        <a 
          href={exerciseURL} 
          target="_blank"
          rel="noreferrer" 
          className="card-content"
        >
          <Card>
          
            <Card.Img variant="top" src={exercise?.gifUrl} />
            
            <Card.Body>
                <Card.Title>{exercise?.name?.toString().charAt(0).toUpperCase()+exercise?.name?.slice(1)}</Card.Title>
                <Card.Subtitle>{exercise?.target?.toString().toUpperCase()}</Card.Subtitle>
                
            </Card.Body>
          </Card>
        </a>
   
    );
 }
