import { Card, Container, Table } from 'react-bootstrap';
import SearchBar from '../../components/explorer/SearchBar';
import Header from '../../components/Header';
import formatTimestamp from '../../utils/formatTimestamp';

const AllBlocks = ({ blocks, navLinks }) => {
    console.log(blocks)
    
    return (
        <>
            <Header navLinks={navLinks} />
            <Container>
                <SearchBar />
                <Card>
                    <Card.Body>
                        <Card.Title>Blocks</Card.Title>
                        <Table>
                            <thead>
                                <tr>
                                    <th>Index</th>
                                    <th>Timestamp</th>
                                    {/* <th>Mined By</th> */}
                                    <th>Transactions</th>
                                    {/* <th>Reward</th> */}
                                </tr>
                            </thead>
                            <tbody>
                                {blocks.length > 0 &&
                                    blocks.map((b, i) => (
                                        <tr style={{ cursor: 'pointer'}} key={i}>
                                            <td>{b.index}     </td>
                                            <td>{formatTimestamp(b)}</td>
                                            {/* <td>{b.minedBy}</td> */}
                                            <td>{b.txs.length}</td>
                                            {/* <td>{b.reward}</td> */}
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
};

export default AllBlocks;