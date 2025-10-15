import React from 'react';
import styles from './ReportsPage.module.css';

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
    { title: 'Monthly Saving', value: '$ 500', icon: '/card1.png' },
    { title: 'Self Consumption', value: '68 %', icon: '/card2.png' },
    { title: 'Shifted (kWh)', value: '140 kWh', icon: '/card3.png' },
    { title: 'Peak Reduction', value: '1.5 kVA', icon: '/card4.png' },
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
    <section className={styles.rpContent}>
      <div className={styles.rpHeader}>
        <div>
          <h2 className={styles.rpTitle}>Reports</h2>
        </div>
        <div>
          <select className={styles.rpMonthSelect} aria-label="Select month">
            {monthOptions.map((m) => (
              <option key={m} value={m} defaultValue={m === selectedMonth ? m : undefined}>{m}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Monthly Energy Data */}
      <div>
        <div className={styles.rpSectionTitle}>
          Monthly Energy Data
        </div>
        <div className={styles.rpMetricsGrid}>
          {metrics.map((m) => (
            <div key={m.title} className={styles.rpMetricCard}>
              <div className={styles.rpMetricRow}>
                <div className={styles.rpMetricCol}>
                  <div className={styles.rpMetricTitle}>{m.title}</div>
                  <div className={styles.rpMetricValue}>{m.value}</div>
                </div>
                <img className={styles.rpMetricIcon} src={m.icon} alt="Report Icons" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.rpTwoCols}>
        {/* Left column */}
        <div className={styles.rpPanel}>
          <div className={styles.rpPanelHeader}>
            Total Energy Flow and Usage (kWh)
          </div>
          <div className={styles.rpTableWrapper}>
            <table className={styles.rpTable}>
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
          <div className={styles.rpLegend}>
            <span className={styles.rpLegendItem}><span className={styles.rpLegendDot} style={{ background: '#FF5832' }} />Peak day: {peakDay}</span>
            <span className={styles.rpLegendItem}><span className={styles.rpLegendDot} style={{ background: '#65A5FF' }} />Lowest Day: {lowestDay}</span>
          </div>
        </div>

        {/* Right column */}
        <div className={styles.rpRightStack}>
          <div className={styles.rpPanel}>
            <div className={styles.rpPanelHeader}>Key Metrics Summary</div>
            <div className={styles.rpSummaryList}>
              <div className={styles.rpSummaryItem}>
                <span className={styles.rpSummaryLabel}>Total Current Load</span>
                <span className={styles.rpSummaryValue}>55.8kW</span>
              </div>
              <div className={styles.rpSummaryItem}>
                <span className={styles.rpSummaryLabel}>Total CO2 Reduction</span>
                <span className={styles.rpSummaryValue}>80.2t</span>
              </div>
              <div className={styles.rpSummaryItem}>
                <span className={styles.rpSummaryLabel}>Avg. Energy Price</span>
                <span className={styles.rpSummaryValue}>$25/Unit</span>
              </div>
            </div>
          </div>

          <div className={styles.rpPanel}>
            <div className={styles.rpPanelHeader}>Device Status Overview</div>
            <div className={styles.rpStatusList}>
              <div className={styles.rpStatusItem}>
                <span className={styles.rpStatusLabel}>Solar Panels (4.5 KW)</span>
                <span className={styles.rpBadge}>Active</span>
              </div>
              <div className={styles.rpStatusItem}>
                <span className={styles.rpStatusLabel}>Home Battery (4.5 KW)</span>
                <span className={styles.rpBadge}>Active</span>
              </div>
              <div className={styles.rpStatusItem}>
                <span className={styles.rpStatusLabel}>EV Charger (4.5 KW)</span>
                <span className={styles.rpBadge}>Active</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Distribution (left) + Performance (right). Left stacks Distribution + AI */}
      <div className={styles.rpTwoCols}>
        <div className={styles.rpLeftStack}>
          <div className={styles.rpPanel}>
            <div className={styles.rpPanelHeader}>Energy Consumption Distribution</div>
            <div className={styles.rpDistributionWrap}>
              <div className={styles.rpDistributionBar}>
                <div className={`${styles.rpDistributionSegment} ${styles.rpDistributionGreen}`} style={{ width: `${dist.normal}%` }} />
                <div className={`${styles.rpDistributionSegment} ${styles.rpDistributionYellow}`} style={{ width: `${dist.medium}%` }} />
                <div className={`${styles.rpDistributionSegment} ${styles.rpDistributionRed}`} style={{ width: `${dist.high}%` }} />
              </div>
              <div className={styles.rpDistributionMeta}>
                <span>Normal {dist.normal}%</span>
                <span>Medium {dist.medium}%</span>
                <span>High {dist.high}%</span>
              </div>
            </div>
          </div>

          <div className={styles.rpPanel + ' ' + styles.rpPanelAi}>
            <div className={styles.rpPanelHeader}>Top AI Recommendation For You</div>
            <div className={styles.rpRecommendations}>
              {[1, 2].map((i) => (
                <div key={i} className={styles.rpRecoItem}>
                  {/* <span className={styles.rpRecoDot} /> */}
                  <img src="/ai.png" alt="/ai.png" />
                  <div className={styles.rpRecoContent}>
                    <div className={styles.rpRecoTitle}>Optimize EV Charging</div>
                    <div className={styles.rpRecoDesc}>Shift EV Charging to 11 PM - 6 AM to save $50/month on electricity costs</div>
                  </div>
                  <div className={styles.rpRecoMeta}>1hr ago</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className={styles.rpPanel}>
          <div className={styles.rpPanelHeader}>Performance Summary</div>
          <div className={styles.rpSummaryList}>
            <div className={styles.rpSummaryItem}>
              <span className={styles.rpSummaryLabel}>Energy Optimization :</span>
              <span className={styles.rpSummaryDesc}>Successfully shifted 140 kWh to lower-cost periods</span>
            </div>
            <div className={styles.rpSummaryItem}>
              <span className={styles.rpSummaryLabel}>Grid Efficiency :</span>
              <span className={styles.rpSummaryDesc}>Achieved 68% Self-consumption rate</span>
            </div>
            <div className={styles.rpSummaryItem}>
              <span className={styles.rpSummaryLabel}>Financial Impact :</span>
              <span className={styles.rpSummaryDesc}>Total saving of $500 this month</span>
            </div>
            <div className={styles.rpSummaryItem}>
              <span className={styles.rpSummaryLabel}>Peak Management :</span>
              <span className={styles.rpSummaryDesc}>Reduced Peak demand by 1.5 kVA</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReportsPage;