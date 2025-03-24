const { useState, useEffect } = React;

function EvDashboard() {
    const [loading, setLoading] = useState(false);
    const [showData, setShowData] = useState(false);
    const [battery, setBattery] = useState(50);
    const [inputVoltage, setInputVoltage] = useState(400);
    const [outputVoltage, setOutputVoltage] = useState(inputVoltage * 0.95); // 5% lower than input
    const [heat, setHeat] = useState(30); // In °C
    const [coilTemp, setCoilTemp] = useState(35); // In °C
    const [power, setPower] = useState(20); // In kW
    const [timeToFullCharge, setTimeToFullCharge] = useState(60); // In minutes

    // Start button handler
    const handleStart = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setShowData(true);
        }, 10000);
    };

    // Simulate real-time data updates
    useEffect(() => {
        if (showData) {
            const interval = setInterval(() => {
                setBattery(prev => (prev < 100 ? prev + 1 : 100));
                setHeat(prev => (prev < 80 ? prev + 0.5 : 80));
                setCoilTemp(prev => (prev < 90 ? prev + 0.3 : 90));
                setPower(prev => (prev < 100 ? prev + 2 : 100));
                setTimeToFullCharge(prev => (prev > 0 ? prev - 1 : 0));
            }, 3000);
            return () => clearInterval(interval);
        }
    }, [showData]);

    // Tab switch alert
    useEffect(() => {
        const handleVisibilityChange = () => {
            if (document.hidden) {
                alert("Server connection might be lost!");
            }
        };
        document.addEventListener("visibilitychange", handleVisibilityChange);
        return () => document.removeEventListener("visibilitychange", handleVisibilityChange);
    }, []);

    return (
        <div className="dashboard">
            {!showData ? (
                <button className="start-btn" onClick={handleStart}>Start</button>
            ) : null}

            {loading && <p className="loading-text">Fetching data from server...</p>}

            {showData && !loading && (
                <div>
                    <h1>EV Dashboard</h1>
                    <div className="stats">
                        <div className="stat-box">
                            <span>Battery</span>
                            <h2>{battery}%</h2>
                        </div>
                        <div className="stat-box">
                            <span>Input Voltage</span>
                            <h2>{inputVoltage}V</h2>
                        </div>
                        <div className="stat-box">
                            <span>Output Voltage</span>
                            <h2>{outputVoltage.toFixed(1)}V</h2>
                        </div>
                        <div className="stat-box">
                            <span>Heat</span>
                            <h2>{heat}°C</h2>
                        </div>
                        <div className="stat-box">
                            <span>Coil Temperature</span>
                            <h2>{coilTemp}°C</h2>
                        </div>
                        <div className="stat-box">
                            <span>Power</span>
                            <h2>{power} kW</h2>
                        </div>
                        <div className="stat-box">
                            <span>Time to Full Charge</span>
                            <h2>{timeToFullCharge} min</h2>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

// Render the React component
ReactDOM.createRoot(document.getElementById("root")).render(<EvDashboard />);
