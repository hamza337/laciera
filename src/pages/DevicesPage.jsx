import React, { useMemo, useState } from 'react';
import layoutStyles from './IsolatedDashboard.module.css';
import styles from './DevicesPage.module.css';

const CATEGORY_LIST = ['Generation', 'Storage', 'Consumption', 'Utilities'];
const DEVICE_OPTIONS = {
  Generation: ['Solar Panels'],
  Storage: ['Energy Storage System'],
  Consumption: ['EV Charger', 'Heat Pump', 'Split AC / Central AC', 'Electric Heater', 'Dishwasher', 'Oven', 'Washing Machine', 'Dryer'],
  Utilities: ['Smart Control Systems', 'Metering Systems'],
};

const DevicesPage = () => {
  // Devices grouped by category
  const [devicesByCategory, setDevicesByCategory] = useState({
    Generation: [],
    Storage: [],
    Consumption: [],
    Utilities: [],
  });

  const hasAnyDevice = useMemo(() =>
    CATEGORY_LIST.some((cat) => devicesByCategory[cat]?.length > 0),
  [devicesByCategory]);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    category: 'Consumption',
    deviceType: 'Washing Machine',
    brandModel: '',
    power: '',
    energyLabel: 'A',
    line: '',
    quantity: 1,
  });

  const onOpenModal = () => setIsModalOpen(true);
  const onCloseModal = () => setIsModalOpen(false);

  const onChangeField = (key, value) => {
    setForm((prev) => {
      let next = { ...prev, [key]: value };
      if (key === 'category') {
        const options = DEVICE_OPTIONS[value] || [];
        if (!options.includes(next.deviceType)) {
          next.deviceType = options[0] || '';
        }
      }
      return next;
    });
  };

  const onSaveDevice = () => {
    const newDevice = {
      name: form.deviceType || 'Device',
      qty: Number(form.quantity) || 0,
      active: true,
      brandModel: form.brandModel,
      power: form.power,
      energyLabel: form.energyLabel,
      line: form.line,
    };
    setDevicesByCategory((prev) => ({
      ...prev,
      [form.category]: [...(prev[form.category] || []), newDevice],
    }));
    setIsModalOpen(false);
  };

  const toggleDevice = (cat, idx) => {
    setDevicesByCategory((prev) => {
      const list = [...prev[cat]];
      list[idx] = { ...list[idx], active: !list[idx].active };
      return { ...prev, [cat]: list };
    });
  };

  const changeQty = (cat, idx, delta) => {
    setDevicesByCategory((prev) => {
      const list = [...prev[cat]];
      const nextQty = Math.max(0, (list[idx].qty || 0) + delta);
      list[idx] = { ...list[idx], qty: nextQty };
      return { ...prev, [cat]: list };
    });
  };

  return (
    <section className={layoutStyles.ldContent}>
      <div style={{borderBottom: '1px solid #E3E3E3', paddingBottom: '16px'}} className={layoutStyles.ldHeaderRow}>
        {/* <div> */}
          <h2 className={layoutStyles.ldPageTitle}>Devices</h2>
        {/* </div> */}
        <button className={styles.addBtn} onClick={onOpenModal} aria-label="Add New Device">+ Add New Device</button>
      </div>

      <div>
        {!hasAnyDevice ? (
          <div className={styles.dvxEmptyWrap}>
            <img className={styles.dvxEmptyImg} src="/noData.png" alt="No Device Available" />
            <div className={styles.emptyTitle}>No devices available</div>
            <div className={styles.emptyDesc}>Add your devices by clicking on Add New Device</div>
            <button className={styles.addBtn} onClick={onOpenModal}>+ Add New Device</button>
          </div>
        ) : (
          <div className={styles.columns}>
            {CATEGORY_LIST.map((cat) => (
              <div key={cat} className={styles.category}>
                <div className={styles.categoryTitle}>{cat}</div>
                {(devicesByCategory[cat] || []).length === 0 ? (
                  <div className={styles.deviceInfo} style={{ padding: 8 }}>No devices in this category</div>
                ) : (
                  (devicesByCategory[cat] || []).map((dev, idx) => (
                    <div className={styles.dvxCard} key={`${dev.name}-${idx}`}>
                      <div className={styles.dvxTopRow}>
                        <div className={styles.dvxIcon} aria-hidden="true">{String(dev.name || 'D').slice(0, 1)}</div>
                        <div className={styles.dvxName}>{dev.name}</div>
                      </div>
                      <div className={styles.dvxDivider} />
                      <div className={styles.dvxBottomRow}>
                        <div className={styles.dvxQty}>Quantity : {dev.qty || 0}</div>
                        <div
                          className={`${styles.toggle} ${dev.active ? styles.toggleOn : ''}`}
                          onClick={() => toggleDevice(cat, idx)}
                          role="switch"
                          aria-checked={dev.active ? 'true' : 'false'}
                          aria-label={`Toggle ${dev.name}`}
                        >
                          <div className={`${styles.knob} ${dev.active ? styles.knobOn : ''}`} />
                        </div>
                        <div className={styles.dvxVSep} aria-hidden="true" />
                        <button className={styles.dvxMenuBtn} aria-label={`${dev.name} menu`}>
                          <span aria-hidden>⋮</span>
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay} onClick={onCloseModal}>
          <div className={styles.modal} onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-labelledby="editDeviceTitle">
            <div className={styles.modalHeader}>
              <div className={styles.modalTitle} id="editDeviceTitle">Edit Device</div>
              <button className={styles.modalClose} onClick={onCloseModal} aria-label="Close">
                <span aria-hidden>✕</span>
              </button>
            </div>
            <div className={styles.modalBody}>
              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label className={styles.label}>Category</label>
                  <select className={styles.select} value={form.category} onChange={(e) => onChangeField('category', e.target.value)}>
                    {CATEGORY_LIST.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formField}>
                  <label className={styles.label}>Device Type</label>
                  <select className={styles.select} value={form.deviceType} onChange={(e) => onChangeField('deviceType', e.target.value)}>
                    {(DEVICE_OPTIONS[form.category] || []).map((opt) => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label className={styles.label}>Brands & Models</label>
                  <input className={styles.input} value={form.brandModel} onChange={(e) => onChangeField('brandModel', e.target.value)} placeholder="e.g., Bosch Series 6" />
                </div>
                <div className={styles.formField}>
                  <label className={styles.label}>Power</label>
                  <input className={styles.input} value={form.power} onChange={(e) => onChangeField('power', e.target.value)} placeholder="e.g., 2.4 kW" />
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label className={styles.label}>Unit</label>
                  <select className={styles.select} value={form.energyLabel} onChange={(e) => onChangeField('energyLabel', e.target.value)}>
                    {['Kv', 'Kva', 'Watt'].map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formField}>
                  <label className={styles.label}>Energy Label</label>
                  <select className={styles.select} value={form.energyLabel} onChange={(e) => onChangeField('energyLabel', e.target.value)}>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className={styles.formRow}>
                <div className={styles.formField}>
                  <label className={styles.label}>Quantity</label>
                  <input className={styles.input} type="number" min={0} value={form.quantity} onChange={(e) => onChangeField('quantity', e.target.value)} />
                </div>
              </div>
            </div>
            <div className={styles.modalFooter}>
              <button className={styles.cancelBtn} onClick={onCloseModal}>Cancel</button>
              <button className={styles.saveBtn} onClick={onSaveDevice}>Save</button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default DevicesPage;