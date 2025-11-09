const { useState, useEffect, useRef } = React;

// Chart Component Wrapper
const ChartComponent = ({ type, data, options, height = 300 }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current && typeof Chart !== 'undefined') {
            const ctx = chartRef.current.getContext('2d');

            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            chartInstance.current = new Chart(ctx, {
                type: type,
                data: data,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: 'bottom',
                            labels: {
                                font: { size: 12, family: "'Segoe UI', sans-serif" },
                                padding: 15,
                                usePointStyle: true
                            }
                        },
                        tooltip: {
                            backgroundColor: 'rgba(0, 0, 0, 0.8)',
                            padding: 12,
                            titleFont: { size: 14, weight: 'bold' },
                            bodyFont: { size: 13 },
                            cornerRadius: 8
                        }
                    },
                    ...options
                }
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [type, data, options]);

    return (
        <div className="chart-container" style={{ height: height }}>
            <canvas ref={chartRef}></canvas>
        </div>
    );
};

// Report Metadata Component with Animation
const ReportMetadata = ({ metadata }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const target = metadata.totalCallsAnalyzed;
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                setCount(target);
                clearInterval(timer);
            } else {
                setCount(Math.floor(current));
            }
        }, 16);

        return () => clearInterval(timer);
    }, [metadata.totalCallsAnalyzed]);

    return (
        <div className="section">
            <h2>📊 Report Metadata</h2>
            <div className="grid-container">
                <div className="card">
                    <h3>🆔 Report ID</h3>
                    <p style={{ fontSize: '0.9rem', wordBreak: 'break-all', fontFamily: 'monospace' }}>{metadata.reportId}</p>
                </div>
                <div className="card">
                    <h3>📅 Generation Date</h3>
                    <p style={{ fontSize: '1.1rem', fontWeight: '600', color: '#667eea' }}>
                        {new Date(metadata.generationDate).toLocaleString()}
                    </p>
                </div>
                <div className="card stats-card">
                    <h3 style={{ color: 'white', fontSize: '1.2rem', marginBottom: '10px' }}>📞 Total Calls Analyzed</h3>
                    <p style={{ fontSize: '4rem', fontWeight: '800', margin: '20px 0', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                        {count}
                    </p>
                </div>
            </div>
        </div>
    );
};

// Aggregated Metrics Component with Charts
const AggregatedMetrics = ({ metrics }) => {
    const chartData = metrics.averageHandlingTime.calls ? {
        labels: metrics.averageHandlingTime.calls.map(c => c.agentName),
        datasets: [{
            label: 'Issue Handle Time (minutes)',
            data: metrics.averageHandlingTime.calls.map(c => {
                const time = c.issueHandleTime.split(':');
                return parseInt(time[0]) * 60 + parseInt(time[1]);
            }),
            backgroundColor: [
                'rgba(102, 126, 234, 0.8)',
                'rgba(118, 75, 162, 0.8)',
                'rgba(240, 147, 251, 0.8)',
                'rgba(67, 97, 238, 0.8)',
                'rgba(162, 89, 255, 0.8)',
                'rgba(76, 201, 240, 0.8)'
            ],
            borderColor: [
                'rgb(102, 126, 234)',
                'rgb(118, 75, 162)',
                'rgb(240, 147, 251)',
                'rgb(67, 97, 238)',
                'rgb(162, 89, 255)',
                'rgb(76, 201, 240)'
            ],
            borderWidth: 2,
            borderRadius: 8
        }]
    } : null;

    const afterCallChartData = metrics.averageAfterCallWork.calls ? {
        labels: metrics.averageAfterCallWork.calls.map(c => c.agentName),
        datasets: [{
            label: 'After-Call Work (minutes)',
            data: metrics.averageAfterCallWork.calls.map(c => {
                const time = c.afterCallWorkTime.split(':');
                return parseInt(time[0]) * 60 + parseInt(time[1]);
            }),
            backgroundColor: 'rgba(245, 87, 108, 0.6)',
            borderColor: 'rgb(245, 87, 108)',
            borderWidth: 2,
            fill: true,
            tension: 0.4
        }]
    } : null;

    return (
        <div className="section">
            <h2>📈 Aggregated Metrics</h2>

            {metrics.averageHandlingTime && (
                <>
                    <div className="card stats-card" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
                        <h3 style={{ color: 'white', fontSize: '1.3rem' }}>⏱️ Overall Average Handling Time</h3>
                        <p style={{ fontSize: '4rem', fontWeight: '800', margin: '20px 0', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                            {metrics.averageHandlingTime.overallAverage}
                        </p>
                    </div>

                    {chartData && typeof Chart !== 'undefined' && (
                        <>
                            <h3 style={{ marginTop: '40px' }}>📊 Handling Time Visualization</h3>
                            <ChartComponent
                                type="bar"
                                data={chartData}
                                height={350}
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            title: {
                                                display: true,
                                                text: 'Minutes',
                                                font: { size: 14, weight: 'bold' }
                                            }
                                        }
                                    }
                                }}
                            />
                        </>
                    )}

                    {metrics.averageHandlingTime.calls && (
                        <>
                            <h3 style={{ marginTop: '30px' }}>📋 Average Handling Time per Call</h3>
                            <table>
                                <thead>
                                    <tr>
                                        <th>🎫 Call ID</th>
                                        <th>👤 Agent Name</th>
                                        <th>⏰ Issue Handle Time</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {metrics.averageHandlingTime.calls.map(call => (
                                        <tr key={call.callId}>
                                            <td style={{ fontWeight: '600', color: '#667eea' }}>{call.callId}</td>
                                            <td>{call.agentName}</td>
                                            <td style={{ fontWeight: '600' }}>{call.issueHandleTime}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </>
                    )}
                </>
            )}

            {metrics.averageAfterCallWork && (
                <>
                    <div className="card stats-card" style={{ background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', marginTop: '40px' }}>
                        <h3 style={{ color: 'white', fontSize: '1.3rem' }}>📝 Overall Average After-Call Work Time</h3>
                        <p style={{ fontSize: '4rem', fontWeight: '800', margin: '20px 0', textShadow: '0 4px 20px rgba(0,0,0,0.3)' }}>
                            {metrics.averageAfterCallWork.overallAverage}
                        </p>
                    </div>

                    {afterCallChartData && typeof Chart !== 'undefined' && (
                        <>
                            <h3 style={{ marginTop: '40px' }}>📊 After-Call Work Visualization</h3>
                            <ChartComponent
                                type="line"
                                data={afterCallChartData}
                                height={300}
                                options={{
                                    scales: {
                                        y: {
                                            beginAtZero: true,
                                            title: {
                                                display: true,
                                                text: 'Minutes',
                                                font: { size: 14, weight: 'bold' }
                                            }
                                        }
                                    }
                                }}
                            />
                        </>
                    )}
                </>
            )}
        </div>
    );
};

// Agent Performance Component
const AgentPerformance = ({ performance }) => {
    const getRatingColor = (rating) => {
        if (rating === 'Excellent') return '#48bb78';
        if (rating === 'Good') return '#4299e1';
        return '#ed8936';
    };

    const getRatingEmoji = (rating) => {
        if (rating === 'Excellent') return '⭐';
        if (rating === 'Good') return '👍';
        return '📊';
    };

    const agentDistributionData = performance.agentLeaderboard ? {
        labels: performance.agentLeaderboard.map(a => a.agentName),
        datasets: [{
            label: 'Total Calls',
            data: performance.agentLeaderboard.map(a => a.totalCalls),
            backgroundColor: [
                'rgba(102, 126, 234, 0.8)',
                'rgba(118, 75, 162, 0.8)',
                'rgba(240, 147, 251, 0.8)',
                'rgba(76, 201, 240, 0.8)',
                'rgba(245, 87, 108, 0.8)',
                'rgba(72, 187, 120, 0.8)'
            ],
            borderWidth: 3,
            borderColor: '#fff'
        }]
    } : null;

    return (
        <div className="section">
            <h2>🏆 Agent Performance</h2>

            {performance.mostProductiveAgents && performance.mostProductiveAgents.length > 0 && (
                <>
                    <h3>🌟 Most Productive Agents</h3>
                    <div className="grid-container">
                        {performance.mostProductiveAgents.map(agent => (
                            <div className="card" key={agent.agentId} style={{ borderTop: `5px solid ${getRatingColor(agent.metrics.qualitativeRating)}` }}>
                                <h4>
                                    {getRatingEmoji(agent.metrics.qualitativeRating)} {agent.agentName}
                                </h4>
                                <div style={{
                                    display: 'inline-block',
                                    padding: '8px 16px',
                                    borderRadius: '20px',
                                    background: getRatingColor(agent.metrics.qualitativeRating),
                                    color: 'white',
                                    fontWeight: '700',
                                    fontSize: '0.875rem',
                                    marginBottom: '16px',
                                    boxShadow: `0 4px 12px ${getRatingColor(agent.metrics.qualitativeRating)}50`
                                }}>
                                    {agent.metrics.qualitativeRating}
                                </div>
                                <p><strong>⏱️ Avg Issue Handle Time:</strong> <span style={{ color: '#667eea', fontWeight: '700' }}>{agent.metrics.averageIssueHandleTime}</span></p>
                                <p><strong>📝 Avg After-Call Work:</strong> <span style={{ color: '#667eea', fontWeight: '700' }}>{agent.metrics.averageAfterCallWorkTime}</span></p>
                                <p style={{ marginTop: '16px', padding: '14px', background: 'rgba(102, 126, 234, 0.1)', borderRadius: '12px', borderLeft: '4px solid #667eea' }}>
                                    <strong>💡 Justification:</strong><br/>{agent.justification}
                                </p>
                            </div>
                        ))}
                    </div>
                </>
            )}

            {agentDistributionData && typeof Chart !== 'undefined' && (
                <>
                    <h3 style={{ marginTop: '40px' }}>📊 Call Distribution by Agent</h3>
                    <ChartComponent
                        type="doughnut"
                        data={agentDistributionData}
                        height={400}
                    />
                </>
            )}

            {performance.agentLeaderboard && performance.agentLeaderboard.length > 0 && (
                <>
                    <h3 style={{ marginTop: '40px' }}>📊 Agent Leaderboard</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>🏅 Rank</th>
                                <th>👤 Agent Name</th>
                                <th>📞 Total Calls</th>
                                <th>⏱️ Avg Issue Handle Time</th>
                                <th>📝 Avg After-Call Work</th>
                            </tr>
                        </thead>
                        <tbody>
                            {performance.agentLeaderboard.map((agent, index) => (
                                <tr key={agent.agentId}>
                                    <td style={{
                                        fontWeight: 'bold',
                                        fontSize: '1.3rem',
                                        color: index === 0 ? '#f6ad55' : index === 1 ? '#cbd5e0' : index === 2 ? '#d69e2e' : '#667eea'
                                    }}>
                                        {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                                    </td>
                                    <td style={{ fontWeight: '700' }}>{agent.agentName}</td>
                                    <td style={{ textAlign: 'center', fontWeight: '700', fontSize: '1.1rem' }}>{agent.totalCalls}</td>
                                    <td style={{ fontWeight: '700', color: '#667eea' }}>{agent.averageIssueHandleTime}</td>
                                    <td style={{ fontWeight: '700', color: '#f5576c' }}>{agent.averageAfterCallWorkTime}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

// Application Usage Component
const ApplicationUsage = ({ usage }) => {
    const appChartData = usage.mostUsedApplications ? {
        labels: usage.mostUsedApplications.map(app => app.applicationName),
        datasets: [{
            label: 'Usage Count',
            data: usage.mostUsedApplications.map(app => app.usageCount),
            backgroundColor: [
                'rgba(255, 99, 132, 0.7)',
                'rgba(54, 162, 235, 0.7)',
                'rgba(255, 206, 86, 0.7)',
                'rgba(75, 192, 192, 0.7)'
            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(54, 162, 235)',
                'rgb(255, 206, 86)',
                'rgb(75, 192, 192)'
            ],
            borderWidth: 2
        }]
    } : null;

    return (
        <div className="section">
            <h2>💻 Application Usage</h2>

            {usage.mostUsedApplications && usage.mostUsedApplications.length > 0 && (
                <>
                    <h3>🔥 Most Used Applications</h3>
                    <div className="grid-container">
                        {usage.mostUsedApplications.map((app, index) => (
                            <div className="card" key={index} style={{
                                background: index === 0 ? 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)' :
                                           index === 1 ? 'linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)' :
                                           'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)'
                            }}>
                                <h4 style={{ fontSize: '1.4rem' }}>
                                    {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📱'} {app.applicationName}
                                </h4>
                                <p><strong>⏰ Total Active Time:</strong> <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#2d3748' }}>{app.totalActiveTime}</span></p>
                                <p><strong>🔢 Usage Count:</strong> <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#2d3748' }}>{app.usageCount}</span></p>
                            </div>
                        ))}
                    </div>

                    {appChartData && typeof Chart !== 'undefined' && (
                        <>
                            <h3 style={{ marginTop: '40px' }}>📊 Application Usage Distribution</h3>
                            <ChartComponent
                                type="polarArea"
                                data={appChartData}
                                height={400}
                            />
                        </>
                    )}
                </>
            )}

            {usage.applicationBreakdown && usage.applicationBreakdown.length > 0 && (
                <>
                    <h3 style={{ marginTop: '40px' }}>📊 Application Breakdown by Agent</h3>
                    <table>
                        <thead>
                            <tr>
                                <th>Agent Name</th>
                                {usage.applicationBreakdown.map((app) => (
                                    <th key={app.applicationName}>
                                        {app.applicationName}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {(() => {
                                // Build a map of agents and their usage per application
                                const agentMap = new Map();

                                usage.applicationBreakdown.forEach((app) => {
                                    app.usageByAgent.forEach((agent) => {
                                        if (!agentMap.has(agent.agentId)) {
                                            agentMap.set(agent.agentId, {
                                                agentName: agent.agentName,
                                                apps: new Map()
                                            });
                                        }
                                        agentMap.get(agent.agentId).apps.set(app.applicationName, agent.activeTime);
                                    });
                                });

                                return Array.from(agentMap.values()).map((agent) => (
                                    <tr key={agent.agentName}>
                                        <td style={{ fontWeight: '700', background: '#e6f2ff', color: '#2c5282' }}>{agent.agentName}</td>
                                        {usage.applicationBreakdown.map((app) => (
                                            <td key={app.applicationName} style={{
                                                textAlign: 'left',
                                                color: agent.apps.has(app.applicationName) ? '#2d3748' : '#cbd5e0'
                                            }}>
                                                {agent.apps.get(app.applicationName) || '-'}
                                            </td>
                                        ))}
                                    </tr>
                                ));
                            })()}
                            <tr style={{
                                borderTop: '2px solid #4a5568',
                                background: '#f7fafc',
                                fontWeight: '700'
                            }}>
                                <td style={{ fontWeight: '700', fontSize: '1.05rem' }}>Total</td>
                                {usage.applicationBreakdown.map((app) => (
                                    <td key={app.applicationName} style={{
                                        textAlign: 'left',
                                        fontWeight: '700',
                                        fontSize: '1.05rem',
                                        color: '#2d3748'
                                    }}>
                                        {app.totalActiveTime}
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </>
            )}
        </div>
    );
};

// Business Process Analysis Component
const BusinessProcessAnalysis = ({ analysis }) => {
    const getEfficiencyColor = (efficiency) => {
        if (efficiency === 'Most Efficient') return '#48bb78';
        if (efficiency === 'Least Efficient') return '#f56565';
        return '#4299e1';
    };

    const getEfficiencyEmoji = (efficiency) => {
        if (efficiency === 'Most Efficient') return '🚀';
        if (efficiency === 'Least Efficient') return '🐌';
        return '⚡';
    };

    return (
        <div className="section">
            <h2>🔄 Business Process Analysis</h2>

            {analysis.recurringRoutines && analysis.recurringRoutines.length > 0 && (
                <>
                    <h3>🔁 Recurring Routines</h3>
                    {analysis.recurringRoutines.map((routine, index) => (
                        <div className="card" key={index} style={{ marginBottom: '30px' }}>
                            <h4 style={{ color: '#667eea', fontSize: '1.5rem' }}>📌 {routine.routineLabel}</h4>
                            <p style={{
                                padding: '16px',
                                background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
                                borderRadius: '12px',
                                borderLeft: '5px solid #667eea',
                                fontStyle: 'italic',
                                fontSize: '1.05rem'
                            }}>
                                {routine.patternSummary}
                            </p>
                            <div style={{ display: 'flex', gap: '30px', margin: '20px 0', flexWrap: 'wrap' }}>
                                <div style={{
                                    padding: '16px 24px',
                                    background: 'linear-gradient(135deg, #667eea 20%, #764ba2 100%)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                                }}>
                                    <strong style={{ fontSize: '0.9rem' }}>🔢 Total Occurrences</strong>
                                    <p style={{ fontSize: '2rem', fontWeight: '800', margin: '8px 0 0 0' }}>{routine.totalOccurrences}</p>
                                </div>
                                <div style={{
                                    padding: '16px 24px',
                                    background: 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)',
                                    borderRadius: '12px',
                                    color: 'white',
                                    boxShadow: '0 8px 20px rgba(72, 187, 120, 0.3)'
                                }}>
                                    <strong style={{ fontSize: '0.9rem' }}>🏆 Most Efficient Agent</strong>
                                    <p style={{ fontSize: '1.3rem', fontWeight: '700', margin: '8px 0 0 0' }}>{routine.mostEfficientAgent.agentName}</p>
                                </div>
                            </div>
                            <h5 style={{ marginTop: '30px' }}>👥 Agent Performance Comparison:</h5>
                            <table>
                                <thead>
                                    <tr>
                                        <th>👤 Agent Name</th>
                                        <th>📊 Efficiency</th>
                                        <th>⏰ Handle Time</th>
                                        <th>💡 Justification</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {routine.agents.map((agent, idx) => (
                                        <tr key={idx}>
                                            <td style={{ fontWeight: '700' }}>{agent.agentName}</td>
                                            <td>
                                                <span style={{
                                                    padding: '6px 14px',
                                                    borderRadius: '20px',
                                                    background: getEfficiencyColor(agent.efficiency),
                                                    color: 'white',
                                                    fontWeight: '700',
                                                    fontSize: '0.875rem',
                                                    whiteSpace: 'nowrap',
                                                    boxShadow: `0 4px 12px ${getEfficiencyColor(agent.efficiency)}40`
                                                }}>
                                                    {getEfficiencyEmoji(agent.efficiency)} {agent.efficiency}
                                                </span>
                                            </td>
                                            <td style={{ fontWeight: '700', color: '#667eea', fontSize: '1.05rem' }}>{agent.handleTime}</td>
                                            <td style={{ fontSize: '0.95rem' }}>{agent.justification}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    ))}
                </>
            )}
        </div>
    );
};

// Synthesis Component
const Synthesis = ({ synthesis }) => (
    <div className="section">
        <h2>🎯 Synthesis & Strategic Insights</h2>

        {synthesis.bestPractices && synthesis.bestPractices.length > 0 && (
            <>
                <h3 style={{ color: '#48bb78', marginTop: '20px' }}>✅ Best Practices</h3>
                <div className="grid-container">
                    {synthesis.bestPractices.map((practice, index) => (
                        <div className="card" key={index} style={{
                            borderLeft: '6px solid #48bb78',
                            background: 'linear-gradient(135deg, #f0fff4 0%, #ffffff 100%)',
                            boxShadow: '0 2px 8px rgba(72, 187, 120, 0.15)'
                        }}>
                            <h4 style={{ color: '#22543d', fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                ✨ {practice.practice}
                            </h4>
                            <div style={{
                                padding: '12px 16px',
                                background: 'rgba(154, 230, 180, 0.15)',
                                borderRadius: '8px',
                                marginBottom: '12px'
                            }}>
                                <strong style={{ color: '#22543d', fontSize: '0.9rem' }}>🌟 Agents Exhibiting:</strong>
                                <div style={{ marginTop: '6px', fontSize: '0.95rem', color: '#2f855a' }}>
                                    {practice.agentsExhibiting.join(', ')}
                                </div>
                            </div>
                            <div style={{
                                padding: '12px 16px',
                                background: 'rgba(154, 230, 180, 0.25)',
                                borderRadius: '8px',
                                borderLeft: '4px solid #48bb78'
                            }}>
                                <strong style={{ color: '#22543d', fontSize: '0.9rem' }}>💡 Recommendation:</strong>
                                <div style={{ marginTop: '6px', fontSize: '0.95rem', color: '#2f855a', lineHeight: '1.6' }}>
                                    {practice.recommendation}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}

        {synthesis.strategicInsights && synthesis.strategicInsights.length > 0 && (
            <>
                <h3 style={{ color: '#4299e1', marginTop: '50px' }}>💎 Strategic Insights</h3>
                <div className="grid-container">
                    {synthesis.strategicInsights.map((insight, index) => (
                        <div className="card" key={index} style={{
                            borderLeft: '6px solid #4299e1',
                            background: 'linear-gradient(135deg, #ebf8ff 0%, #ffffff 100%)',
                            boxShadow: '0 2px 8px rgba(66, 153, 225, 0.15)'
                        }}>
                            <h4 style={{ color: '#2c5282', fontSize: '1.1rem', marginBottom: '12px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                🎯 {insight.insightId}
                            </h4>
                            <p style={{
                                padding: '14px',
                                background: 'rgba(190, 227, 248, 0.3)',
                                borderRadius: '8px',
                                lineHeight: '1.7',
                                color: '#2c5282',
                                fontSize: '0.98rem',
                                borderLeft: '4px solid #4299e1'
                            }}>
                                {insight.description}
                            </p>
                        </div>
                    ))}
                </div>
            </>
        )}

        {synthesis.commonAnomalies && synthesis.commonAnomalies.length > 0 && (
            <>
                <h3 style={{ color: '#f56565', marginTop: '50px' }}>⚠️ Common Anomalies</h3>
                <div className="grid-container">
                    {synthesis.commonAnomalies.map((anomaly, index) => (
                        <div className="card" key={index} style={{
                            borderLeft: '6px solid #f56565',
                            background: 'linear-gradient(135deg, #fff5f5 0%, #ffffff 100%)',
                            boxShadow: '0 2px 8px rgba(245, 101, 101, 0.15)'
                        }}>
                            <h4 style={{ color: '#c53030', fontSize: '1.25rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                                🚨 {anomaly.anomaly}
                            </h4>
                            <div style={{
                                padding: '12px 16px',
                                background: 'rgba(254, 178, 178, 0.15)',
                                borderRadius: '8px',
                                marginBottom: '12px'
                            }}>
                                <strong style={{ color: '#c53030', fontSize: '0.9rem' }}>👥 Agents Affected:</strong>
                                <div style={{ marginTop: '6px', fontSize: '0.95rem', color: '#9b2c2c' }}>
                                    {anomaly.agentsAffected.join(', ')}
                                </div>
                            </div>
                            <div style={{
                                padding: '12px 16px',
                                background: 'rgba(254, 178, 178, 0.25)',
                                borderRadius: '8px',
                                borderLeft: '4px solid #f56565'
                            }}>
                                <strong style={{ color: '#c53030', fontSize: '0.9rem' }}>💥 Potential Impact:</strong>
                                <div style={{ marginTop: '6px', fontSize: '0.95rem', color: '#9b2c2c', lineHeight: '1.6' }}>
                                    {anomaly.potentialImpact}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}

        {synthesis.idleTimeHotspots && synthesis.idleTimeHotspots.length > 0 && (
            <>
                <h3 style={{ color: '#ed8936', marginTop: '50px' }}>⏸️ Idle Time Hotspots</h3>
                <div className="grid-container">
                    {synthesis.idleTimeHotspots.map((hotspot, index) => (
                        <div className="card" key={index} style={{
                            borderLeft: '6px solid #ed8936',
                            background: 'linear-gradient(135deg, #fffaf0 0%, #ffffff 100%)',
                            boxShadow: '0 2px 8px rgba(237, 137, 54, 0.15)'
                        }}>
                            <h4 style={{ color: '#7c2d12', fontSize: '1.25rem', marginBottom: '16px' }}>
                                ⏰ {hotspot.task}
                            </h4>
                            <div style={{
                                padding: '16px',
                                background: 'rgba(255, 237, 213, 0.5)',
                                borderRadius: '8px',
                                marginBottom: '16px',
                                textAlign: 'center'
                            }}>
                                <strong style={{ fontSize: '0.9rem', color: '#7c2d12' }}>📊 Average Idle Time</strong>
                                <div style={{ fontSize: '2rem', fontWeight: '800', color: '#ed8936', marginTop: '8px' }}>
                                    {hotspot.averageIdleTime}
                                </div>
                            </div>
                            <div style={{
                                padding: '12px 16px',
                                background: 'rgba(255, 237, 213, 0.3)',
                                borderRadius: '8px',
                                borderLeft: '4px solid #ed8936'
                            }}>
                                <strong style={{ fontSize: '0.9rem', color: '#7c2d12', marginBottom: '10px', display: 'block' }}>
                                    🔍 Possible Causes:
                                </strong>
                                <ul style={{ margin: '0', paddingLeft: '20px', listStyle: 'disc' }}>
                                    {hotspot.possibleCauses.map((cause, idx) => (
                                        <li key={idx} style={{
                                            marginBottom: '8px',
                                            fontSize: '0.95rem',
                                            color: '#9c4221',
                                            lineHeight: '1.6'
                                        }}>
                                            {cause}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )}
    </div>
);

// Main App Component
const App = () => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('input.json')
            .then(response => response.json())
            .then(jsonData => {
                console.log('Loaded data:', jsonData);
                setData(jsonData);
                setLoading(false);
            })
            .catch(err => {
                console.error('Error loading or parsing data:', err);
                setError('Error loading report data. Please check the console for details.');
                setLoading(false);
            });
    }, []);

    if (loading) {
        return (
            <div id="app">
                <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <div style={{
                        fontSize: '4rem',
                        marginBottom: '20px',
                        animation: 'pulse 1.5s ease-in-out infinite'
                    }}>
                        📊
                    </div>
                    <p style={{ fontSize: '1.5rem', fontWeight: '600', color: '#667eea' }}>Loading your amazing report...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div id="app">
                <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <div style={{ fontSize: '4rem', marginBottom: '20px' }}>⚠️</div>
                    <p style={{ fontSize: '1.2rem', color: '#f56565' }}>{error}</p>
                </div>
            </div>
        );
    }

    return (
        <div id="app">
            <h1>🚀 Process Discovery Report</h1>

            {data.reportMetadata && <ReportMetadata metadata={data.reportMetadata} />}

            {data.aggregatedMetrics && <AggregatedMetrics metrics={data.aggregatedMetrics} />}

            {data.agentPerformance && <AgentPerformance performance={data.agentPerformance} />}

            {data.applicationUsage && <ApplicationUsage usage={data.applicationUsage} />}

            {data.businessProcessAnalysis && <BusinessProcessAnalysis analysis={data.businessProcessAnalysis} />}

            {data.synthesis && <Synthesis synthesis={data.synthesis} />}
        </div>
    );
};

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);

