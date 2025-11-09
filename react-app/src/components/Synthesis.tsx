import { Target, AlertTriangle, CheckCircle, PauseCircle, Lightbulb } from 'lucide-react';
import { Synthesis as SynthesisType } from '../types';

interface Props {
  data: SynthesisType;
}

export default function Synthesis({ data }: Props) {
  return (
    <section className="section">
      <h2 className="section-title">
        <Target size={32} />
        Synthesis & Strategic Insights
      </h2>

      <h3 style={{ color: '#f56565', marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <AlertTriangle size={24} />
        Common Anomalies
      </h3>
      <div className="card-grid">
        {data.commonAnomalies.map((anomaly, index) => (
          <div key={index} className="alert alert-danger">
            <AlertTriangle size={24} stroke="#f56565" />
            <div>
              <h4 style={{ fontSize: '1.3rem', color: '#c53030', marginBottom: '12px' }}>
                🚨 Issue #{index + 1}
              </h4>
              <p style={{
                padding: '14px',
                background: 'linear-gradient(135deg, #feb2b2 0%, #fc8181 100%)',
                borderRadius: '12px',
                fontWeight: '600',
                color: '#742a2a',
                marginBottom: '12px'
              }}>
                {anomaly.anomaly}
              </p>
              <p style={{ marginBottom: '12px' }}>
                <strong>👥 Agents Affected:</strong><br />
                <span style={{ fontSize: '0.95rem', color: '#4a5568' }}>{anomaly.agentsAffected.join(', ')}</span>
              </p>
              <p style={{
                padding: '12px',
                background: 'rgba(254, 178, 178, 0.2)',
                borderRadius: '8px',
                borderLeft: '4px solid #f56565'
              }}>
                <strong>💥 Potential Impact:</strong><br />
                {anomaly.potentialImpact}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ color: '#48bb78', marginTop: '50px', marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <CheckCircle size={24} />
        Best Practices
      </h3>
      <div className="card-grid">
        {data.bestPractices.map((practice, index) => (
          <div key={index} className="alert alert-success">
            <CheckCircle size={24} stroke="#48bb78" />
            <div>
              <h4 style={{ fontSize: '1.3rem', color: '#22543d', marginBottom: '12px' }}>
                ✨ Practice #{index + 1}
              </h4>
              <p style={{
                padding: '14px',
                background: 'linear-gradient(135deg, #9ae6b4 0%, #68d391 100%)',
                borderRadius: '12px',
                fontWeight: '600',
                color: '#22543d',
                marginBottom: '12px'
              }}>
                {practice.practice}
              </p>
              <p style={{ marginBottom: '12px' }}>
                <strong>🌟 Agents Exhibiting:</strong><br />
                <span style={{ fontSize: '0.95rem', color: '#4a5568' }}>{practice.agentsExhibiting.join(', ')}</span>
              </p>
              <p style={{
                padding: '12px',
                background: 'rgba(154, 230, 180, 0.2)',
                borderRadius: '8px',
                borderLeft: '4px solid #48bb78'
              }}>
                <strong>💡 Recommendation:</strong><br />
                {practice.recommendation}
              </p>
            </div>
          </div>
        ))}
      </div>

      <h3 style={{ color: '#ed8936', marginTop: '50px', marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <PauseCircle size={24} />
        Idle Time Hotspots
      </h3>
      {data.idleTimeHotspots.map((hotspot, index) => (
        <div key={index} className="alert alert-warning">
          <PauseCircle size={24} stroke="#ed8936" />
          <div style={{ width: '100%' }}>
            <h4 style={{ color: '#7c2d12', fontSize: '1.4rem', marginBottom: '12px' }}>
              ⏰ {hotspot.task}
            </h4>
            <p style={{ marginBottom: '16px' }}>
              <strong>📊 Average Idle Time:</strong>{' '}
              <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#ed8936' }}>
                {hotspot.averageIdleTime}
              </span>
            </p>
            <p style={{ marginBottom: '12px', fontSize: '1.1rem' }}>
              <strong>🔍 Possible Causes:</strong>
            </p>
            <ul style={{
              background: 'rgba(255, 250, 240, 0.7)',
              padding: '20px 20px 20px 44px',
              borderRadius: '12px',
              borderLeft: '4px solid #ed8936',
              marginTop: '12px'
            }}>
              {hotspot.possibleCauses.map((cause, idx) => (
                <li key={idx} style={{ marginBottom: '12px', fontSize: '1.05rem' }}>{cause}</li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      <h3 style={{ color: '#4299e1', marginTop: '50px', marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <Lightbulb size={24} />
        Strategic Insights
      </h3>
      <div className="card-grid">
        {data.strategicInsights.map((insight) => (
          <div key={insight.insightId} className="alert alert-info">
            <Lightbulb size={24} stroke="#4299e1" />
            <div>
              <h4 style={{ color: '#2c5282', fontSize: '1.3rem', marginBottom: '12px' }}>
                🎯 {insight.insightId.toUpperCase()}
              </h4>
              <p style={{
                padding: '16px',
                background: 'linear-gradient(135deg, #bee3f8 0%, #90cdf4 100%)',
                borderRadius: '12px',
                lineHeight: '1.8',
                color: '#2c5282',
                fontWeight: '600',
                fontSize: '1.05rem'
              }}>
                {insight.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

