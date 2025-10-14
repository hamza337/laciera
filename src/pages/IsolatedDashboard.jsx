import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './IsolatedDashboard.module.css';
import DashboardSidebar from '../components/DashboardSidebar';
import DashboardTopbar from '../components/DashboardTopbar';

// Real SVG line chart that matches the reference (legend + axes)
const EnergyFlowChart = ({ data }) => {
  const width = 760;
  const height = 300;
  const pad = 36;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;
  const maxY = 100;

  const xStep = innerW / (data.labels.length - 1);
  const yScale = (v) => innerH - (v / maxY) * innerH;

  const toPath = (values) => {
    return values.map((v, i) => {
      const x = pad + i * xStep;
      const y = pad + yScale(v);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
  };

  const gridLines = [0, 25, 50, 75, 100];

  return (
    <div className={styles.ldChartWrap}>
      <svg className={styles.ldChartSvg} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg">
        {/* Grid background */}
        {gridLines.map((g) => {
          const y = pad + yScale(g);
          return <line key={`gy-${g}`} x1={pad} y1={y} x2={width - pad} y2={y} stroke="#E7EAEC" strokeWidth="1" />;
        })}

        {/* Y-axis labels */}
        {gridLines.map((g) => {
          const y = pad + yScale(g);
          return (
            <text key={`gl-${g}`} x={pad - 20} y={y + 4} className={styles.ldAxisLabel}>{g}</text>
          );
        })}

        {/* X-axis labels */}
        {data.labels.map((label, i) => (
          <text key={`xl-${label}`} x={pad + i * xStep} y={height - pad + 20} className={styles.ldAxisLabel}>{label}</text>
        ))}

        {/* Series lines */}
        {data.series.map((s) => (
          <path key={s.name} d={toPath(s.values)} stroke={s.color} strokeWidth="2.5" fill="none" strokeLinecap="round" />
        ))}
      </svg>

      <div className={styles.ldLegendRow}>
        {data.series.map((s) => (
          <div key={`legend-${s.name}`} className={styles.ldLegendItem}>
            <span className={styles.ldLegendDot} style={{ background: s.color }}></span>
            {s.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const MetricCard = ({ title, value, sub, sparkColor = '#009382', showTrendArrow = false }) => (
  <div className={styles.ldMetricCard}>
    <div className={styles.ldMetricHeader}>
      <div className={styles.ldMetricTitleRow}>
        <div className={styles.ldMetricTitle}>{title}</div>
        {showTrendArrow && (
          <span className={styles.ldTrendArrow} aria-hidden="true">↗</span>
        )}
      </div>
      <div className={styles.ldSparkWrap}>
        <svg width="160" height="40" viewBox="0 0 160 40" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M2 28L14 18l12 10 12-14 12 10 12-16 12 16 12-12 12 8 12-6" stroke={sparkColor} strokeWidth="2" strokeLinecap="round" fill="none"/>
        </svg>
      </div>
    </div>
    <div className={styles.ldMetricValue}>{value}</div>
    <div className={styles.ldMetricSub}>{sub}</div>
  </div>
);

const DeviceCard = ({ title, status, power, accent, efficiency = 95, icon = null }) => (
  <div className={styles.ldDeviceCard} style={{ borderTopColor: accent }}>
    <div className={styles.ldDeviceRow}>
      <div className={styles.ldDeviceTitleRow}>
        {icon && <span className={styles.ldDeviceIcon}>{icon}</span>}
        <div className={styles.ldDeviceTitle}>{title}</div>
      </div>
      <span className={styles.ldBadge}>Active</span>
    </div>
    <div className={styles.ldDeviceRow}>
      <span className={styles.ldDeviceStatus}>{status}</span>
      <span className={styles.ldDevicePower}>Power: {power}</span>
    </div>
    <div className={styles.ldDeviceRow}>
      <span className={styles.ldDeviceStatus}>Efficiency</span>
      <span className={styles.ldDevicePower}>{efficiency}%</span>
    </div>
    <div className={styles.ldProgressWrap}>
      <div className={styles.ldProgressFill} style={{ width: `${efficiency}%`, background: accent }}></div>
    </div>
  </div>
);

// Segmented SVG gauge to match the reference
const Gauge = () => {
  const width = 360;
  const height = 240;
  const cx = width / 2;
  const cy = height * 0.95;
  const r = 96;
  const segments = 24;
  const startAngle = -180;
  const endAngle = 0;
  const step = (endAngle - startAngle) / segments;
  const colors = [
    '#4AAB3D','#4AAB3D','#4AAB3D','#62B93E','#7BC53F','#94D141','#ADEE43',
    '#F7AE1B','#F7AE1B','#FFC04D','#FF9A4D','#FF8C42',
    '#FF7A36','#FF6B2B','#FF5C23','#FF4D1B','#FF4D4F','#FF4D4F','#FF3C3C','#FF3030','#FF2626','#FF1C1C','#FF1212','#FF0A0A'
  ];
  const polar = (angleDeg) => {
    // Map angles directly: -180 (left) -> -90 (top) -> 0 (right)
    const a = angleDeg * Math.PI / 180.0;
    return { x: cx + r * Math.cos(a), y: cy + r * Math.sin(a) };
  };
  const arcs = new Array(segments).fill(0).map((_, i) => {
    const a1 = startAngle + i * step;
    const a2 = a1 + step * 0.92;
    const p1 = polar(a1);
    const p2 = polar(a2);
    const d = `M ${p1.x} ${p1.y} A ${r} ${r} 0 0 1 ${p2.x} ${p2.y}`;
    return { d, color: colors[i % colors.length] };
  });
  return (
    <svg className={styles.ldGaugeSvg} viewBox={`0 0 ${width} ${height}`} xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false" role="presentation">
      {arcs.map((arc, idx) => (
        <path key={idx} d={arc.d} stroke={arc.color} strokeWidth="16" fill="none" strokeLinecap="round" />
      ))}
    </svg>
  );
};

const IsolatedDashboard = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const tab = params.get('tab');
  const pageMap = {
    planner: 'Auto Planner',
    devices: 'Devices',
    building: 'Building Information',
    reports: 'Reports',
    settings: 'Settings',
  };
  const pageLabel = pageMap[tab] || 'Dashboard';
  const [period, setPeriod] = useState('week');
  const chartData = useMemo(() => {
    if (period === 'today') {
      const labels = ['12 AM','3 AM','6 AM','9 AM','12 PM','3 PM','6 PM','9 PM'];
      return {
        labels,
        series: [
          { name: 'Generation', color: '#4AAB3D', values: [15, 22, 30, 45, 38, 28, 20, 16] },
          { name: 'Consumption', color: '#4F8AD7', values: [12, 18, 25, 40, 35, 26, 18, 14] },
          { name: 'Export', color: '#F7AE1B', values: [5, 10, 12, 20, 16, 10, 8, 6] },
          { name: 'Import', color: '#FF4D4F', values: [8, 12, 14, 18, 20, 12, 10, 9] },
        ],
      };
    }
    if (period === 'month') {
      const labels = ['W1','W2','W3','W4'];
      return {
        labels,
        series: [
          { name: 'Generation', color: '#4AAB3D', values: [70, 80, 90, 85] },
          { name: 'Consumption', color: '#4F8AD7', values: [60, 70, 78, 72] },
          { name: 'Export', color: '#F7AE1B', values: [30, 40, 48, 42] },
          { name: 'Import', color: '#FF4D4F', values: [25, 26, 28, 30] },
        ],
      };
    }
    if (period === 'year') {
      const labels = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      return {
        labels,
        series: [
          { name: 'Generation', color: '#4AAB3D', values: [60,62,65,70,75,80,85,83,78,70,65,60] },
          { name: 'Consumption', color: '#4F8AD7', values: [50,52,55,58,62,68,72,70,66,60,55,52] },
          { name: 'Export', color: '#F7AE1B', values: [20,22,25,28,32,36,40,38,34,28,24,22] },
          { name: 'Import', color: '#FF4D4F', values: [18,20,22,24,26,28,30,29,27,24,22,20] },
        ],
      };
    }
    const labels = ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'];
    return {
      labels,
      series: [
        { name: 'Generation', color: '#4AAB3D', values: [35, 48, 60, 100, 72, 20, 45] },
        { name: 'Consumption', color: '#4F8AD7', values: [28, 40, 55, 80, 60, 18, 36] },
        { name: 'Export', color: '#F7AE1B', values: [12, 22, 35, 56, 42, 8, 20] },
        { name: 'Import', color: '#FF4D4F', values: [18, 26, 30, 28, 34, 12, 24] },
      ],
    };
  }, [period]);

  // Measure top section height (header + metrics + energy flow) so sidebar can end when Device Status Overview starts
  const topRef = useRef(null);
  const [topHeight, setTopHeight] = useState(0);
  useEffect(() => {
    const update = () => {
      if (topRef.current) {
        setTopHeight(topRef.current.offsetHeight);
      }
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [period]);

  return (
    <div className={styles.ldShell} style={{ '--ld-top-section-height': `${topHeight}px` }}>
      <DashboardSidebar />
      <main className={styles.ldMain}>
        <DashboardTopbar />

        <section className={styles.ldContent}>
          <div ref={topRef}>
            <div className={styles.ldHeaderRow}>
              <div>
                <h2 className={styles.ldPageTitle}>{pageLabel}</h2>
                <p className={styles.ldPageSub}>Monitor & Optimize your energy consumption</p>
              </div>
            </div>

            <div className={styles.ldMetricsGrid}>
              <MetricCard title="Saving" value="$ 500" sub="+12% vs last month" />
              <MetricCard title="Current Load" value="5.2 kW" sub="+15% vs yesterday" />
              <MetricCard title="Energy Price" value="$ 10/unit" sub="+6% vs last year" showTrendArrow />
              <MetricCard title="CO2 Reduction" value="1.5t" sub="+8% this month" />
            </div>

            <div className={styles.ldPanel}>
              <div className={styles.ldPanelHeader}>
                <span>Energy Flow and Usage</span>
                <div className={styles.ldTabs}>
                  <button className={`${styles.ldTab} ${period === 'today' ? styles.ldTabActive : ''}`} onClick={() => setPeriod('today')}>Today</button>
                  <button className={`${styles.ldTab} ${period === 'week' ? styles.ldTabActive : ''}`} onClick={() => setPeriod('week')}>This Week</button>
                  <button className={`${styles.ldTab} ${period === 'month' ? styles.ldTabActive : ''}`} onClick={() => setPeriod('month')}>Month</button>
                  <button className={`${styles.ldTab} ${period === 'year' ? styles.ldTabActive : ''}`} onClick={() => setPeriod('year')}>Year</button>
                  <button className={styles.ldCalendarBtn} aria-label="Pick date">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="3" y="5" width="18" height="16" rx="4" stroke="#9AA1A6" strokeWidth="2"/><path d="M7 3v4M17 3v4" stroke="#9AA1A6" strokeWidth="2" strokeLinecap="round"/></svg>
                  </button>
                </div>
              </div>
              <EnergyFlowChart data={chartData} />
            </div>
          </div>

          <div className={styles.ldTwoCols}>
            <div className={styles.ldPanel}>
              <div className={styles.ldPanelHeader}><span>Device Status Overview</span></div>
              <div className={styles.ldDevicesGrid}>
                <DeviceCard 
                  title="Solar Panels" 
                  status="Generating Power" 
                  power="4.5kW" 
                  efficiency={95}
                  accent="#F7AE1B" 
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="5" fill="#F7AE1B"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4M4.5 4.5l2.8 2.8M16.7 16.7l2.8 2.8M19.5 4.5l-2.8 2.8M7.3 16.7L4.5 19.5" stroke="#F7AE1B" strokeWidth="1.6" strokeLinecap="round"/></svg>} 
                />
                <DeviceCard 
                  title="Home Battery" 
                  status="92% Charged" 
                  power="4.5kW" 
                  efficiency={92}
                  accent="#4F8AD7" 
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="5" y="6" width="14" height="12" rx="2" stroke="#4F8AD7" strokeWidth="2"/><path d="M12 8v6" stroke="#4F8AD7" strokeWidth="2"/></svg>} 
                />
                <DeviceCard 
                  title="EV Charger" 
                  status="87% Charged" 
                  power="4.5kW" 
                  efficiency={92}
                  accent="#00A693" 
                  icon={<svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4h6a2 2 0 0 1 2 2v10a3 3 0 1 1-6 0V6a2 2 0 0 1 2-2" stroke="#00A693" strokeWidth="2" strokeLinecap="round"/><path d="M17 8h2l2 2v5a2 2 0 0 1-2 2h-1" stroke="#00A693" strokeWidth="2" strokeLinecap="round"/></svg>} 
                />
              </div>
            </div>

            <div className={styles.ldPanel}>
              <div className={styles.ldPanelHeader}><span>Energy Consumption</span></div>
              <div className={styles.ldGaugeWrap}>
                <Gauge />
                <div className={styles.ldGaugeCenter}>
                  <div className={styles.ldGaugeValue}>20 Kwh</div>
                  <div className={styles.ldGaugeLabel}>Today Energy Consumption</div>
                </div>
              </div>
              <div className={styles.ldLegend}>
                <span className={`${styles.ldDot} ${styles.ldDotGreen}`}>Normal</span>
                <span className={`${styles.ldDot} ${styles.ldDotOrange}`}>Medium</span>
                <span className={`${styles.ldDot} ${styles.ldDotRed}`}>High</span>
              </div>
            </div>
          </div>

          <div className={styles.ldPanel}>
            <div className={styles.ldPanelHeader}><span>AI Recommendation For You</span></div>
            <div className={styles.ldRecommendations}>
              <div className={styles.ldRecoSectionTitle}>This Week</div>
              {[1,2].map((i) => (
                <div key={`now-${i}`} className={styles.ldRecoItem}>
                  <div className={styles.ldRecoDot}></div>
                  <div className={styles.ldRecoText}>
                    <div className={styles.ldRecoTitle}>Optimize EV Charging (by app)</div>
                    <div className={styles.ldRecoDesc}>Shift EV Charging to 11 PM - 6 AM to save $50/month on electricity costs</div>
                  </div>
                  <div className={styles.ldRecoMeta}>1 hr ago</div>
                  <button className={styles.ldRecoMenu} aria-label="More"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="12" r="2" fill="#9AA1A6"/><circle cx="12" cy="12" r="2" fill="#9AA1A6"/><circle cx="19" cy="12" r="2" fill="#9AA1A6"/></svg></button>
                </div>
              ))}

              <div className={styles.ldRecoSectionTitle}>Earlier</div>
              {[1,2].map((i) => (
                <div key={`old-${i}`} className={styles.ldRecoItem}>
                  <div className={styles.ldRecoDot}></div>
                  <div className={styles.ldRecoText}>
                    <div className={styles.ldRecoTitle}>Optimize EV Charging (by app)</div>
                    <div className={styles.ldRecoDesc}>Shift EV Charging to 11 PM - 6 AM to save $50/month on electricity costs</div>
                  </div>
                  <div className={styles.ldRecoMeta}>1 day ago</div>
                  <button className={styles.ldRecoMenu} aria-label="More"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="5" cy="12" r="2" fill="#9AA1A6"/><circle cx="12" cy="12" r="2" fill="#9AA1A6"/><circle cx="19" cy="12" r="2" fill="#9AA1A6"/></svg></button>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default IsolatedDashboard;