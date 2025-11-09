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
        <FileText size={32} />
        Report Overview
      </h2>

      <div className="card-grid">
        {/* Total Calls Card */}
        <div className="card" style={{ background: getGradientForIndex(2) }}>
          <h3 className="card-title" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Phone size={24} />
            Total Calls Analyzed
          </h3>
          <p style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#2d3748',
            marginTop: '10px'
          }}>
            {metadata.totalCallsAnalyzed}
          </p>
        </div>

        {/* Average Handling Time Card */}
        <div className="card" style={{ background: getGradientForIndex(3) }}>
          <h3 className="card-title" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={24} />
            Avg Handling Time
          </h3>
          <p style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#2d3748',
            marginTop: '10px'
          }}>
            {metrics.averageHandlingTime.overallAverage}
          </p>
        </div>

        {/* Average After-Call Work Card */}
        <div className="card" style={{ background: getGradientForIndex(0) }}>
          <h3 className="card-title" style={{ fontSize: '1.4rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Clock size={24} />
            Avg After-Call Work
          </h3>
          <p style={{
            fontSize: '2.5rem',
            fontWeight: '900',
            color: '#2d3748',
            marginTop: '10px'
          }}>
            {metrics.averageAfterCallWork.overallAverage}
          </p>
        </div>
      </div>

      {/* Detailed Tables */}
      <h3 style={{ marginTop: '40px', marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700' }}>
        Handling Time per Call
      </h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Call ID</th>
              <th>Agent Name</th>
              <th>Issue Handle Time</th>
            </tr>
          </thead>
          <tbody>
            {metrics.averageHandlingTime.calls.map((call) => (
              <tr key={call.callId}>
                <td style={{ fontWeight: '600', color: '#667eea' }}>{call.callId}</td>
                <td>{call.agentName}</td>
                <td style={{ fontWeight: '600' }}>{call.issueHandleTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3 style={{ marginTop: '40px', marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700' }}>
        After-Call Work Time per Call
      </h3>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Call ID</th>
              <th>Agent Name</th>
              <th>After-Call Work Time</th>
            </tr>
          </thead>
          <tbody>
            {metrics.averageAfterCallWork.calls.map((call) => (
              <tr key={call.callId}>
                <td style={{ fontWeight: '600', color: '#667eea' }}>{call.callId}</td>
                <td>{call.agentName}</td>
                <td style={{ fontWeight: '600' }}>{call.afterCallWorkTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

