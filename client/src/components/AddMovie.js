import React, { useState} from 'react';
import { Container, Input, Button } from 'reactstrap';
import { useHistory } from 'react-router-dom';
import Axios from 'axios';

export default function AddMovie() {
    const [ title, setTitle ] = useState('');
    const [ year, setYear ] = useState('');
    const [ imdbId, setImdbId ] = useState('');
    const [ type, setType ] = useState('');
    const [ poster, setPoster ] = useState('');
    const [ data, setData ] = useState({});
    const history = useHistory();

    function onClickAdd() {
        Axios.post("http://localhost:5000/addMovie/", {
            title,
            year,
            imdbId,
            type,
            poster
        })
        .then((result) => {
            setData(result);
            alert(`Movie added successfully`);
        })
        .catch((error) => console.log('error',error));
    }
    
    return (
        <Container style={{ marginTop : "40px"}}>
            <section>
                <Input
                    placeholder="Enter Title"
                    onChange={e => setTitle(e.target.value)}
                /><br />
                <Input
                    placeholder="Enter Year"
                    onChange={e => setYear(e.target.value)}
                /><br />
                <Input
                    placeholder="Enter Type"
                    onChange={e => setType(e.target.value)}
                /><br />
                <Input
                    placeholder="Enter ImdbId"
                    onChange={e => setImdbId(e.target.value)}
                /><br />
                <Input
                    placeholder="Enter Poster Link"
                    onChange={e => setPoster(e.target.value)}
                /><br />
                <Button color="success" onClick={onClickAdd}>
                    Add
                </Button>
                <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => history.goBack()}
                >
                    Go Back
                </button>
            </section>
        </Container>
    );
}