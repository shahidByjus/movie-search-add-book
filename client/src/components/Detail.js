import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import { Container, Card, CardBody, CardTitle, CardText } from "reactstrap";

export default function Detail() {
  const { movieId } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    getMovieDetail();
  }, []);

  function getMovieDetail() {
    setLoading(true);
    fetch(`http://localhost:5000/detail/${movieId}`)
      .then((response) => response.json())
      .then((result) => {
        setData(result);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        console.log("error", error);
      });
  }

  return (
    <Container>
      {loading ? (
        <h4>loading....</h4>
      ) : (
        <>
          {data.map((detail) => {
            return (
              <Card key={detail.imdbId}>
                <CardBody>
                  <CardTitle>{`Title : ${detail.title}`}</CardTitle>
                  <CardText>{`Year : ${detail.year}`}</CardText>
                  <CardText>{`ImdbID : ${detail.imdbId}`}</CardText>
                  <CardText>{`Type : ${detail.type}`}</CardText>
                </CardBody>
              </Card>
            );
          })}
          <button
            type="button"
            className="btn btn-danger"
            onClick={() => history.goBack()}
          >
            Go Back
          </button>
        </>
      )}
    </Container>
  );
}
