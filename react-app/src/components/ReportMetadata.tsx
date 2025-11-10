import { FileText, Clock, Phone } from 'lucide-react';
import { ReportMetadata as ReportMetadataType, AggregatedMetrics } from '../types';

interface Props {
  metadata: ReportMetadataType;
  metrics: AggregatedMetrics;
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

export default function ReportMetadata({ metadata, metrics }: Props) {
  return (
    <section className="section">
      <h2 className="section-title">
        <FileText size={24} />
        Report Overview
      </h2>

      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        {/* Left Side - Metric Cards (Stacked Vertically) */}
        <div style={{ flex: '0 0 30%', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {/* Total Calls Card */}
          <div className="card" style={{ background: getGradientForIndex(2), padding: '12px' }}>
            <h3 style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontWeight: '700' }}>
              <Phone size={16} />
              Total Calls
            </h3>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: '900',
              color: '#2d3748',
              margin: 0
            }}>
              {metadata.totalCallsAnalyzed}
            </p>
          </div>

          {/* Average Handling Time Card */}
          <div className="card" style={{ background: getGradientForIndex(3), padding: '12px' }}>
            <h3 style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontWeight: '700' }}>
              <Clock size={16} />
              Avg Handle Time
            </h3>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: '900',
              color: '#2d3748',
              margin: 0
            }}>
              {metrics.averageHandlingTime.overallAverage}
            </p>
          </div>

          {/* Average After-Call Work Card */}
          <div className="card" style={{ background: getGradientForIndex(0), padding: '12px' }}>
            <h3 style={{ fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px', fontWeight: '700' }}>
              <Clock size={16} />
              Avg After-Call
            </h3>
            <p style={{
              fontSize: '1.5rem',
              fontWeight: '900',
              color: '#2d3748',
              margin: 0
            }}>
              {metrics.averageAfterCallWork.overallAverage}
            </p>
          </div>
        </div>

        {/* Right Side - Call Metrics Details Table */}
        <div style={{ flex: '1' }}>
          <h3 style={{ marginBottom: '8px', fontSize: '1rem', fontWeight: '700' }}>
            Call Metrics Details
          </h3>
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th style={{ padding: '8px 10px', fontSize: '0.7rem' }}>Call ID</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.7rem' }}>Agent Name</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.7rem' }}>Agent Role</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.7rem' }}>Handle Time</th>
                  <th style={{ padding: '8px 10px', fontSize: '0.7rem' }}>After-Call Time</th>
                </tr>
              </thead>
              <tbody>
                {metrics.averageHandlingTime.calls.map((call, index) => {
                  const afterCallWorkCall = metrics.averageAfterCallWork.calls[index];
                  return (
                    <tr key={call.callId}>
                      <td style={{ padding: '8px 10px', fontWeight: '600', color: '#667eea', fontSize: '0.85rem' }}>{call.callId}</td>
                      <td style={{ padding: '8px 10px', fontSize: '0.85rem' }}>{call.agentName}</td>
                      <td style={{ padding: '8px 10px', fontSize: '0.85rem' }}>{call.agentRole}</td>
                      <td style={{ padding: '8px 10px', fontWeight: '600', fontSize: '0.85rem' }}>{call.issueHandleTime}</td>
                      <td style={{ padding: '8px 10px', fontWeight: '600', fontSize: '0.85rem' }}>{afterCallWorkCall?.afterCallWorkTime || '-'}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}

