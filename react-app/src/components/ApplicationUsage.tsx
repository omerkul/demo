import { Monitor, Flame } from 'lucide-react';
import { ApplicationUsage as ApplicationUsageType } from '../types';

interface Props {
  data: ApplicationUsageType;
}

const getGradientForIndex = (index: number) => {
  const gradients = [
    'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)',
    'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
    'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)',
    'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'
  ];
  return gradients[index] || gradients[3];
};

const getMedalForIndex = (index: number) => {
  if (index === 0) return '🥇';
  if (index === 1) return '🥈';
  if (index === 2) return '🥉';
  return '📱';
};

export default function ApplicationUsage({ data }: Props) {
  return (
    <section className="section">
      <h2 className="section-title">
        <Monitor size={32} />
        Application Usage
      </h2>

      <h3 style={{ marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Flame size={24} stroke="#f56565" />
        Most Used Applications
      </h3>
      <div className="card-grid">
        {data.mostUsedApplications.map((app, index) => (
          <div key={app.applicationName} className="card" style={{ background: getGradientForIndex(index) }}>
            <h3 className="card-title" style={{ fontSize: '1.4rem' }}>
              {getMedalForIndex(index)} {app.applicationName}
            </h3>
            <p style={{ marginBottom: '10px' }}>
              <strong>⏰ Total Active Time:</strong>{' '}
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#2d3748' }}>{app.totalActiveTime}</span>
            </p>
            <p>
              <strong>🔢 Usage Count:</strong>{' '}
              <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#2d3748' }}>{app.usageCount}</span>
            </p>
          </div>
        ))}
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700' }}>
        Application Breakdown by Agent
      </h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Agent Name</th>
              {data.applicationBreakdown.map((app) => (
                <th key={app.applicationName}>
                  {app.applicationName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {(() => {
              // Build a map of agents and their usage per application
              const agentMap = new Map<string, { agentName: string; apps: Map<string, string> }>();

              data.applicationBreakdown.forEach((app) => {
                app.usageByAgent.forEach((agent) => {
                  if (!agentMap.has(agent.agentId)) {
                    agentMap.set(agent.agentId, {
                      agentName: agent.agentName,
                      apps: new Map()
                    });
                  }
                  agentMap.get(agent.agentId)!.apps.set(app.applicationName, agent.activeTime);
                });
              });

              return Array.from(agentMap.values()).map((agent) => (
                <tr key={agent.agentName}>
                  <td style={{ fontWeight: '700', background: '#e6f2ff', color: '#2c5282' }}>{agent.agentName}</td>
                  {data.applicationBreakdown.map((app) => (
                    <td key={app.applicationName} style={{
                      textAlign: 'left',
                      color: agent.apps.has(app.applicationName) ? '#2d3748' : '#cbd5e0'
                    }}>
                      {agent.apps.get(app.applicationName) || '-'}
                    </td>
                  ))}
                </tr>
              ));
            })()}
            <tr style={{
              borderTop: '2px solid #4a5568',
              background: '#f7fafc',
              fontWeight: '700'
            }}>
              <td style={{ fontWeight: '700', fontSize: '1.05rem' }}>Total</td>
              {data.applicationBreakdown.map((app) => (
                <td key={app.applicationName} style={{
                  textAlign: 'left',
                  fontWeight: '700',
                  fontSize: '1.05rem',
                  color: '#2d3748'
                }}>
                  {app.totalActiveTime}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

