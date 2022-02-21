import React from "react";
import { Card } from 'react-bootstrap'
import { baseUrl } from "../shared/baseUrl";
import { Loading } from "./LoadingComponent";
function RenderCard({ item, isLoading, errMess }) {
    if (isLoading) {
        return (
            <Loading />
        )
    }
    else if (errMess) {
        return (
            <h4> {errMess} </h4>
        )
    }
    else
        return (
            <Card>
                <Card.Img height="330px" src={baseUrl+  item.image} alt={item.name} />
                <Card.Body >
                    <Card.Title> {item.name}</Card.Title>
                </Card.Body>
                {item.designation ? <Card.Subtitle className="m-2">{item.designation}</Card.Subtitle> : null}
                <Card.Text className="m-2 " > {item.description}</Card.Text>
            </Card>

        );
}
function Home(props) {
    return (
        <div className="container">
            <div className="row align-items-start">
                <div className="col-12 col-md m-1"   >
                    <RenderCard item={props.dish}
                        isLoading={props.dishesLoading}
                        errMess={props.dishesErrMess}
                    />
                </div>
                <div className="col-12 col-md m-1"   >
                    <RenderCard item={props.promotion}                     
                    isLoading={props.promosLoading}
                    errMess={props.promosErrMess}/>
                </div>
                <div className="col-12 col-md m-1"   >
                    <RenderCard item={props.leader} />
                </div>
            </div>

        </div>
    )
}
export default Home