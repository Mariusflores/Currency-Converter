import './App.css';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Alert, Card, Container, Form} from 'react-bootstrap';
import {useEffect, useState} from 'react';
import currencyDictionary from "./currencyCodes";
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt } from '@fortawesome/free-solid-svg-icons';

function App() {
    const [fromCurrency, setFromCurrency] = useState('USD');
    const [toCurrency, setToCurrency] = useState('USD');
    const [amount, setAmount] = useState(0);
    // eslint-disable-next-line
    const [showResult, setShowResult] = useState(false);

    const [alertFromCurrency, setAlertFromCurrency] = useState('---');
    const [alertToCurrency, setAlertToCurrency] = useState('---');
    const [alertConvertedAmount, setAlertConvertedAmount] = useState(0);
    const [alertAmount, setAlertAmount] = useState(0);

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

            // Update the state values used in the Alert
            setAlertFromCurrency(fromCode);
            setAlertToCurrency(toCode);
            setAlertConvertedAmount(conversionResult.toFixed(2));
            setAlertAmount(amount)

            setShowResult(true);
        } catch (error) {
            console.error("Error converting amount", error);
        }
    }

    // Function to handle the swap of "From" and "To" currencies
    const handleSwapCurrencies = () => {
        setFromCurrency(toCurrency);
        setToCurrency(fromCurrency);
    };

    const initializeCurrencies = () => {
        const storedFromCurrency = localStorage.getItem('fromCurrency');
        const storedToCurrency = localStorage.getItem('toCurrency');
        const storedAmount = localStorage.getItem('amount');

        if (storedFromCurrency && storedToCurrency) {
            setFromCurrency(storedFromCurrency);
            setToCurrency(storedToCurrency);
            setAmount(storedAmount)
        }
    };

    // Function to handle changes to currencies and store in localStorage
    const handleCurrencyChange = (value, setterFunction) => {
        console.log('Setter Function:', setterFunction.name);

        setterFunction(value);

        if (setterFunction === setFromCurrency) {
            console.log('Storing in localStorage: fromCurrency');
            localStorage.setItem('fromCurrency', value);
        } else if (setterFunction === setToCurrency) {
            console.log('Storing in localStorage: toCurrency');
            localStorage.setItem('toCurrency', value);
        }else if (setterFunction === setAmount){
            localStorage.setItem('amount', value);
        }

    };





    // Call initializeCurrencies when the component mounts
    useEffect(() => {
        initializeCurrencies();
    }, []); // Empty dependency array ensures this effect runs once on mount


    return (
        <div className="App" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <Form>
                <Card bg={"dark"} style={{ width: '70rem', height: '35rem', alignItems: "center" }}>
                    <Card.Header style={{ color: 'white', padding: '1.75rem' }}>Currency Converter</Card.Header>
                    <Card.Body style={{ display: 'flex' }}>
                        <Container>
                            <Form.Text style={{ color: 'white' }}>Amount</Form.Text>
                            <Form.Control
                                type={'number'}
                                value={amount}
                                onChange={(e) => handleCurrencyChange(e.target.value, setAmount)}
                            />
                        </Container>
                        <Container>
                            <Form.Text style={{ color: 'white' }}>From</Form.Text>
                            <Form.Select value={fromCurrency} onChange={(e) => handleCurrencyChange(e.target.value, setFromCurrency)}>
                                {Object.keys(currencyDictionary).map((code) => (
                                    <option key={code} value={code}>{code} ({currencyDictionary[code]})</option>
                                ))}
                            </Form.Select>
                        </Container>
                        <Button variant={"dark"} onClick={handleSwapCurrencies} style={{ marginTop: '1rem', height: '3rem'}}>
                            <FontAwesomeIcon icon={faExchangeAlt}/>
                        </Button>
                        <Container>
                            <Form.Text style={{ color: 'white' }}>To</Form.Text>
                            <Form.Select value={toCurrency} onChange={(e) => handleCurrencyChange(e.target.value, setToCurrency)}>
                                {Object.keys(currencyDictionary).map((code) => (
                                    <option key={code} value={code}>{code} ({currencyDictionary[code]})</option>
                                ))}
                            </Form.Select>
                        </Container>
                    </Card.Body>
                    <Button variant={"secondary"} className={"btn-lg"}  onClick={handleSubmit}>Convert</Button>
                    {showResult && (
                        <Alert variant="secondary" className="mt-2">
                            {alertAmount} {alertFromCurrency} = {alertConvertedAmount} {alertToCurrency}
                        </Alert>
                    )}
                </Card>
            </Form>
        </div>
    );
}

export default App;