import React from 'react';
import layoutStyles from './IsolatedDashboard.module.css';

const IconSaving = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="4" y="8" width="22" height="16" rx="3" stroke="#009382" strokeWidth="2" />
    <circle cx="10" cy="16" r="2.2" fill="#FFB74D" />
    <path d="M14 14h8M14 18h6" stroke="#009382" strokeWidth="2" strokeLinecap="round" />
  </svg>
);
const IconSun = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <circle cx="16" cy="16" r="6" fill="#FFCA28" />
    <g stroke="#FFA000" strokeWidth="2" strokeLinecap="round">
      <path d="M16 4v4M16 24v4M4 16h4M24 16h4M7.5 7.5l2.8 2.8M21.7 21.7l2.8 2.8M7.5 24.5l2.8-2.8M21.7 10.3l2.8-2.8" />
    </g>
  </svg>
);
const IconPlug = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M12 10v6M20 10v6" stroke="#009382" strokeWidth="2" strokeLinecap="round" />
    <path d="M9 16h14v4a5 5 0 0 1-5 5h-4a5 5 0 0 1-5-5v-4z" stroke="#009382" strokeWidth="2" />
  </svg>
);
const IconChart = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M6 24V12M12 24V16M18 24V8M24 24V18" stroke="#FF6F61" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const ReportsPage = () => {
  const monthOptions = ['March 2025', 'February 2025', 'January 2025'];
  const [selectedMonth] = React.useState(monthOptions[0]);

  const metrics = [
    { title: 'Monthly Saving', value: '$ 500', icon: <IconSaving /> },
    { title: 'Self Consumption', value: '68 %', icon: <IconSun /> },
    { title: 'Shifted (kWh)', value: '140 kWh', icon: <IconPlug /> },
    { title: 'Peak Reduction', value: '1.5 kVA', icon: <IconChart /> },
  ];

  const tableData = [
    { day: 'Monday', gen: 45, cons: 56, exp: 10, imp: 8 },
    { day: 'Tuesday', gen: 82, cons: 80, exp: 13, imp: 6 },
    { day: 'Wednesday', gen: 79, cons: 70, exp: 9, imp: 4 },
    { day: 'Thursday', gen: 86, cons: 75, exp: 8, imp: 8 },
    { day: 'Friday', gen: 98, cons: 96, exp: 10, imp: 2 },
    { day: 'Saturday', gen: 100, cons: 76, exp: 12, imp: 9 },
    { day: 'Sunday', gen: 140, cons: 120, exp: 30, imp: 15 },
  ];
  const peakDay = tableData.reduce((a, b) => (a.gen > b.gen ? a : b)).day;
  const lowestDay = tableData.reduce((a, b) => (a.gen < b.gen ? a : b)).day;

  const dist = { normal: 60, medium: 25, high: 15 };

  return (
    <section className={layoutStyles.ldContent}>
      <div className={layoutStyles.ldHeaderRow}>
        <div>
          <h2 className={layoutStyles.ldPageTitle}>Reports</h2>
          <p className={layoutStyles.ldPageSub}>Monthly energy analytics and insights</p>
        </div>
        <div>
          <select className={layoutStyles.ldFilterSelect} aria-label="Select month">
            {monthOptions.map((m) => (
              <option key={m} value={m} defaultValue={m === selectedMonth ? m : undefined}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Monthly Energy Data */}
      <div className={layoutStyles.ldPanel}>
        <div className={layoutStyles.ldPanelHeader}>
          <span>Monthly Energy Data</span>
        </div>
        <div className={layoutStyles.ldMetricsGrid}>
          {metrics.map((m) => (
            <div key={m.title} className={layoutStyles.ldMetricCard}>
              <div className={layoutStyles.ldMetricHeader}>
                <span className={layoutStyles.ldMetricTitle}>{m.title}</span>
                <span className={layoutStyles.ldMetricIcon}>{m.icon}</span>
              </div>
              <div className={layoutStyles.ldMetricValue}>{m.value}</div>
            </div>
          ))}
        </div>
      </div>

      <div className={layoutStyles.ldTwoCols}>
        {/* Left column */}
        <div className={layoutStyles.ldPanel}>
          <div className={layoutStyles.ldPanelHeader}>
            <span>Total Energy Flow and Usage (kWh)</span>
          </div>
          <div className={layoutStyles.ldTableWrapper}>
            <table className={layoutStyles.ldTable}>
              <thead>
                <tr>
                  <th>Days</th>
                  <th>Generation</th>
                  <th>Consumption</th>
                  <th>Export</th>
                  <th>Import</th>
                </tr>
              </thead>
              <tbody>
                {tableData.map((row) => (
                  <tr key={row.day}>
                    <td>{row.day}</td>
                    <td>{row.gen}</td>
                    <td>{row.cons}</td>
                    <td>{row.exp}</td>
                    <td>{row.imp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={layoutStyles.ldLegendRow}>
            <span className={layoutStyles.ldLegendItem}><span className={layoutStyles.ldLegendDot} style={{ background: '#FF8C42' }} />Peak day: {peakDay}</span>
            <span className={layoutStyles.ldLegendItem}><span className={layoutStyles.ldLegendDot} style={{ background: '#4AAB3D' }} />Lowest Day: {lowestDay}</span>
          </div>
        </div>

        {/* Right column */}
        <div className={layoutStyles.ldRightColStack}>
          <div className={layoutStyles.ldPanel}>
            <div className={layoutStyles.ldPanelHeader}><span>Key Metrics Summary</span></div>
            <div className={layoutStyles.ldSummaryList}>
              <div className={layoutStyles.ldSummaryItem}>
                <span className={layoutStyles.ldSummaryLabel}>Total Current Load</span>
                <span className={layoutStyles.ldSummaryValue}>55.8kW</span>
              </div>
              <div className={layoutStyles.ldSummaryItem}>
                <span className={layoutStyles.ldSummaryLabel}>Total CO2 Reduction</span>
                <span className={layoutStyles.ldSummaryValue}>80.2t</span>
              </div>
              <div className={layoutStyles.ldSummaryItem}>
                <span className={layoutStyles.ldSummaryLabel}>Avg. Energy Price</span>
                <span className={layoutStyles.ldSummaryValue}>$25/Unit</span>
              </div>
            </div>
          </div>

          <div className={layoutStyles.ldPanel}>
            <div className={layoutStyles.ldPanelHeader}><span>Device Status Overview</span></div>
            <div className={layoutStyles.ldStatusList}>
              <div className={layoutStyles.ldStatusItem}>
                <span className={layoutStyles.ldStatusLabel}>Solar Panels (4.5 KW)</span>
                <span className={layoutStyles.ldBadge}>Active</span>
              </div>
              <div className={layoutStyles.ldStatusItem}>
                <span className={layoutStyles.ldStatusLabel}>Home Battery (4.5 KW)</span>
                <span className={layoutStyles.ldBadge}>Active</span>
              </div>
              <div className={layoutStyles.ldStatusItem}>
                <span className={layoutStyles.ldStatusLabel}>EV Charger (4.5 KW)</span>
                <span className={layoutStyles.ldBadge}>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Distribution & Recommendations */}
      <div className={layoutStyles.ldTwoCols}>
        <div className={layoutStyles.ldPanel}>
          <div className={layoutStyles.ldPanelHeader}><span>Energy Consumption Distribution</span></div>
          <div className={layoutStyles.ldDistributionWrap}>
            <div className={layoutStyles.ldDistributionBar}>
              <div className={`${layoutStyles.ldDistributionSegment} ${layoutStyles.ldDistributionGreen}`} style={{ width: `${dist.normal}%` }} />
              <div className={`${layoutStyles.ldDistributionSegment} ${layoutStyles.ldDistributionYellow}`} style={{ width: `${dist.medium}%` }} />
              <div className={`${layoutStyles.ldDistributionSegment} ${layoutStyles.ldDistributionRed}`} style={{ width: `${dist.high}%` }} />
            </div>
            <div className={layoutStyles.ldDistributionMeta}>
              <span>Normal {dist.normal}%</span>
              <span>Medium {dist.medium}%</span>
              <span>High {dist.high}%</span>
            </div>
          </div>
        </div>

        <div className={layoutStyles.ldPanel}>
          <div className={layoutStyles.ldPanelHeader}><span>Performance Summary</span></div>
          <div className={layoutStyles.ldSummaryList}>
            <div className={layoutStyles.ldSummaryItem}>
              <span className={layoutStyles.ldSummaryLabel}>Energy Optimization :</span>
              <span className={layoutStyles.ldSummaryDesc}>Successfully shifted 140 kWh to lower-cost periods</span>
            </div>
            <div className={layoutStyles.ldSummaryItem}>
              <span className={layoutStyles.ldSummaryLabel}>Grid Efficiency :</span>
              <span className={layoutStyles.ldSummaryDesc}>Achieved 68% Self-consumption rate</span>
            </div>
            <div className={layoutStyles.ldSummaryItem}>
              <span className={layoutStyles.ldSummaryLabel}>Financial Impact :</span>
              <span className={layoutStyles.ldSummaryDesc}>Total saving of $500 this month</span>
            </div>
            <div className={layoutStyles.ldSummaryItem}>
              <span className={layoutStyles.ldSummaryLabel}>Peak Management :</span>
              <span className={layoutStyles.ldSummaryDesc}>Reduced Peak demand by 1.5 kVA</span>
            </div>
          </div>
        </div>
      </div>

      {/* AI Recommendations */}
      <div className={layoutStyles.ldPanel}>
        <div className={layoutStyles.ldPanelHeader}><span>Top AI Recommendation For You</span></div>
        <div className={layoutStyles.ldRecommendations}>
          {[1, 2].map((i) => (
            <div key={i} className={layoutStyles.ldRecoItem}>
              <span className={layoutStyles.ldRecoDot} />
              <div>
                <div className={layoutStyles.ldRecoTitle}>Optimize EV Charging</div>
                <div className={layoutStyles.ldRecoDesc}>Shift EV Charging to 11 PM - 6 AM to save $50/month on electricity costs</div>
              </div>
              <div className={layoutStyles.ldRecoMeta}>1hr ago</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReportsPage;