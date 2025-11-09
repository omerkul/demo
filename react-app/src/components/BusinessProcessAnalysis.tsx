import { RefreshCw, Zap, Rocket, TrendingDown } from 'lucide-react';
import { BusinessProcessAnalysis as BusinessProcessAnalysisType } from '../types';

interface Props {
  data: BusinessProcessAnalysisType;
}

const getEfficiencyColor = (efficiency: string) => {
  if (efficiency === 'Most Efficient') return '#48bb78';
  if (efficiency === 'Least Efficient') return '#f56565';
  return '#4299e1';
};

const getEfficiencyIcon = (efficiency: string) => {
  if (efficiency === 'Most Efficient') return <Rocket size={16} />;
  if (efficiency === 'Least Efficient') return <TrendingDown size={16} />;
  return <Zap size={16} />;
};

export default function BusinessProcessAnalysis({ data }: Props) {
  return (
    <section className="section">
      <h2 className="section-title">
        <RefreshCw size={32} />
        Business Process Analysis
      </h2>

      <h3 style={{ marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700' }}>
        🔁 Recurring Routines
      </h3>
      {data.recurringRoutines.map((routine) => (
        <div key={routine.routineLabel} className="card" style={{ marginBottom: '30px' }}>
          <h3 className="card-title" style={{ color: '#667eea', fontSize: '1.5rem' }}>
            📌 {routine.routineLabel}
          </h3>
          <p style={{
            padding: '16px',
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            borderRadius: '12px',
            borderLeft: '5px solid #667eea',
            fontStyle: 'italic',
            fontSize: '1.05rem',
            marginBottom: '20px'
          }}>
            {routine.patternSummary}
          </p>
          <div style={{ display: 'flex', gap: '30px', marginBottom: '20px', flexWrap: 'wrap' }}>
            <div style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, #667eea 20%, #764ba2 100%)',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
            }}>
              <strong style={{ fontSize: '0.9rem' }}>🔢 Total Occurrences</strong>
              <p style={{ fontSize: '2rem', fontWeight: '800', margin: '8px 0 0 0' }}>{routine.totalOccurrences}</p>
            </div>
            <div style={{
              padding: '16px 24px',
              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              borderRadius: '12px',
              color: 'white',
              boxShadow: '0 8px 20px rgba(72, 187, 120, 0.3)'
            }}>
              <strong style={{ fontSize: '0.9rem' }}>🏆 Most Efficient Agent</strong>
              <p style={{ fontSize: '1.3rem', fontWeight: '700', margin: '8px 0 0 0' }}>{routine.mostEfficientAgent.agentName}</p>
            </div>
          </div>
          <h4 style={{ marginTop: '30px', marginBottom: '15px', fontSize: '1.15rem', fontWeight: '600' }}>
            👥 Agent Performance Comparison
          </h4>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Agent Name</th>
                  <th>Efficiency</th>
                  <th>Handle Time</th>
                  <th>Justification</th>
                </tr>
              </thead>
              <tbody>
                {routine.agents.map((agent) => (
                  <tr key={agent.agentId}>
                    <td style={{ fontWeight: '700' }}>{agent.agentName}</td>
                    <td>
                      <span className="badge" style={{
                        background: getEfficiencyColor(agent.efficiency),
                        color: 'white',
                        whiteSpace: 'nowrap'
                      }}>
                        {getEfficiencyIcon(agent.efficiency)}
                        {agent.efficiency}
                      </span>
                    </td>
                    <td style={{ fontWeight: '700', color: '#667eea', fontSize: '1.05rem' }}>{agent.handleTime}</td>
                    <td style={{ fontSize: '0.95rem' }}>{agent.justification}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </section>
  );
}

