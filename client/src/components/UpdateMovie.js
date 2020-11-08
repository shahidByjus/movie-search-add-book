import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Container, Input } from 'reactstrap';
import Axios from 'axios';

export default function UpdateMovie() {
    const [ data, setData ] = useState([]);
    const { movieId } =useParams();
    const [ title, setTitle ] = useState('');
    const [ year, setYear ] = useState('');
    const [ imdbId, setImdbId ] = useState('');
    const [ type, setType ] = useState('');
    const [ poster, setPoster ] = useState('');
    const history = useHistory();

    useEffect(() => {
        getData();
    },[]);

    function getData() {
        fetch(`http://localhost:5000/getUpdateMovie/${movieId}`)
        .then((response) => response.json())
        .then((result) => {
            setData(result);
            setTitle(result[0].title);
            setYear(result[0].year);
            setImdbId(result[0].imdbId);
            setType(result[0].type);
            setPoster(result[0].poster);
        });
    }

    const updateMovie = async () => {
        await Axios.put("http://localhost:5000/updateMovie/", {
            title,
            year,
            imdbId,
            type,
            poster
        })
        .then((result) => {
            alert('Movie updated successfully');
        })
        .catch((error) => console.log('error',error));
    }

    return (
        <Container>
            {data.map((umovie) => {
                return (
                    <section key={umovie.imdbId}>
                        <Input
                            defaultValue={umovie.title}
                            onChange={e => setTitle(e.target.value)}
                        /><br />
                        <Input
                            defaultValue={umovie.year}
                            onChange={e => setYear(e.target.value)}
                        /><br />
                        <Input
                            defaultValue={umovie.type}
                            onChange={e => setType(e.target.value)}
                        /><br />
                        <Input
                            defaultValue={umovie.imdbId}
                            onChange={e => setImdbId(e.target.value)}
                        /><br />
                        <Input
                            defaultValue={umovie.poster}
                            onChange={e => setPoster(e.target.value)}
                        />
                        <button
                            type="button"
                            className="btn btn-warning"
                            onClick={updateMovie}
                        >
                            Update
                        </button>
                        <button
                            type="button"
                            className="btn btn-danger"
                            onClick={() => history.goBack()}
                        >
                            Go Back
                        </button>
                    </section>
                );
            })}
        </Container>
    );
}