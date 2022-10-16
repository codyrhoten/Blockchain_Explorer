import explorer from '../lib/explorer';
import { useState } from 'react';
import { Container, Form, InputGroup } from 'react-bootstrap';

const SearchBar = () => {
    const [search, setSearch] = useState('');

    const query = () => {
        const result = explorer(search);
        if (result) {
            // append result to appropriate route
        } else {
            /* front-end error handler here */
            setSearch('');
        }
    };

    return (
        <Container>
            <Form.Label htmlFor='destination'>
                <i>Chain PoW Testnet Explorer</i>
            </Form.Label>
            <InputGroup className='mb-3' /* style={{ height: "25px" }} */>
                <Form.Control
                    aria-label='Large'
                    onChange={e => {
                        setSearch(e.target.value);
                        console.log(e.target.value);
                    }}
                    value={search}
                    style={{
                        borderTopLeftRadius: '10px',
                        borderBottomLeftRadius: '10px',
                    }}
                    id='destination'
                    placeholder='Search by address / block Hash / txn Hash'
                />
                <InputGroup.Text
                    id='basic-addon1'
                    style={{
                        borderTopRightRadius: '10px',
                        borderBottomRightRadius: '10px',
                        cursor: "pointer",
                        backgroundColor: 'rgb(95,158,160)'
                    }}
                    onClick={query}
                >
                    Explore
                </InputGroup.Text>
            </InputGroup>
        </Container>
    );
};

export default SearchBar;