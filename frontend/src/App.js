import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Card, Container, Form} from 'react-bootstrap';
import { useState } from 'react';
import currencyDictionary from "./currencyCodes";
import axios from 'axios'

function App() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('USD');
    const [amount, setAmount] = useState(0);
    const [convertedAmount, setConvertedAmount] = useState(0);
    const [showResult, setShowResult] = useState(false);

    const [alertFromCurrency, setAlertFromCurrency] = useState('---');
    const [alertToCurrency, setAlertToCurrency] = useState('---');
    const [alertConvertedAmount, setAlertConvertedAmount] = useState('---');

    async function handleSubmit() {
        try {
            const response = await axios.post("http://localhost:8080/api/convert", {
                fromCode: fromCurrency,
                toCode: toCurrency,
                amount: amount
            });

            console.log(
                response.data
            )

            const {conversionResult, fromCode, toCode } = response.data;
            setConvertedAmount(conversionResult);

            // Update the state values used in the Alert
            setAlertFromCurrency(fromCode);
            setAlertToCurrency(toCode);
            setAlertConvertedAmount(conversionResult);

            setShowResult(true);
        } catch (error) {
            console.error("Error converting amount", error);
        }
    }

    return (
        <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form className={'mb-2'}>
                <Card bg={'dark'} style={{ width: '50rem', height: '25rem' }}>
                    <Card.Header style={{ color: 'white' }}>Currency Converter</Card.Header>
                    <Card.Body style={{ display: 'flex' }}>
                        <Container>
                            <Form.Text style={{ color: 'white' }}>Amount</Form.Text>
                            <Form.Control
                                type={'number'}
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </Container>
                        <Container>
                            <Form.Text style={{ color: 'white' }}>From</Form.Text>
                            <Form.Select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
                                {Object.keys(currencyDictionary).map((code) => (
                                    <option key={code} value={code}>{code} ({currencyDictionary[code]})</option>
                                ))}
                            </Form.Select>
                        </Container>
                        <Container>
                            <Form.Text style={{ color: 'white' }}>To</Form.Text>
                            <Form.Select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
                                {Object.keys(currencyDictionary).map((code) => (
                                    <option key={code} value={code}>{code} ({currencyDictionary[code]})</option>
                                ))}
                            </Form.Select>
                        </Container>
                    </Card.Body>
                    <Button onClick={handleSubmit}>Convert</Button>
                    {showResult && (
                        <Alert variant="success" className="mt-2">
                            {amount} {alertFromCurrency} = {alertConvertedAmount} {alertToCurrency}
                        </Alert>
                    )}
                </Card>
            </Form>
        </div>
    );
}

export default App;