import { FileText } from 'lucide-react';
import { ReportMetadata as ReportMetadataType } from '../types';

interface Props {
  data: ReportMetadataType;
}

export default function ReportMetadata({ data }: Props) {
  return (
    <section className="section">
      <h2 className="section-title">
        <FileText size={32} />
        Report Metadata
      </h2>

      <div className="card">
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tbody>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{
                padding: '16px',
                fontWeight: '700',
                color: '#667eea',
                width: '200px',
                fontSize: '1rem'
              }}>
                Report ID
              </td>
              <td style={{
                padding: '16px',
                fontFamily: 'monospace',
                fontSize: '0.95rem',
                color: '#4a5568'
              }}>
                {data.reportId}
              </td>
            </tr>
            <tr style={{ borderBottom: '1px solid #e2e8f0' }}>
              <td style={{
                padding: '16px',
                fontWeight: '700',
                color: '#667eea',
                fontSize: '1rem'
              }}>
                Date
              </td>
              <td style={{
                padding: '16px',
                color: '#4a5568'
              }}>
                {new Date(data.generationDate).toLocaleString()}
              </td>
            </tr>
            <tr>
              <td style={{
                padding: '16px',
                fontWeight: '700',
                color: '#667eea',
                fontSize: '1rem'
              }}>
                Total Calls
              </td>
              <td style={{
                padding: '16px',
                fontSize: '1.1rem',
                fontWeight: '600',
                color: '#2d3748'
              }}>
                {data.totalCallsAnalyzed}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  );
}

