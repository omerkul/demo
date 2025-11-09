import { FileText, Calendar, Phone } from 'lucide-react';
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

      <div className="card-grid">
        <div className="card">
          <h3 className="card-title">
            <FileText size={20} />
            Report ID
          </h3>
          <p className="card-content" style={{ fontFamily: 'monospace', fontSize: '0.9rem' }}>
            {data.reportId}
          </p>
        </div>

        <div className="card">
          <h3 className="card-title">
            <Calendar size={20} />
            Generation Date
          </h3>
          <p className="card-content" style={{ fontSize: '1.1rem', fontWeight: '600', color: '#667eea' }}>
            {new Date(data.generationDate).toLocaleString()}
          </p>
        </div>

        <div className="card stats-card">
          <h3 className="card-title">
            <Phone size={24} />
            Total Calls Analyzed
          </h3>
          <div className="stats-value">{data.totalCallsAnalyzed}</div>
        </div>
      </div>
    </section>
  );
}

