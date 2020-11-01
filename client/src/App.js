import React, { useState } from "react";
import {
  Container,
  Input,
  InputGroup,
  Button,
  Row,
  Col,
  Card,
  CardBody,
  CardTitle,
  CardText,
  CardImg
} from "reactstrap";
import { Link } from "react-router-dom";

export default function App() {
  const [data, setData] = useState([]);
  const [searchValue, setSearchValue] = useState("");

  function onClickSearch() {
    fetchMovies();
  }

  function onKeyPressSearchValue(event) {
    if (event.charCode === 13) {
      fetchMovies();
    }
  }

  function onChangeSearchValue(event) {
    const searchValue = event.target.value;

    setSearchValue(searchValue);
  }

  function fetchMovies() {
    fetch(`http://localhost:5000/getMovies/${searchValue}`)
      .then((response) => response.json())
      .then((result) => setData(result))
      .catch((error) => console.log("error", error));
  }

  return (
    <Container style={{ marginTop: "60px" }}>
      <section className="search-section">
        <InputGroup>
          <Input
            placeholder=" Search movie name..."
            onChange={onChangeSearchValue}
            onKeyPress={onKeyPressSearchValue}
          />
          <Button color="success" onClick={onClickSearch}>
            Search
          </Button>
          <Link
            to={`/addMovie`}
            className="btn btn-primary"
          >
            Add Movie
          </Link>
        </InputGroup>
      </section>
      <br />
      <section className="movie-section">
        <Row>
          {data && data.length > 0 &&
            data.map((movie) => {
              return (
                <Col md={4} key={movie.imdbId}>
                  <Card>
                    <CardImg
                      top
                      width="100%"
                      src={movie.poster}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle>{movie.title}</CardTitle>
                      <Link
                        to={`/detail/${movie.imdbId}`}
                        className="btn btn-primary"
                      >
                        Detail
                      </Link>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </section>
    </Container>
  );
}
