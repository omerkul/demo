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
        <RefreshCw size={24} />
          Business Process Analytics
      </h2>

      <h3 style={{ marginBottom: '8px', fontSize: '1.1rem', fontWeight: '700' }}>
        🔁 Recurring Routines
      </h3>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        {data.recurringRoutines.map((routine) => (
          <div key={routine.routineLabel} className="card" style={{ flex: '1', padding: '12px' }}>
            <h3 style={{ color: '#667eea', fontSize: '1.05rem', fontWeight: '700', marginBottom: '6px' }}>
              📌 {routine.routineLabel}
            </h3>
            <p style={{
              padding: '8px',
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
              borderRadius: '6px',
              borderLeft: '2px solid #667eea',
              fontStyle: 'italic',
              fontSize: '0.85rem',
              marginBottom: '8px',
              lineHeight: '1.3'
            }}>
              {routine.patternSummary}
            </p>
            <div style={{ display: 'flex', gap: '8px', marginBottom: '8px', flexWrap: 'wrap' }}>
              <div style={{
                padding: '6px 10px',
                background: 'linear-gradient(135deg, #667eea 20%, #764ba2 100%)',
                borderRadius: '6px',
                color: 'white',
                boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                flex: '1',
                minWidth: '100px'
              }}>
                <strong style={{ fontSize: '0.75rem', display: 'block' }}>🔢 Occurrences</strong>
                <p style={{ fontSize: '1.2rem', fontWeight: '800', margin: '2px 0 0 0' }}>{routine.totalOccurrences}</p>
              </div>
              <div style={{
                padding: '6px 10px',
                background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                borderRadius: '6px',
                color: 'white',
                boxShadow: '0 2px 8px rgba(72, 187, 120, 0.3)',
                flex: '1',
                minWidth: '100px'
              }}>
                <strong style={{ fontSize: '0.75rem', display: 'block' }}>🏆 Top Agent</strong>
                <p style={{ fontSize: '0.9rem', fontWeight: '700', margin: '2px 0 0 0' }}>{routine.mostEfficientAgent.agentName}</p>
              </div>
            </div>
            <h4 style={{ marginTop: '8px', marginBottom: '6px', fontSize: '0.9rem', fontWeight: '600' }}>
              👥 Agent Performance
            </h4>
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th style={{ padding: '6px 8px', fontSize: '0.7rem' }}>Agent</th>
                    <th style={{ padding: '6px 8px', fontSize: '0.7rem' }}>Efficiency</th>
                    <th style={{ padding: '6px 8px', fontSize: '0.7rem' }}>Time</th>
                    <th style={{ padding: '6px 8px', fontSize: '0.7rem' }}>Justification</th>
                  </tr>
                </thead>
                <tbody>
                  {routine.agents.map((agent) => (
                    <tr key={agent.agentId}>
                      <td style={{ padding: '6px 8px', fontWeight: '700', fontSize: '0.8rem' }}>{agent.agentName}</td>
                      <td style={{ padding: '6px 8px' }}>
                        <span className="badge" style={{
                          background: getEfficiencyColor(agent.efficiency),
                          color: 'white',
                          whiteSpace: 'nowrap',
                          fontSize: '0.7rem',
                          padding: '2px 6px'
                        }}>
                          {getEfficiencyIcon(agent.efficiency)}
                          {agent.efficiency}
                        </span>
                      </td>
                      <td style={{ padding: '6px 8px', fontWeight: '700', color: '#667eea', fontSize: '0.8rem' }}>{agent.handleTime}</td>
                      <td style={{ padding: '6px 8px', fontSize: '0.75rem', lineHeight: '1.3' }}>{agent.justification}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

