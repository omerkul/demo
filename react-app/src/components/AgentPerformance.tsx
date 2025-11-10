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

      {/* Agent Leaderboard Table - On Top */}
      <div style={{ marginBottom: '10px' }}>
        <h3 style={{ marginBottom: '8px', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Medal size={16} stroke="#667eea" />
          Agent Leaderboard
        </h3>
        <div className="table-container">
          <table style={{ tableLayout: 'fixed', width: '100%' }}>
            <colgroup>
              <col style={{ width: '8%' }} />
              <col style={{ width: '30%' }} />
              <col style={{ width: '12%' }} />
              <col style={{ width: '25%' }} />
              <col style={{ width: '25%' }} />
            </colgroup>
            <thead>
              <tr>
                <th style={{ padding: '4px 6px', fontSize: '0.7rem' }}>Rank</th>
                <th style={{ padding: '4px 6px', fontSize: '0.7rem' }}>Agent Name</th>
                <th style={{ padding: '4px 6px', fontSize: '0.7rem' }}>Calls</th>
                <th style={{ padding: '4px 6px', fontSize: '0.7rem' }}>Avg Handle Time</th>
                <th style={{ padding: '4px 6px', fontSize: '0.7rem' }}>Avg After-Call</th>
              </tr>
            </thead>
            <tbody>
              {data.agentLeaderboard.map((agent, index) => (
                <tr key={agent.agentId}>
                  <td style={{ padding: '4px 6px', fontWeight: 'bold', fontSize: '0.8rem', color: index < 3 ? '#f6ad55' : '#667eea', textAlign: 'center' }}>
                    {getMedalIcon(index)}
                  </td>
                  <td style={{ padding: '4px 6px', fontWeight: '700', fontSize: '0.8rem' }}>{agent.agentName}</td>
                  <td style={{ padding: '4px 6px', textAlign: 'center', fontWeight: '700', fontSize: '0.8rem' }}>{agent.totalCalls}</td>
                  <td style={{ padding: '4px 6px', fontWeight: '700', color: '#667eea', fontSize: '0.8rem' }}>{agent.averageIssueHandleTime}</td>
                  <td style={{ padding: '4px 6px', fontWeight: '700', color: '#f5576c', fontSize: '0.8rem' }}>{agent.averageAfterCallWorkTime}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Most Productive Agents - Side by Side Below */}
      <div>
        <h3 style={{ marginBottom: '8px', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Star size={16} fill="#f6ad55" stroke="#f6ad55" />
          Most Productive Agents
        </h3>
        <div style={{ display: 'flex', gap: '10px' }}>
          {data.mostProductiveAgents.map((agent) => (
            <div key={agent.agentId} className="card" style={{ flex: '1', borderTop: `3px solid ${getRatingColor(agent.metrics.qualitativeRating)}`, padding: '10px' }}>
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
                padding: '10px',
                background: 'rgba(102, 126, 234, 0.1)',
                borderRadius: '8px',
                borderLeft: '3px solid #667eea',
                fontSize: '0.85rem'
              }}>
                <strong>💡 Justification:</strong>
                <p style={{ marginTop: '4px', fontSize: '0.85rem', lineHeight: '1.3' }}>{agent.justification}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

