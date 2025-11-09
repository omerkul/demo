import { Trophy, Star, Medal } from 'lucide-react';
import { AgentPerformance as AgentPerformanceType } from '../types';

interface Props {
  data: AgentPerformanceType;
}

const getRatingColor = (rating: string) => {
  if (rating === 'Excellent') return '#48bb78';
  if (rating === 'Good') return '#4299e1';
  return '#ed8936';
};

const getMedalIcon = (index: number) => {
  if (index === 0) return '🥇';
  if (index === 1) return '🥈';
  if (index === 2) return '🥉';
  return `#${index + 1}`;
};

export default function AgentPerformance({ data }: Props) {
  return (
    <section className="section">
      <h2 className="section-title">
        <Trophy size={32} />
        Agent Performance
      </h2>

      <h3 style={{ marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Star size={24} fill="#f6ad55" stroke="#f6ad55" />
        Most Productive Agents
      </h3>
      <div className="card-grid">
        {data.mostProductiveAgents.map((agent) => (
          <div key={agent.agentId} className="card" style={{ borderTop: `5px solid ${getRatingColor(agent.metrics.qualitativeRating)}` }}>
            <h3 className="card-title">{agent.agentName}</h3>
            <span className="badge badge-success" style={{ background: getRatingColor(agent.metrics.qualitativeRating), marginBottom: '16px' }}>
              {agent.metrics.qualitativeRating}
            </span>
            <p style={{ marginBottom: '10px' }}>
              <strong>Avg Issue Handle Time:</strong>{' '}
              <span style={{ color: '#667eea', fontWeight: '700' }}>{agent.metrics.averageIssueHandleTime}</span>
            </p>
            <p style={{ marginBottom: '16px' }}>
              <strong>Avg After-Call Work:</strong>{' '}
              <span style={{ color: '#667eea', fontWeight: '700' }}>{agent.metrics.averageAfterCallWorkTime}</span>
            </p>
            <div style={{
              padding: '14px',
              background: 'rgba(102, 126, 234, 0.1)',
              borderRadius: '12px',
              borderLeft: '4px solid #667eea'
            }}>
              <strong>💡 Justification:</strong>
              <p style={{ marginTop: '8px' }}>{agent.justification}</p>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Medal size={24} stroke="#667eea" />
        Agent Leaderboard
      </h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Agent Name</th>
              <th>Total Calls</th>
              <th>Avg Issue Handle Time</th>
              <th>Avg After-Call Work</th>
            </tr>
          </thead>
          <tbody>
            {data.agentLeaderboard.map((agent, index) => (
              <tr key={agent.agentId}>
                <td style={{ fontWeight: 'bold', fontSize: '1.3rem', color: index < 3 ? '#f6ad55' : '#667eea' }}>
                  {getMedalIcon(index)}
                </td>
                <td style={{ fontWeight: '700' }}>{agent.agentName}</td>
                <td style={{ textAlign: 'center', fontWeight: '700', fontSize: '1.1rem' }}>{agent.totalCalls}</td>
                <td style={{ fontWeight: '700', color: '#667eea' }}>{agent.averageIssueHandleTime}</td>
                <td style={{ fontWeight: '700', color: '#f5576c' }}>{agent.averageAfterCallWorkTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

