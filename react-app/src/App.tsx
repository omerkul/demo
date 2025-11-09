import { useState, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { ReportData } from './types';
import ReportMetadata from './components/ReportMetadata';
import AggregatedMetrics from './components/AggregatedMetrics';
import AgentPerformance from './components/AgentPerformance';
import ApplicationUsage from './components/ApplicationUsage';
import BusinessProcessAnalysis from './components/BusinessProcessAnalysis';
import Synthesis from './components/Synthesis';

function App() {
  const [data, setData] = useState<ReportData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data.json')
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
          <Loader2 size={48} className="animate-spin" />
          <p style={{ marginTop: '20px' }}>Loading your amazing report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <div className="loading">
          <p style={{ color: '#f56565' }}>{error}</p>
        </div>
      </div>
    );
  }

  if (!data) {
    return null;
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="app-title">🚀 Process Discovery Report</h1>
        <p style={{ fontSize: '1.1rem', color: '#718096' }}>
          Comprehensive analysis of agent performance and process efficiency
        </p>
      </header>

      <ReportMetadata data={data.reportMetadata} />
      <AggregatedMetrics data={data.aggregatedMetrics} />
      <AgentPerformance data={data.agentPerformance} />
      <ApplicationUsage data={data.applicationUsage} />
      <BusinessProcessAnalysis data={data.businessProcessAnalysis} />
      <Synthesis data={data.synthesis} />
    </div>
  );
}

export default App;

