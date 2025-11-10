import { Target, AlertTriangle, CheckCircle, PauseCircle, Lightbulb } from 'lucide-react';
import { Synthesis as SynthesisType, ReportData } from '../types';

interface Props {
  data: SynthesisType;
  fullData: ReportData;
}

export default function Synthesis({ data, fullData }: Props) {
  // Create a mapping from agent IDs to agent names
  const agentIdToName: { [key: string]: string } = {};

  // Collect agent names from aggregatedMetrics
  fullData.aggregatedMetrics.averageHandlingTime.calls.forEach(call => {
    agentIdToName[call.agentId] = call.agentName;
  });

  // Helper function to convert agent IDs to names
  const getAgentNames = (agentIds: string[]): string => {
    return agentIds
      .map(id => agentIdToName[id] || id)
      .join(', ');
  };
  return (
    <section className="section">
      <h2 className="section-title">
        <Target size={24} />
        Desktop Ai Insights
      </h2>

      {/* All four subsections in ONE line */}
      <div style={{ display: 'flex', gap: '10px' }}>
        {/* BEST PRACTICES */}
        <div style={{
          flex: '1',
          background: 'linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%)',
          padding: '12px',
          borderRadius: '10px',
          border: '2px solid #48bb78',
          boxShadow: '0 2px 8px rgba(72, 187, 120, 0.15)'
        }}>
          <h3 style={{
            color: '#22543d',
            marginBottom: '8px',
            fontSize: '1rem',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <CheckCircle size={18} />
            Best Practices
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.bestPractices.map((practice, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '6px',
                padding: '8px',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
                border: '1px solid #c6f6d5'
              }}>
                <p style={{
                  padding: '6px',
                  background: 'linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)',
                  borderRadius: '5px',
                  fontWeight: '600',
                  color: '#22543d',
                  marginBottom: '6px',
                  lineHeight: '1.3',
                  fontSize: '0.8rem'
                }}>
                  {practice.practice}
                </p>
                <div style={{ fontSize: '0.75rem', marginBottom: '4px', lineHeight: '1.3' }}>
                  <strong style={{ color: '#2d3748' }}>👥</strong> {getAgentNames(practice.agentsExhibiting)}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#2d3748', lineHeight: '1.3' }}>
                  <strong style={{ color: '#22543d' }}>💡</strong> {practice.recommendation}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STRATEGIC INSIGHTS */}
        <div style={{
          flex: '1',
          background: 'linear-gradient(135deg, #ebf8ff 0%, #e6fffa 100%)',
          padding: '12px',
          borderRadius: '10px',
          border: '2px solid #4299e1',
          boxShadow: '0 2px 8px rgba(66, 153, 225, 0.15)'
        }}>
          <h3 style={{
            color: '#2c5282',
            marginBottom: '8px',
            fontSize: '1rem',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <Lightbulb size={18} />
            Strategic Insights
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.strategicInsights.map((insight) => (
              <div key={insight.insightId} style={{
                background: 'white',
                borderRadius: '6px',
                padding: '8px',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
                border: '1px solid #bee3f8'
              }}>
                <h4 style={{
                  color: '#2c5282',
                  fontSize: '0.85rem',
                  marginBottom: '6px',
                  fontWeight: '700'
                }}>
                  {insight.insightId}
                </h4>
                <p style={{
                  padding: '6px',
                  background: 'linear-gradient(135deg, #bee3f8 0%, #90cdf4 100%)',
                  borderRadius: '5px',
                  lineHeight: '1.3',
                  color: '#2c5282',
                  fontWeight: '600',
                  fontSize: '0.8rem'
                }}>
                  {insight.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* IDLE TIME HOTSPOTS */}
        <div style={{
          flex: '1',
          background: 'linear-gradient(135deg, #fffaf0 0%, #feebc8 100%)',
          padding: '12px',
          borderRadius: '10px',
          border: '2px solid #ed8936',
          boxShadow: '0 2px 8px rgba(237, 137, 54, 0.15)'
        }}>
          <h3 style={{
            color: '#7c2d12',
            marginBottom: '8px',
            fontSize: '1rem',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <PauseCircle size={18} />
            Idle Time Hotspots
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.idleTimeHotspots.map((hotspot, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '6px',
                padding: '8px',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
                border: '1px solid #fbd38d'
              }}>
                <h4 style={{
                  color: '#7c2d12',
                  fontSize: '0.85rem',
                  marginBottom: '6px',
                  fontWeight: '700'
                }}>
                  {hotspot.task}
                </h4>
                <div style={{
                  background: 'linear-gradient(135deg, #feebc8 0%, #fbd38d 100%)',
                  padding: '6px',
                  borderRadius: '5px',
                  marginBottom: '6px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.7rem', color: '#7c2d12', fontWeight: '600' }}>
                    Avg Idle Time
                  </div>
                  <div style={{
                    fontSize: '1.2rem',
                    fontWeight: '900',
                    color: '#ed8936'
                  }}>
                    {hotspot.averageIdleTime}
                  </div>
                </div>
                <div style={{ fontSize: '0.75rem', color: '#7c2d12', fontWeight: '600', marginBottom: '4px' }}>
                  🔍 Causes:
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {hotspot.possibleCauses.map((cause, idx) => (
                    <li key={idx} style={{
                      marginBottom: '3px',
                      fontSize: '0.75rem',
                      paddingLeft: '12px',
                      position: 'relative',
                      color: '#2d3748',
                      lineHeight: '1.3'
                    }}>
                      <span style={{
                        position: 'absolute',
                        left: 0,
                        color: '#ed8936',
                        fontWeight: 'bold'
                      }}>•</span>
                      {cause}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* COMMON ANOMALIES */}
        <div style={{
          flex: '1',
          background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)',
          padding: '12px',
          borderRadius: '10px',
          border: '2px solid #f56565',
          boxShadow: '0 2px 8px rgba(245, 101, 101, 0.15)'
        }}>
          <h3 style={{
            color: '#c53030',
            marginBottom: '8px',
            fontSize: '1rem',
            fontWeight: '800',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}>
            <AlertTriangle size={18} />
            Common Anomalies
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.commonAnomalies.map((anomaly, index) => (
              <div key={index} style={{
                background: 'white',
                borderRadius: '6px',
                padding: '8px',
                boxShadow: '0 1px 4px rgba(0, 0, 0, 0.08)',
                border: '1px solid #feb2b2'
              }}>
                <p style={{
                  padding: '6px',
                  background: 'linear-gradient(135deg, #feb2b2 0%, #fc8181 100%)',
                  borderRadius: '5px',
                  fontWeight: '600',
                  color: '#742a2a',
                  marginBottom: '6px',
                  lineHeight: '1.3',
                  fontSize: '0.8rem'
                }}>
                  {anomaly.anomaly}
                </p>
                <div style={{ fontSize: '0.75rem', marginBottom: '4px', lineHeight: '1.3' }}>
                  <strong style={{ color: '#2d3748' }}>👥</strong> {getAgentNames(anomaly.agentsAffected)}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#2d3748', lineHeight: '1.3' }}>
                  <strong style={{ color: '#c53030' }}>💥</strong> {anomaly.potentialImpact}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

