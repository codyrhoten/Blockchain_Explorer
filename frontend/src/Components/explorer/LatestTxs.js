import { Card, Col, Container, Row } from 'react-bootstrap';

const LatestTxs = ({ txs }) => {
    const shortenAddress = address => {
        let start = address.substring(0, 4);
        let end = address.substring(address.length - 4);
        return start + '...' + end;
    };

    console.log(txs)

    return (
        <Col className='lg-6'>
            <Card>
                <Card.Body>
                    <Card.Title>Latest Transactions</Card.Title>
                    {txs && txs.map((tx, i) => {
                        return (
                            <Container key={i}>
                                <Row>
                                    <Col>
                                        Tx {tx.hash.substring(0, 8)}...
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
                </Card.Body>
            </Card>
        </Col>
    );
}

export default LatestTxs;