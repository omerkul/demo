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
        <Monitor size={24} />
        Application Usage
      </h2>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        {/* Left Side - Most Used Applications */}
        <div style={{ flex: '0 0 30%' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '1rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Flame size={16} stroke="#f56565" />
            Most Used Applications
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.mostUsedApplications.map((app, index) => (
              <div key={app.applicationName} className="card" style={{ background: getGradientForIndex(index), padding: '10px' }}>
                <h3 style={{ fontSize: '0.9rem', fontWeight: '700', marginBottom: '6px' }}>
                  {getMedalForIndex(index)} {app.applicationName}
                </h3>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                  <div>
                    <strong>⏰ Active Time:</strong>{' '}
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#2d3748' }}>{app.totalActiveTime}</span>
                  </div>
                  <div>
                    <strong>🔢 Count:</strong>{' '}
                    <span style={{ fontSize: '0.9rem', fontWeight: '800', color: '#2d3748' }}>{app.usageCount}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side - Application Breakdown Table */}
        <div style={{ flex: '1' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '1rem', fontWeight: '700' }}>
            Application Breakdown by Agent
          </h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ padding: '8px 10px', fontSize: '0.7rem' }}>Agent Name</th>
                  {data.applicationBreakdown.map((app) => (
                    <th key={app.applicationName} style={{ padding: '8px 10px', fontSize: '0.7rem' }}>
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
                      <td style={{ padding: '8px 10px', fontWeight: '700', background: '#e6f2ff', color: '#2c5282', fontSize: '0.85rem' }}>{agent.agentName}</td>
                      {data.applicationBreakdown.map((app) => (
                        <td key={app.applicationName} style={{
                          padding: '8px 10px',
                          textAlign: 'left',
                          color: agent.apps.has(app.applicationName) ? '#2d3748' : '#cbd5e0',
                          fontSize: '0.85rem'
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
                  <td style={{ padding: '8px 10px', fontWeight: '700', fontSize: '0.85rem' }}>Total</td>
                  {data.applicationBreakdown.map((app) => (
                    <td key={app.applicationName} style={{
                      padding: '8px 10px',
                      textAlign: 'left',
                      fontWeight: '700',
                      fontSize: '0.85rem',
                      color: '#2d3748'
                    }}>
                      {app.totalActiveTime}
                    </td>
                  ))}
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

