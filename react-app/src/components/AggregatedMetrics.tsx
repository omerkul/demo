import { BarChart3, Clock } from 'lucide-react';
import { AggregatedMetrics as AggregatedMetricsType } from '../types';

interface Props {
  data: AggregatedMetricsType;
}

export default function AggregatedMetrics({ data }: Props) {
  return (
    <section className="section">
      <h2 className="section-title">
        <BarChart3 size={32} />
        Aggregated Metrics
      </h2>

      <div className="card stats-card" style={{ marginBottom: '30px' }}>
        <h3 className="card-title">
          <Clock size={24} />
          Overall Average Handling Time
        </h3>
        <div className="stats-value">{data.averageHandlingTime.overallAverage}</div>
      </div>

      <h3 style={{ marginTop: '30px', marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700' }}>
        Average Handling Time per Call
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
            {data.averageHandlingTime.calls.map((call) => (
              <tr key={call.callId}>
                <td style={{ fontWeight: '600', color: '#667eea' }}>{call.callId}</td>
                <td>{call.agentName}</td>
                <td style={{ fontWeight: '600' }}>{call.issueHandleTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="card stats-card" style={{ marginTop: '40px', marginBottom: '30px', background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)' }}>
        <h3 className="card-title">
          <Clock size={24} />
          Overall Average After-Call Work Time
        </h3>
        <div className="stats-value">{data.averageAfterCallWork.overallAverage}</div>
      </div>

      <h3 style={{ marginTop: '30px', marginBottom: '20px', fontSize: '1.75rem', fontWeight: '700' }}>
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
            {data.averageAfterCallWork.calls.map((call) => (
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

