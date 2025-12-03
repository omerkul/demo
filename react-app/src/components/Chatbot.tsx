import { useState } from 'react';
import { MessageCircle, X, Send, Sparkles, BarChart3 } from 'lucide-react';
import { ReportData } from '../types';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';

interface Props {
  data: ReportData;
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
  chartData?: {
    type: 'bar' | 'line' | 'pie';
    data: any[];
    title: string;
  };
}

export default function Chatbot({ data }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 0,
      text: "👋 Hi! I'm your AI Copilot. I can help you analyze this report with visualizations!\n\n🔍 Try asking:\n• Compare agent handling times (chart)\n• Show application usage breakdown (chart)\n• Visualize agent call volumes (chart)\n• What are the top performing agents?",
      isUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const exampleQuestions = [
    "Compare agent handling times (chart)",
    "Show application usage breakdown (chart)",
    "Visualize agent call volumes (chart)",
    "What are the best practices?"
  ];

  const generateResponse = (question: string): { text: string; chartData?: any } => {
    const lowerQuestion = question.toLowerCase();

    // Visualization: Agent handling times comparison
    if (lowerQuestion.includes('compare') && lowerQuestion.includes('handling') ||
        lowerQuestion.includes('handling time') && lowerQuestion.includes('chart')) {
      const chartData = data.agentPerformance.agentLeaderboard.map(agent => ({
        name: agent.agentName,
        handleTime: parseFloat(agent.averageIssueHandleTime.replace(/[^\d.]/g, '')) || 0,
        afterCallTime: parseFloat(agent.averageAfterCallWorkTime.replace(/[^\d.]/g, '')) || 0
      }));
      return {
        text: `Here's a comparison of handling times across all agents. The chart shows both average handle time and after-call work time for each agent.`,
        chartData: {
          type: 'bar',
          data: chartData,
          title: 'Agent Handling Time Comparison'
        }
      };
    }

    // Visualization: Application usage breakdown
    if ((lowerQuestion.includes('application') || lowerQuestion.includes('app')) &&
        (lowerQuestion.includes('chart') || lowerQuestion.includes('visualize') || lowerQuestion.includes('breakdown'))) {
      const chartData = data.applicationUsage.mostUsedApplications.map(app => ({
        name: app.applicationName,
        activeTime: parseFloat(app.totalActiveTime.replace(/[^\d.]/g, '')) || 0,
        usageCount: app.usageCount
      }));
      return {
        text: `Here's the application usage breakdown showing active time for each application.`,
        chartData: {
          type: 'pie',
          data: chartData,
          title: 'Application Usage Distribution'
        }
      };
    }

    // Visualization: Agent call volumes
    if ((lowerQuestion.includes('call') && lowerQuestion.includes('volume')) ||
        (lowerQuestion.includes('calls') && lowerQuestion.includes('chart'))) {
      const chartData = data.agentPerformance.agentLeaderboard.map(agent => ({
        name: agent.agentName,
        calls: agent.totalCalls
      }));
      return {
        text: `Here's the call volume distribution across all agents.`,
        chartData: {
          type: 'bar',
          data: chartData,
          title: 'Agent Call Volume Distribution'
        }
      };
    }

    // Visualization: Agent performance ratings
    if ((lowerQuestion.includes('rating') || lowerQuestion.includes('performance')) &&
        (lowerQuestion.includes('chart') || lowerQuestion.includes('visualize'))) {
      const ratingMap: any = { 'Excellent': 3, 'Good': 2, 'Average': 1 };
      const chartData = data.agentPerformance.mostProductiveAgents.map(agent => ({
        name: agent.agentName,
        rating: ratingMap[agent.metrics.qualitativeRating] || 0,
        ratingLabel: agent.metrics.qualitativeRating
      }));
      return {
        text: `Here's the performance rating visualization for top agents.`,
        chartData: {
          type: 'bar',
          data: chartData,
          title: 'Agent Performance Ratings'
        }
      };
    }

    // Top performing agents
    if (lowerQuestion.includes('top') || lowerQuestion.includes('best') || lowerQuestion.includes('productive')) {
      const topAgents = data.agentPerformance.mostProductiveAgents.slice(0, 2);
      return {
        text: `Based on the analysis, the top performing agents are:\n\n${topAgents.map((agent, idx) => 
          `${idx + 1}. **${agent.agentName}** - ${agent.metrics.qualitativeRating} rating\n   • Avg Handle Time: ${agent.metrics.averageIssueHandleTime}\n   • After-Call Work: ${agent.metrics.averageAfterCallWorkTime}\n   • ${agent.justification}`
        ).join('\n\n')}`
      };
    }

    // Anomalies/issues
    if (lowerQuestion.includes('anomal') || lowerQuestion.includes('issue') || lowerQuestion.includes('problem')) {
      const anomalies = data.synthesis.commonAnomalies;
      return {
        text: `I've identified ${anomalies.length} key anomalies:\n\n${anomalies.map((anomaly, idx) => 
          `${idx + 1}. **${anomaly.anomaly}**\n   Impact: ${anomaly.potentialImpact}`
        ).join('\n\n')}`
      };
    }

    // Best practices
    if (lowerQuestion.includes('practice') || lowerQuestion.includes('recommendation')) {
      const practices = data.synthesis.bestPractices;
      return {
        text: `Here are the best practices observed:\n\n${practices.map((practice, idx) => 
          `${idx + 1}. **${practice.practice}**\n   Recommendation: ${practice.recommendation}`
        ).join('\n\n')}`
      };
    }

    // Average handling time
    if (lowerQuestion.includes('average') && lowerQuestion.includes('handling')) {
      return {
        text: `The overall average handling time is **${data.aggregatedMetrics.averageHandlingTime.overallAverage}**.\n\nThis is calculated across ${data.reportMetadata.totalCallsAnalyzed} calls. The fastest agent handled calls in an average of ${data.agentPerformance.agentLeaderboard[0].averageIssueHandleTime}.`
      };
    }

    // Applications
    if (lowerQuestion.includes('application') || lowerQuestion.includes('app') || lowerQuestion.includes('tool')) {
      const topApps = data.applicationUsage.mostUsedApplications.slice(0, 3);
      return {
        text: `The most used applications are:\n\n${topApps.map((app, idx) => 
          `${idx + 1}. **${app.applicationName}**\n   • Total Active Time: ${app.totalActiveTime}\n   • Usage Count: ${app.usageCount}`
        ).join('\n\n')}`
      };
    }

    // Idle time
    if (lowerQuestion.includes('idle') || lowerQuestion.includes('wait')) {
      const hotspots = data.synthesis.idleTimeHotspots;
      if (hotspots.length > 0) {
        return {
          text: `Key idle time hotspot identified:\n\n**${hotspots[0].task}**\n• Average Idle Time: ${hotspots[0].averageIdleTime}\n• Possible Causes:\n${hotspots[0].possibleCauses.map(cause => `  - ${cause}`).join('\n')}`
        };
      }
    }

    // Strategic insights
    if (lowerQuestion.includes('insight') || lowerQuestion.includes('strategic') || lowerQuestion.includes('summary')) {
      const insights = data.synthesis.strategicInsights;
      return {
        text: `Here are the strategic insights:\n\n${insights.map((insight, idx) => 
          `${idx + 1}. ${insight.description}`
        ).join('\n\n')}`
      };
    }

    // Total calls
    if (lowerQuestion.includes('total') || lowerQuestion.includes('how many')) {
      return {
        text: `This report analyzes **${data.reportMetadata.totalCallsAnalyzed} calls** across ${data.agentPerformance.agentLeaderboard.length} agents.\n\nThe report was generated on ${new Date(data.reportMetadata.generationDate).toLocaleDateString()}.`
      };
    }

    // Default response
    return {
      text: `I can help you with questions about:\n\n• Agent performance and productivity\n• Common anomalies and issues\n• Best practices and recommendations\n• Application usage statistics\n• Handling times and metrics\n• Strategic insights\n\n💡 Add "(chart)" to any question to see a visualization!\n\nTry asking me something specific about the report!`
    };
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: messages.length,
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const response = generateResponse(inputValue);
      const aiResponse: Message = {
        id: messages.length + 1,
        text: response.text,
        isUser: false,
        timestamp: new Date(),
        chartData: response.chartData
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleExampleClick = (question: string) => {
    setInputValue(question);
    setTimeout(() => handleSendMessage(), 100);
  };

  return (
    <>
      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: 'fixed',
          top: '30px',
          right: '30px',
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          border: 'none',
          boxShadow: '0 4px 20px rgba(102, 126, 234, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transition: 'all 0.3s ease',
          zIndex: 9999
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'scale(1.1)';
          e.currentTarget.style.boxShadow = '0 6px 25px rgba(102, 126, 234, 0.6)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'scale(1)';
          e.currentTarget.style.boxShadow = '0 4px 20px rgba(102, 126, 234, 0.4)';
        }}
      >
        {isOpen ? <X size={28} color="white" /> : <MessageCircle size={28} color="white" />}
      </button>

      {/* Chatbot Panel */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: '100px',
            right: '30px',
            width: '400px',
            height: '600px',
            background: 'white',
            borderRadius: '16px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            zIndex: 9998,
            overflow: 'hidden'
          }}
        >
          {/* Header */}
          <div
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              padding: '20px',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}
          >
            <Sparkles size={24} />
            <div>
              <h3 style={{ margin: 0, fontSize: '1.2rem', fontWeight: '700' }}>AI Copilot</h3>
              <p style={{ margin: 0, fontSize: '0.85rem', opacity: 0.9 }}>Ask me about the report</p>
            </div>
          </div>

          {/* Example Questions */}
          {messages.length === 1 && (
            <div style={{ padding: '15px', background: '#f7fafc', borderBottom: '1px solid #e2e8f0' }}>
              <p style={{ fontSize: '0.85rem', color: '#4a5568', marginBottom: '10px', fontWeight: '600' }}>
                Quick questions:
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {exampleQuestions.map((question, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleExampleClick(question)}
                    style={{
                      padding: '8px 12px',
                      background: 'white',
                      border: '1px solid #e2e8f0',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontSize: '0.85rem',
                      color: '#667eea',
                      textAlign: 'left',
                      transition: 'all 0.2s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = '#667eea';
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'white';
                      e.currentTarget.style.color = '#667eea';
                    }}
                  >
                    {question}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Messages */}
          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}
          >
            {messages.map((message) => (
              <div
                key={message.id}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: message.isUser ? 'flex-end' : 'flex-start'
                }}
              >
                <div
                  style={{
                    maxWidth: message.chartData ? '95%' : '80%',
                    width: message.chartData ? '100%' : 'auto',
                    padding: '12px 16px',
                    borderRadius: message.isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px',
                    background: message.isUser
                      ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                      : '#f7fafc',
                    color: message.isUser ? 'white' : '#2d3748',
                    fontSize: '0.95rem',
                    lineHeight: '1.5',
                    whiteSpace: 'pre-wrap'
                  }}
                >
                  {message.text}

                  {/* Chart Visualization */}
                  {message.chartData && (
                    <div style={{
                      marginTop: '16px',
                      background: 'white',
                      borderRadius: '12px',
                      padding: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
                        <BarChart3 size={18} color="#667eea" />
                        <h4 style={{ margin: 0, fontSize: '0.95rem', fontWeight: '700', color: '#2c5282' }}>
                          {message.chartData.title}
                        </h4>
                      </div>

                      <ResponsiveContainer width="100%" height={200}>
                        {message.chartData.type === 'bar' && (
                          <BarChart data={message.chartData.data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <XAxis dataKey="name" stroke="#2c5282" fontSize={10} angle={-15} textAnchor="end" height={60} />
                            <YAxis stroke="#2c5282" fontSize={10} />
                            <Tooltip contentStyle={{ fontSize: '0.85rem' }} />
                            <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
                            {message.chartData.data[0]?.handleTime !== undefined && (
                              <>
                                <Bar dataKey="handleTime" fill="#667eea" radius={[4, 4, 0, 0]} name="Handle Time" />
                                <Bar dataKey="afterCallTime" fill="#f6ad55" radius={[4, 4, 0, 0]} name="After-Call Time" />
                              </>
                            )}
                            {message.chartData.data[0]?.calls !== undefined && (
                              <Bar dataKey="calls" fill="#38b2ac" radius={[4, 4, 0, 0]} name="Total Calls" />
                            )}
                            {message.chartData.data[0]?.rating !== undefined && (
                              <Bar dataKey="rating" fill="#ed8936" radius={[4, 4, 0, 0]} name="Rating Score" />
                            )}
                          </BarChart>
                        )}

                        {message.chartData.type === 'line' && (
                          <LineChart data={message.chartData.data} margin={{ top: 5, right: 10, left: -20, bottom: 5 }}>
                            <XAxis dataKey="name" stroke="#2c5282" fontSize={10} />
                            <YAxis stroke="#2c5282" fontSize={10} />
                            <Tooltip contentStyle={{ fontSize: '0.85rem' }} />
                            <Legend wrapperStyle={{ fontSize: '0.8rem' }} />
                            <Line type="monotone" dataKey="value" stroke="#667eea" strokeWidth={2} />
                          </LineChart>
                        )}

                        {message.chartData.type === 'pie' && (
                          <PieChart>
                            <Pie
                              data={message.chartData.data}
                              dataKey="activeTime"
                              nameKey="name"
                              cx="50%"
                              cy="50%"
                              outerRadius={70}
                              label={(entry) => entry.name}
                            >
                              {message.chartData.data.map((_: any, index: number) => (
                                <Cell key={`cell-${index}`} fill={['#667eea', '#f6ad55', '#38b2ac', '#ed8936', '#4299e1'][index % 5]} />
                              ))}
                            </Pie>
                            <Tooltip contentStyle={{ fontSize: '0.85rem' }} />
                          </PieChart>
                        )}
                      </ResponsiveContainer>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                <div
                  style={{
                    padding: '12px 16px',
                    borderRadius: '16px 16px 16px 4px',
                    background: '#f7fafc',
                    display: 'flex',
                    gap: '4px'
                  }}
                >
                  <span style={{ animation: 'pulse 1.4s infinite', animationDelay: '0s' }}>●</span>
                  <span style={{ animation: 'pulse 1.4s infinite', animationDelay: '0.2s' }}>●</span>
                  <span style={{ animation: 'pulse 1.4s infinite', animationDelay: '0.4s' }}>●</span>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div
            style={{
              padding: '16px',
              borderTop: '1px solid #e2e8f0',
              display: 'flex',
              gap: '8px'
            }}
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Ask a question..."
              style={{
                flex: 1,
                padding: '12px',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                fontSize: '0.95rem',
                outline: 'none'
              }}
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isTyping}
              style={{
                padding: '12px 16px',
                background: inputValue.trim() && !isTyping
                  ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
                  : '#cbd5e0',
                border: 'none',
                borderRadius: '8px',
                cursor: inputValue.trim() && !isTyping ? 'pointer' : 'not-allowed',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Send size={20} color="white" />
            </button>
          </div>
        </div>
      )}

      {/* Pulsing animation for typing indicator */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
      `}</style>
    </>
  );
}

