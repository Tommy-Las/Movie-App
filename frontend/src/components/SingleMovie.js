import {useLocation, useParams} from 'react-router-dom'
import {Container, Image, Col, Figure, Row, Carousel} from 'react-bootstrap'
import image from "./joker.jpg"
import image1 from "./image1.jpg"
import image2 from "./image2.jpg"
import image3 from "./image3.jpg"

function SingleMovie(){
    //console.dir(useLocation())
    let id = useLocation().state.id

    return(
        <div>
            <Container fluid className="margin-top">
                <Row>
                    <Col className="poster_column">
                        <Figure>
                            <Figure.Image
                                width={350}
                                height={350}
                                src={image}
                            />
                            <Figure.Caption>
                                180 mins
                            </Figure.Caption>
                        </Figure>
                    </Col>
                    <Col className="info_column">
                        <h1>Joker<span>(2000)</span></h1>
                        <h4>Directed by Santiago Gonzalez</h4><br/>
                        <p>Main Cast: Tommy, Octa, Licha, Gonzo</p>
                        <p>Genre: Action</p>
                        <p>IMBd Rating: 3.2</p>
                        <p>A mentally troubled stand-up comedian embarks on a downward spiral that leads to the creation of an iconic villain.</p>
                            <Carousel fade className = "carousel">
                                <Carousel.Item>
                                    <img
                                    fluid
                                    className="d-block w-100"
                                    src={image1}
                                    alt="First slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    fluid
                                    className="d-block w-100"
                                    src={image2}
                                    alt="Second slide"
                                    />
                                </Carousel.Item>
                                <Carousel.Item>
                                    <img
                                    fluid
                                    className="d-block w-100"
                                    src={image3}
                                    alt="Third slide"
                                    />
                                </Carousel.Item>
                            </Carousel>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default SingleMovie;