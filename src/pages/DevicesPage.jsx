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
      <div className={layoutStyles.ldHeaderRow}>
        <div>
          <h2 className={layoutStyles.ldPageTitle}>Devices</h2>
          <p className={layoutStyles.ldPageSub}>Manage and monitor your devices</p>
        </div>
        <button className={styles.addBtn} onClick={onOpenModal} aria-label="Add New Device">+ Add New Device</button>
      </div>

      <div className={layoutStyles.ldPanel}>
        <div className={layoutStyles.ldPanelHeader}>
          <span>Devices</span>
          {!hasAnyDevice && (
            <span className={styles.subtitle}>No devices added yet</span>
          )}
        </div>

        {!hasAnyDevice ? (
          <div className={styles.emptyWrap}>
            <svg className={styles.emptyIcon} viewBox="0 0 180 120" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <rect x="14" y="22" width="152" height="76" rx="12" fill="#F1F5F9" stroke="#E6EBF0" />
              <circle cx="60" cy="60" r="24" fill="#E9F7F4" stroke="#A6E4DC" />
              <path d="M60 48l6 12H54l6-12z" fill="#00A693" />
              <rect x="98" y="48" width="40" height="24" rx="6" fill="#E9EEF3" />
            </svg>
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
                    <div className={styles.deviceCard} key={`${dev.name}-${idx}`}>
                      <div className={styles.deviceHeader}>
                        <div className={styles.deviceTitleRow}>
                          <div className={styles.iconBox} aria-hidden="true">{String(dev.name || 'D').slice(0, 1)}</div>
                          <div>
                            <div className={styles.deviceName}>{dev.name}</div>
                            <div className={styles.deviceInfo}>Qty: {dev.qty || 0}{dev.power ? ` · ${dev.power}` : ''}{dev.energyLabel ? ` · Label ${dev.energyLabel}` : ''}</div>
                          </div>
                        </div>
                        <div
                          className={`${styles.toggle} ${dev.active ? styles.toggleOn : ''}`}
                          onClick={() => toggleDevice(cat, idx)}
                          role="switch"
                          aria-checked={dev.active ? 'true' : 'false'}
                          aria-label={`Toggle ${dev.name}`}
                        >
                          <div className={`${styles.knob} ${dev.active ? styles.knobOn : ''}`} />
                        </div>
                      </div>
                      <div className={styles.deviceControls}>
                        <div className={styles.qtyRow}>
                          <button className={styles.qtyBtn} onClick={() => changeQty(cat, idx, -1)} aria-label="Decrease quantity">−</button>
                          <input
                            className={styles.qtyInput}
                            type="number"
                            min={0}
                            value={dev.qty || 0}
                            onChange={(e) => changeQty(cat, idx, (Number(e.target.value) || 0) - (dev.qty || 0))}
                            aria-label="Quantity"
                          />
                          <button className={styles.qtyBtn} onClick={() => changeQty(cat, idx, 1)} aria-label="Increase quantity">+</button>
                        </div>
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
                  <label className={styles.label}>Energy Label</label>
                  <select className={styles.select} value={form.energyLabel} onChange={(e) => onChangeField('energyLabel', e.target.value)}>
                    {['A', 'B', 'C', 'D', 'E', 'F', 'G'].map((l) => (
                      <option key={l} value={l}>{l}</option>
                    ))}
                  </select>
                </div>
                <div className={styles.formField}>
                  <label className={styles.label}>Line</label>
                  <input className={styles.input} value={form.line} onChange={(e) => onChangeField('line', e.target.value)} placeholder="e.g., Home" />
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