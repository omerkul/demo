import {useState, useEffect} from 'react';
import {Loader2} from 'lucide-react';
import {ReportData} from './types';
import ReportMetadata from './components/ReportMetadata';
import AgentPerformance from './components/AgentPerformance';
import ApplicationUsage from './components/ApplicationUsage';
import BusinessProcessAnalysis from './components/BusinessProcessAnalysis';
import Synthesis from './components/Synthesis';
import Chatbot from './components/Chatbot';
import Summary from './components/Summary';
import niceLogo from './nicecx.png';

function App() {
    const [data, setData] = useState<ReportData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<'dashboard' | 'summary'>('dashboard');

    useEffect(() => {
        // Use base URL to ensure correct path on GitHub Pages
        const dataPath = import.meta.env.BASE_URL + 'data.json';
        fetch(dataPath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to load data');
                }
                return response.json();
            })
            .then((jsonData) => {
                setData(jsonData);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Error loading data:', err);
                setError('Failed to load report data. Please check the console for details.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div className="app-container">
                <div className="loading">
                    <Loader2 size={48} className="animate-spin"/>
                    <p style={{marginTop: '20px'}}>Loading your amazing report...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="app-container">
                <div className="loading">
                    <p style={{color: '#f56565'}}>{error}</p>
                </div>
            </div>
        );
    }

    if (!data) {
        return null;
    }

    return (
        <>
            <div style={{display: 'flex', minHeight: '100vh'}}>
                {/* Left Sidebar Navigation */}
                <div style={{
                    width: '200px',
                    background: 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
                    padding: '20px 0',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px',
                    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.1)'
                }}>
                    <div style={{padding: '0 20px', marginBottom: '20px'}}>
                        <img src={niceLogo} alt="NiCE Logo" style={{width: '100%', height: 'auto'}}/>
                    </div>

                    <button
                        onClick={() => setCurrentPage('summary')}
                        style={{
                            padding: '15px 20px',
                            background: currentPage === 'summary' ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                            color: 'white',
                            border: 'none',
                            borderLeft: currentPage === 'summary' ? '4px solid white' : '4px solid transparent',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '700',
                            textAlign: 'left',
                            transition: 'all 0.3s ease',
                            fontFamily: 'inherit'
                        }}
                        onMouseEnter={(e) => {
                            if (currentPage !== 'summary') {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (currentPage !== 'summary') {
                                e.currentTarget.style.background = 'transparent';
                            }
                        }}
                    >
                        📝 Summary
                    </button>

                    <button
                        onClick={() => setCurrentPage('dashboard')}
                        style={{
                            padding: '15px 20px',
                            background: currentPage === 'dashboard' ? 'rgba(255, 255, 255, 0.3)' : 'transparent',
                            color: 'white',
                            border: 'none',
                            borderLeft: currentPage === 'dashboard' ? '4px solid white' : '4px solid transparent',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            fontWeight: '700',
                            textAlign: 'left',
                            transition: 'all 0.3s ease',
                            fontFamily: 'inherit'
                        }}
                        onMouseEnter={(e) => {
                            if (currentPage !== 'dashboard') {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                            }
                        }}
                        onMouseLeave={(e) => {
                            if (currentPage !== 'dashboard') {
                                e.currentTarget.style.background = 'transparent';
                            }
                        }}
                    >
                        📊 Dashboard
                    </button>
                </div>

                {/* Main Content Area */}
                <div style={{flex: 1, padding: '2px'}}>
                    <div className="app-container">
                        <header className="app-header">
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                position: 'relative'
                            }}>
                                <h1 className="app-title" style={{fontSize: '2.5rem'}}>
                                    NiCE CXone Workforce
                                    Augmentation {currentPage === 'dashboard' ? 'Dashboard' : 'Summary'}
                                </h1>
                            </div>
                        </header>

                        {/* Conditional Page Rendering */}
                        {currentPage === 'dashboard' ? (
                            <>
                                {/* First row: Report Overview and Agent Performance side by side */}
                                <div style={{display: 'flex', gap: '12px', marginBottom: '6px'}}>
                                    <div style={{flex: '1'}}>
                                        <ReportMetadata metadata={data.reportMetadata}
                                                        metrics={data.aggregatedMetrics}/>
                                    </div>
                                    <div style={{flex: '1'}}>
                                        <AgentPerformance data={data.agentPerformance}/>
                                    </div>
                                </div>

                                {/* Second row: Application Usage and Business Process Analysis side by side */}
                                <div style={{display: 'flex', gap: '12px', marginBottom: '6px'}}>
                                    <div style={{flex: '1'}}>
                                        <ApplicationUsage data={data.applicationUsage}/>
                                    </div>
                                    <div style={{flex: '1'}}>
                                        <BusinessProcessAnalysis data={data.businessProcessAnalysis}/>
                                    </div>
                                </div>

                                <Synthesis data={data.synthesis} fullData={data}/>
                            </>
                        ) : (
                            <Summary/>
                        )}
                    </div>
                </div>
            </div>

            {/* AI Copilot Chatbot - Outside container for proper floating */}
            {currentPage === 'dashboard' && <Chatbot data={data}/>}
        </>
    );
}

export default App;

