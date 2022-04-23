import {useLocation, useParams} from 'react-router-dom'
import {Container, Image, Col, Figure, Row} from 'react-bootstrap'
import image from "./joker.jpg"

function SingleMovie(){
    //console.dir(useLocation())
    let id = useLocation().state.id

    return(
        <div>
            <Container fluid>
                <Row>
                    <Col className="border poster_column">
                        <Figure>
                            <Figure.Image
                                width={350}
                                height={350}
                                src={image}
                            />
                            <Figure.Caption>
                                Nulla vitae elit libero, a pharetra augue mollis interdum.
                            </Figure.Caption>
                        </Figure>
                    </Col>
                    <Col className="border">
                        <h1>Joker<span>(2000)</span></h1>
                        <h4>Directed by Santiago Gonzalez</h4><br/>
                        <p>Main Cast: Tommy, Octa, Licha, Gonzo</p>
                        <p>Genre: Action</p>
                        <p>IMBd Rating: 3.2</p>
                        <p>A mentally troubled stand-up comedian embarks on a downward spiral that leads to the creation of an iconic villain.</p>

                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SingleMovie;