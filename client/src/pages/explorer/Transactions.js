import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Container } from 'react-bootstrap';
import Header from '../../components/Header';
import SearchBar from '../../components/explorer/SearchBar';
import TxTable from '../../components/explorer/TxTable';
// dummy data
import api from '../../dummyApi';

const Transactions = ({ navLinks }) => {
    const blockIndex = useLocation().state;
    const [txs, setTxs] = useState([]);
    const [heading, setHeading] = useState('');

    useEffect(() => {
        (async function () {
            
            if (blockIndex) {
                const blockchain = 
                    await axios.get('http://localhost:3333/blockchain');
                const block = blockchain.data.chain[blockIndex];
                setTxs(block.data);

                setHeading(
                    <h4 align='center'>
                        <Link
                            to={`/block/${blockIndex}`}
                            style={{ textDecoration: 'none' }}
                        >
                            Block {blockIndex}
                        </Link>
                        {' '}Transactions
                    </h4>
                );
            } else {
                const txs = await axios.get('http://localhost:3333/allTxs');
                setTxs(txs.data);

                setHeading(
                    <h4 align='center'>
                        All Transactions
                    </h4>
                );
            }
        })();
    }, [blockIndex]);

    return (
        <>
            <Header navLinks={navLinks} />
            <Container>
                <SearchBar />
                {heading}
                {txs.length > 0 && <TxTable txs={txs} />}
            </Container>
        </>
    );
};

export default Transactions;