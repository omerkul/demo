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
        <Trophy size={24} />
        Agent Performance
      </h2>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        {/* Most Productive Agents - Left Side */}
        <div style={{ flex: '0 0 35%' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Star size={16} fill="#f6ad55" stroke="#f6ad55" />
            Most Productive Agents
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.mostProductiveAgents.map((agent) => (
              <div key={agent.agentId} className="card" style={{ borderTop: `3px solid ${getRatingColor(agent.metrics.qualitativeRating)}`, padding: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: '700', margin: 0 }}>{agent.agentName}</h3>
                  <span className="badge badge-success" style={{ background: getRatingColor(agent.metrics.qualitativeRating), padding: '3px 8px', fontSize: '0.7rem' }}>
                    {agent.metrics.qualitativeRating}
                  </span>
                </div>
                <div style={{ fontSize: '0.75rem', marginBottom: '4px' }}>
                  <strong>Handle Time:</strong>{' '}
                  <span style={{ color: '#667eea', fontWeight: '700' }}>{agent.metrics.averageIssueHandleTime}</span>
                </div>
                <div style={{ fontSize: '0.75rem', marginBottom: '6px' }}>
                  <strong>After-Call:</strong>{' '}
                  <span style={{ color: '#667eea', fontWeight: '700' }}>{agent.metrics.averageAfterCallWorkTime}</span>
                </div>
                <div style={{
                  padding: '6px',
                  background: 'rgba(102, 126, 234, 0.1)',
                  borderRadius: '6px',
                  borderLeft: '2px solid #667eea',
                  fontSize: '0.7rem'
                }}>
                  <strong>💡</strong> {agent.justification}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Agent Leaderboard - Right Side */}
        <div style={{ flex: '1' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Medal size={16} stroke="#667eea" />
            Agent Leaderboard
          </h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ padding: '8px 10px', fontSize: '0.7rem' }}>Rank</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.7rem' }}>Agent Name</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.7rem' }}>Calls</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.7rem' }}>Avg Handle Time</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.7rem' }}>Avg After-Call</th>
                </tr>
              </thead>
              <tbody>
                {data.agentLeaderboard.map((agent, index) => (
                  <tr key={agent.agentId}>
                    <td style={{ padding: '8px 10px', fontWeight: 'bold', fontSize: '0.9rem', color: index < 3 ? '#f6ad55' : '#667eea' }}>
                      {getMedalIcon(index)}
                    </td>
                    <td style={{ padding: '8px 10px', fontWeight: '700', fontSize: '0.85rem' }}>{agent.agentName}</td>
                    <td style={{ padding: '8px 10px', textAlign: 'center', fontWeight: '700', fontSize: '0.85rem' }}>{agent.totalCalls}</td>
                    <td style={{ padding: '8px 10px', fontWeight: '700', color: '#667eea', fontSize: '0.85rem' }}>{agent.averageIssueHandleTime}</td>
                    <td style={{ padding: '8px 10px', fontWeight: '700', color: '#f5576c', fontSize: '0.85rem' }}>{agent.averageAfterCallWorkTime}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

