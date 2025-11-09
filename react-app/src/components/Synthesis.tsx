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
        <Target size={32} />
        Synthesis & Strategic Insights
      </h2>

      {/* BEST PRACTICES - Now shown first with improved design */}
      <div style={{
        background: 'linear-gradient(135deg, #f0fff4 0%, #e6fffa 100%)',
        padding: '30px',
        borderRadius: '16px',
        marginBottom: '40px',
        border: '2px solid #48bb78',
        boxShadow: '0 4px 20px rgba(72, 187, 120, 0.15)'
      }}>
        <h3 style={{
          color: '#22543d',
          marginBottom: '24px',
          fontSize: '2rem',
          fontWeight: '800',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          <CheckCircle size={28} />
          Best Practices
        </h3>
        <div className="card-grid">
          {data.bestPractices.map((practice, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #c6f6d5',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              cursor: 'default'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                  borderRadius: '10px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <CheckCircle size={24} stroke="white" strokeWidth={2.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    color: '#1a202c',
                    marginBottom: '14px',
                    fontWeight: '700'
                  }}>
                    Practice #{index + 1}
                  </h4>
                  <p style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #c6f6d5 0%, #9ae6b4 100%)',
                    borderRadius: '10px',
                    fontWeight: '600',
                    color: '#22543d',
                    marginBottom: '16px',
                    lineHeight: '1.6',
                    fontSize: '1.05rem'
                  }}>
                    {practice.practice}
                  </p>
                  <div style={{
                    padding: '14px',
                    background: '#f7fafc',
                    borderRadius: '8px',
                    marginBottom: '14px',
                    borderLeft: '3px solid #48bb78'
                  }}>
                    <strong style={{ color: '#2d3748', fontSize: '0.95rem' }}>👥 Agents Exhibiting:</strong>
                    <div style={{
                      fontSize: '0.95rem',
                      color: '#4a5568',
                      marginTop: '6px',
                      fontWeight: '500'
                    }}>
                      {getAgentNames(practice.agentsExhibiting)}
                    </div>
                  </div>
                  <div style={{
                    padding: '14px',
                    background: '#f0fff4',
                    borderRadius: '8px',
                    borderLeft: '3px solid #38a169'
                  }}>
                    <strong style={{ color: '#22543d', fontSize: '0.95rem' }}>💡 Recommendation:</strong>
                    <div style={{
                      marginTop: '6px',
                      color: '#2d3748',
                      lineHeight: '1.6',
                      fontSize: '0.95rem'
                    }}>
                      {practice.recommendation}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* STRATEGIC INSIGHTS */}
      <div style={{
        background: 'linear-gradient(135deg, #ebf8ff 0%, #e6fffa 100%)',
        padding: '30px',
        borderRadius: '16px',
        marginBottom: '40px',
        border: '2px solid #4299e1',
        boxShadow: '0 4px 20px rgba(66, 153, 225, 0.15)'
      }}>
        <h3 style={{
          color: '#2c5282',
          marginBottom: '24px',
          fontSize: '2rem',
          fontWeight: '800',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          <Lightbulb size={28} />
          Strategic Insights
        </h3>
        <div className="card-grid">
          {data.strategicInsights.map((insight) => (
            <div key={insight.insightId} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #bee3f8',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
                  borderRadius: '10px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <Lightbulb size={24} stroke="white" strokeWidth={2.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    color: '#2c5282',
                    fontSize: '1.1rem',
                    marginBottom: '14px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px'
                  }}>
                    {insight.insightId}
                  </h4>
                  <p style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #bee3f8 0%, #90cdf4 100%)',
                    borderRadius: '10px',
                    lineHeight: '1.7',
                    color: '#2c5282',
                    fontWeight: '600',
                    fontSize: '1.05rem'
                  }}>
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* IDLE TIME HOTSPOTS */}
      <div style={{
        background: 'linear-gradient(135deg, #fffaf0 0%, #feebc8 100%)',
        padding: '30px',
        borderRadius: '16px',
        marginBottom: '40px',
        border: '2px solid #ed8936',
        boxShadow: '0 4px 20px rgba(237, 137, 54, 0.15)'
      }}>
        <h3 style={{
          color: '#7c2d12',
          marginBottom: '24px',
          fontSize: '2rem',
          fontWeight: '800',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          <PauseCircle size={28} />
          Idle Time Hotspots
        </h3>
        {data.idleTimeHotspots.map((hotspot, index) => (
          <div key={index} style={{
            background: 'white',
            borderRadius: '12px',
            padding: '24px',
            boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
            border: '1px solid #fbd38d',
            marginBottom: index < data.idleTimeHotspots.length - 1 ? '20px' : '0'
          }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
                borderRadius: '10px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '40px',
                height: '40px'
              }}>
                <PauseCircle size={24} stroke="white" strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{
                  color: '#7c2d12',
                  fontSize: '1.3rem',
                  marginBottom: '16px',
                  fontWeight: '700'
                }}>
                  {hotspot.task}
                </h4>
                <div style={{
                  background: 'linear-gradient(135deg, #feebc8 0%, #fbd38d 100%)',
                  padding: '20px',
                  borderRadius: '10px',
                  marginBottom: '16px',
                  textAlign: 'center'
                }}>
                  <div style={{ fontSize: '0.9rem', color: '#7c2d12', fontWeight: '600', marginBottom: '8px' }}>
                    Average Idle Time
                  </div>
                  <div style={{
                    fontSize: '2.8rem',
                    fontWeight: '900',
                    color: '#ed8936',
                    textShadow: '0 2px 4px rgba(0,0,0,0.1)'
                  }}>
                    {hotspot.averageIdleTime}
                  </div>
                </div>
                <div style={{
                  background: '#fffaf0',
                  padding: '16px',
                  borderRadius: '10px',
                  borderLeft: '4px solid #ed8936'
                }}>
                  <strong style={{ fontSize: '1.05rem', color: '#7c2d12', display: 'block', marginBottom: '12px' }}>
                    🔍 Possible Causes:
                  </strong>
                  <ul style={{
                    listStyle: 'none',
                    padding: 0,
                    margin: 0
                  }}>
                    {hotspot.possibleCauses.map((cause, idx) => (
                      <li key={idx} style={{
                        marginBottom: '10px',
                        fontSize: '1rem',
                        paddingLeft: '24px',
                        position: 'relative',
                        color: '#2d3748',
                        lineHeight: '1.6'
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
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* COMMON ANOMALIES */}
      <div style={{
        background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)',
        padding: '30px',
        borderRadius: '16px',
        border: '2px solid #f56565',
        boxShadow: '0 4px 20px rgba(245, 101, 101, 0.15)'
      }}>
        <h3 style={{
          color: '#c53030',
          marginBottom: '24px',
          fontSize: '2rem',
          fontWeight: '800',
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          <AlertTriangle size={28} />
          Common Anomalies
        </h3>
        <div className="card-grid">
          {data.commonAnomalies.map((anomaly, index) => (
            <div key={index} style={{
              background: 'white',
              borderRadius: '12px',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0, 0, 0, 0.08)',
              border: '1px solid #feb2b2'
            }}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                <div style={{
                  background: 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)',
                  borderRadius: '10px',
                  padding: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minWidth: '40px',
                  height: '40px'
                }}>
                  <AlertTriangle size={24} stroke="white" strokeWidth={2.5} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{
                    fontSize: '1.1rem',
                    color: '#1a202c',
                    marginBottom: '14px',
                    fontWeight: '700'
                  }}>
                    Issue #{index + 1}
                  </h4>
                  <p style={{
                    padding: '16px',
                    background: 'linear-gradient(135deg, #feb2b2 0%, #fc8181 100%)',
                    borderRadius: '10px',
                    fontWeight: '600',
                    color: '#742a2a',
                    marginBottom: '16px',
                    lineHeight: '1.6',
                    fontSize: '1.05rem'
                  }}>
                    {anomaly.anomaly}
                  </p>
                  <div style={{
                    padding: '14px',
                    background: '#f7fafc',
                    borderRadius: '8px',
                    marginBottom: '14px',
                    borderLeft: '3px solid #f56565'
                  }}>
                    <strong style={{ color: '#2d3748', fontSize: '0.95rem' }}>👥 Agents Affected:</strong>
                    <div style={{
                      fontSize: '0.95rem',
                      color: '#4a5568',
                      marginTop: '6px',
                      fontWeight: '500'
                    }}>
                      {getAgentNames(anomaly.agentsAffected)}
                    </div>
                  </div>
                  <div style={{
                    padding: '14px',
                    background: '#fff5f5',
                    borderRadius: '8px',
                    borderLeft: '3px solid #e53e3e'
                  }}>
                    <strong style={{ color: '#c53030', fontSize: '0.95rem' }}>💥 Potential Impact:</strong>
                    <div style={{
                      marginTop: '6px',
                      color: '#2d3748',
                      lineHeight: '1.6',
                      fontSize: '0.95rem'
                    }}>
                      {anomaly.potentialImpact}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

