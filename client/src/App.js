import React from "react";
import "./App.css";

function App() {
    const [hexCode, setHexCode] = React.useState('');
    const [colorName, setColorName] = React.useState('');
    const [error, setError] = React.useState('');
    const [fetchTrigger, setFetchTrigger] = React.useState(false); // Trigger state

    React.useEffect(() => {
        if (fetchTrigger) {
            const fetchData = async () => {
                try {
                    const response = await fetch("/api/color", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ hexCode }),
                    });

                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }

                    const data = await response.json();
                    setColorName(data.colorName);
                    setError('');
                } catch (err) {
                    setError('Failed to fetch the color name and mood');
                } finally {
                    setFetchTrigger(false); // Reset the trigger
                }
            };

            fetchData();
        }
    }, [fetchTrigger, hexCode]);

    const handleSubmit = (event) => {
        event.preventDefault();
        setFetchTrigger(true); // Set the trigger to true to start the fetch
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Hex Code to Color Name Converter</h1>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        value={hexCode}
                        onChange={(e) => setHexCode(e.target.value)}
                        placeholder="#FFFFFF"
                    />
                    <button type="submit">Convert</button>
                </form>
                {error && <p className="error">{error}</p>}
                {colorName && (
                    <div style={{ backgroundColor: hexCode, padding: '20px', color: '#FFF' }}>
                        <h2>{colorName}</h2>
                    </div>
                )}
            </header>
        </div>
    );
}

export default App;
