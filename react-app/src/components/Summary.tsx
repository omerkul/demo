import { FileVideo, Crop, Zap, MessageSquare } from 'lucide-react';

export default function Summary() {
  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{
        fontSize: '3rem',
        fontWeight: '900',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)',
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
        backgroundClip: 'text',
        marginBottom: '20px',
        textAlign: 'center'
      }}>
        Customer - Shift4 Payment
      </h1>

      {/* First Row - 5 smaller cubes side by side */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '12px', marginBottom: '12px' }}>

        {/* Video Extraction Card */}
        <div className="card" style={{
          padding: '15px',
          background: 'linear-gradient(135deg, #f0fff4 0%, #c6f6d5 100%)',
          border: '2px solid #48bb78'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
              borderRadius: '10px',
              padding: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <FileVideo size={24} stroke="white" />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#22543d', margin: 0 }}>
              Video Extraction from CXone to GCP
            </h2>
          </div>
          <p style={{ fontSize: '1.05rem', fontWeight: '700', color: '#2d3748', marginBottom: '5px', textAlign: 'center' }}>
            43 Videos Extracted
          </p>
          <p style={{ fontSize: '0.9rem', color: '#4a5568', lineHeight: '1.3', textAlign: 'center' }}>
            Each recording contains 1-4 screens
          </p>
        </div>

        {/* Pre-processing Card */}
        <div className="card" style={{
          padding: '15px',
          background: 'linear-gradient(135deg, #ebf8ff 0%, #bee3f8 100%)',
          border: '2px solid #4299e1'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #4299e1 0%, #3182ce 100%)',
              borderRadius: '10px',
              padding: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <Crop size={24} stroke="white" />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2c5282', margin: 0 }}>
              Pre-processing
            </h2>
          </div>
          <p style={{ fontSize: '1rem', fontWeight: '700', color: '#2d3748', marginBottom: '6px', textAlign: 'center' }}>
            Advanced Cropping Tool
          </p>
          <p style={{ fontSize: '0.9rem', color: '#4a5568', lineHeight: '1.3', textAlign: 'center' }}>
            Crops active screen to single screen version
          </p>
          <p style={{ fontSize: '0.85rem', color: '#2c5282', marginTop: '6px', fontWeight: '600', textAlign: 'center' }}>
            VLM optimized
          </p>
        </div>

        {/* VLM Model Execution Card */}
        <div className="card" style={{
          padding: '15px',
          background: 'linear-gradient(135deg, #fef5e7 0%, #fdebd0 100%)',
          border: '2px solid #f6ad55'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #f6ad55 0%, #ed8936 100%)',
              borderRadius: '10px',
              padding: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <Zap size={24} stroke="white" />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#7c2d12', margin: 0 }}>
              VLM Model Execution
            </h2>
          </div>
          <p style={{ fontSize: '0.95rem', color: '#4a5568', lineHeight: '1.3', textAlign: 'center' }}>
            First prompt layer execution of a single video on a VLM model
          </p>
          <p style={{ fontSize: '1rem', fontWeight: '700', color: '#7c2d12', marginTop: '8px', textAlign: 'center' }}>
            (Gemini 2.5 Pro)
          </p>
        </div>

        {/* Performance Card */}
        <div className="card" style={{
          padding: '15px',
          background: 'linear-gradient(135deg, #fffaf0 0%, #feebc8 100%)',
          border: '2px solid #ed8936'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #ed8936 0%, #dd6b20 100%)',
              borderRadius: '10px',
              padding: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <Zap size={24} stroke="white" />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#7c2d12', margin: 0 }}>
              Performance (VLM model execution)
            </h2>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <div style={{
              flex: 1,
              background: 'white',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
              border: '2px solid #ed8936'
            }}>
              <p style={{ fontSize: '0.8rem', color: '#7c2d12', fontWeight: '600' }}>
                5 min
              </p>
              <p style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ed8936' }}>
                ~30s
              </p>
            </div>
            <div style={{
              flex: 1,
              background: 'white',
              borderRadius: '8px',
              padding: '10px',
              textAlign: 'center',
              border: '2px solid #ed8936'
            }}>
              <p style={{ fontSize: '0.8rem', color: '#7c2d12', fontWeight: '600' }}>
                10+ min
              </p>
              <p style={{ fontSize: '1.3rem', fontWeight: '900', color: '#ed8936' }}>
                1-5m
              </p>
            </div>
          </div>
        </div>

        {/* LLM Model Execution Card */}
        <div className="card" style={{
          padding: '15px',
          background: 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)',
          border: '2px solid #667eea'
        }}>
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              borderRadius: '10px',
              padding: '10px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '8px'
            }}>
              <MessageSquare size={24} stroke="white" />
            </div>
            <h2 style={{ fontSize: '1.2rem', fontWeight: '800', color: '#2c5282', margin: 0 }}>
              LLM Model Execution
            </h2>
          </div>
          <p style={{ fontSize: '0.95rem', color: '#4a5568', lineHeight: '1.3', textAlign: 'center' }}>
            Second prompt layer execution of multiple first layer outputs consolidating data per demand.
          </p>
        </div>
      </div>

      {/* Second Row - Prompts spanning full width with ACD inside */}
      <div>
        {/* Prompts Card */}
        <div className="card" style={{
          padding: '20px',
          background: 'linear-gradient(135deg, #fff5f5 0%, #fed7d7 100%)',
          border: '2px solid #f093fb'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '15px' }}>
            <div style={{
              background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
              borderRadius: '10px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <MessageSquare size={28} stroke="white" />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '800', color: '#c53030', margin: 0 }}>
              Prompts - Analysis Types
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
            <div style={{
              padding: '18px',
              background: 'white',
              borderRadius: '10px',
              border: '3px solid #38b2ac',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '1.3rem', fontWeight: '700', color: '#234e52' }}>
                📞 ACD
              </p>
              <p style={{ fontSize: '0.95rem', color: '#4a5568', marginTop: '4px' }}>
                Talk Time, Handle Time, Active Time, After Call Work
              </p>
              <p style={{ fontSize: '1rem', color: '#38b2ac', marginTop: '8px', fontWeight: '600' }}>
                Accuracy: ~95%
              </p>
            </div>
            <div style={{
              padding: '18px',
              background: 'white',
              borderRadius: '10px',
              border: '3px solid #48bb78',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '1.3rem', fontWeight: '700', color: '#22543d' }}>
                📊 QMA
              </p>
              <p style={{ fontSize: '0.95rem', color: '#4a5568', marginTop: '4px' }}>
                Quality Management Analytics
              </p>
              <p style={{ fontSize: '1rem', color: '#48bb78', marginTop: '8px', fontWeight: '600' }}>
                Accuracy: ~90%
              </p>
            </div>
            <div style={{
              padding: '18px',
              background: 'white',
              borderRadius: '10px',
              border: '3px solid #4299e1',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '1.3rem', fontWeight: '700', color: '#2c5282' }}>
                🖥️ Desktop Discovery
              </p>
              <p style={{ fontSize: '0.95rem', color: '#4a5568', marginTop: '4px' }}>
                Application & Screen Analysis
              </p>
              <p style={{ fontSize: '1rem', color: '#4299e1', marginTop: '8px', fontWeight: '600' }}>
                Accuracy: ~92%
              </p>
            </div>
            <div style={{
              padding: '18px',
              background: 'white',
              borderRadius: '10px',
              border: '3px solid #f6ad55',
              textAlign: 'center'
            }}>
              <p style={{ fontSize: '1.3rem', fontWeight: '700', color: '#7c2d12' }}>
                🔄 Process Analytics
              </p>
              <p style={{ fontSize: '0.95rem', color: '#4a5568', marginTop: '4px' }}>
                Workflow & Efficiency Analysis
              </p>
              <p style={{ fontSize: '1rem', color: '#f6ad55', marginTop: '8px', fontWeight: '600' }}>
                Accuracy: ~84%
              </p>
            </div>
          </div>
        </div>

        {/* Next Steps Card under Prompts - Analysis Types */}
        <div style={{ marginTop: '18px' }}>
          <div className="card" style={{
            padding: '22px',
            background: 'linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)',
            border: '2px solid #667eea',
            borderRadius: '12px',
            boxShadow: '0 4px 16px rgba(102,126,234,0.08)'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px', marginBottom: '12px' }}>
              <div style={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '10px',
                padding: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                <MessageSquare size={26} stroke="white" />
              </div>
              <h2 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#2c5282', margin: 0 }}>
                Next steps
              </h2>
            </div>
            <ul style={{ fontSize: '1.1rem', color: '#2d3748', marginLeft: '0', paddingLeft: '18px', lineHeight: '1.7', fontWeight: '500' }}>
              <li>Cross prompt execution improvements</li>
              <li>Performance improvements</li>
              <li>Prompt optimizations</li>
              <li>Discussions with Google for solution improvements and execution</li>
              <li>Additional research for VLM module (Nova light, TwelveLabs)</li>
              <li>Process discovery - executing video and audio</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
