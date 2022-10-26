import { Card, Col, Container, Row } from 'react-bootstrap';

const LatestTxs = ({ latestTxs }) => {
    const shortenAddress = address => {
        let start = address.substring(0, 4);
        let end = address.substring(address.length - 4);
        return start + '...' + end;
    };

    return (
        <Col className='lg-6'>
            <Card className='text-center'>
                <Card.Body>
                    <Card.Title>Latest Transactions</Card.Title>
                    {latestTxs && latestTxs.map((tx, i) => {
                        return (
                            <Container key={i}>
                                <Row>
                                    <Col>
                                        Tx {tx.hash.substring(0, 12)}...
                                    </Col>
                                    <Col>
                                        From: {shortenAddress(tx.sender)}<br />
                                        To: {shortenAddress(tx.recipient)}
                                    </Col>
                                    <Col>{tx.amount} ETH</Col>
                                </Row>
                                <br />
                            </Container>
                        );
                    })}
                    <Card.Link href='all-txs'>See all transactions</Card.Link>
                </Card.Body>
            </Card>
        </Col>
    );
}

export default LatestTxs;