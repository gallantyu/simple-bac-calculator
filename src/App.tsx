import React, { useState } from 'react';
import { calculateBAC, getLegalStatus, getImpactLevel, Gender, Drink } from './calculator';
import './App.css';

function App() {
  const [gender, setGender] = useState<Gender>('male');
  const [weight, setWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [drinks, setDrinks] = useState<Drink[]>([
    { volume: 355, abv: 5, count: 0, timeConsumed: 0 }
  ]);

  // Convert weight to kg for calculation
  const weightKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;

  const result = calculateBAC(gender, weightKg, drinks);

  const addDrink = () => {
    setDrinks([...drinks, { volume: 355, abv: 5, count: 0, timeConsumed: 0 }]);
  };

  const removeDrink = (index: number) => {
    setDrinks(drinks.filter((_, i) => i !== index));
  };

  const updateDrink = (index: number, field: keyof Drink, value: number) => {
    const updated = [...drinks];
    updated[index] = { ...updated[index], [field]: value };
    setDrinks(updated);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Simple BAC Calculator</h1>
        <p className="subtitle">
          A lightweight, open-source Blood Alcohol Content calculator
        </p>
        <div className="disclaimer-banner">
          ⚠️ This is an estimate only. Never drink and drive.
        </div>
      </header>

      <main className="main-content">
        <div className="calculator-card">
          <section className="section">
            <h2>Personal Information</h2>
            <div className="form-group">
              <label>Biological Sex</label>
              <div className="radio-group">
                <label>
                  <input
                    type="radio"
                    value="male"
                    checked={gender === 'male'}
                    onChange={(e) => setGender(e.target.value as Gender)}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    value="female"
                    checked={gender === 'female'}
                    onChange={(e) => setGender(e.target.value as Gender)}
                  />
                  Female
                </label>
              </div>
            </div>

            <div className="form-group">
              <label>Weight</label>
              <div className="weight-input">
                <input
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(parseFloat(e.target.value) || 0)}
                  min="1"
                  step="0.1"
                />
                <select
                  value={weightUnit}
                  onChange={(e) => setWeightUnit(e.target.value as 'kg' | 'lbs')}
                >
                  <option value="kg">kg</option>
                  <option value="lbs">lbs</option>
                </select>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="section-header">
              <h2>Drinks</h2>
              <button onClick={addDrink} className="btn-add">+ Add Drink</button>
            </div>

            {drinks.map((drink, index) => (
              <div key={index} className="drink-item">
                <div className="drink-row">
                  <div className="form-group">
                    <label>Volume (ml)</label>
                    <input
                      type="number"
                      value={drink.volume}
                      onChange={(e) => updateDrink(index, 'volume', parseFloat(e.target.value) || 0)}
                      min="0"
                      step="1"
                    />
                  </div>

                  <div className="form-group">
                    <label>ABV (%)</label>
                    <input
                      type="number"
                      value={drink.abv}
                      onChange={(e) => updateDrink(index, 'abv', parseFloat(e.target.value) || 0)}
                      min="0"
                      max="100"
                      step="0.1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Count</label>
                    <input
                      type="number"
                      value={drink.count}
                      onChange={(e) => updateDrink(index, 'count', parseInt(e.target.value) || 0)}
                      min="0"
                      step="1"
                    />
                  </div>

                  <div className="form-group">
                    <label>Time (min ago)</label>
                    <input
                      type="number"
                      value={drink.timeConsumed || 0}
                      onChange={(e) => updateDrink(index, 'timeConsumed', parseInt(e.target.value) || 0)}
                      min="0"
                      step="1"
                    />
                  </div>

                  {drinks.length > 1 && (
                    <button
                      onClick={() => removeDrink(index)}
                      className="btn-remove"
                      aria-label="Remove drink"
                    >
                      ×
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>

          <section className="section results">
            <h2>Results</h2>
            <div className="result-grid">
              <div className="result-item">
                <div className="result-label">Current BAC</div>
                <div className="result-value highlight">
                  {(result.currentBAC * 100).toFixed(3)}%
                </div>
              </div>

              <div className="result-item">
                <div className="result-label">Peak BAC</div>
                <div className="result-value">
                  {(result.peakBAC * 100).toFixed(3)}%
                </div>
              </div>

              <div className="result-item">
                <div className="result-label">Legal Status</div>
                <div className={`result-value ${result.currentBAC >= 0.08 ? 'danger' : result.currentBAC >= 0.02 ? 'warning' : 'safe'}`}>
                  {getLegalStatus(result.currentBAC)}
                </div>
              </div>

              <div className="result-item">
                <div className="result-label">Impact Level</div>
                <div className="result-value">
                  {getImpactLevel(result.currentBAC)}
                </div>
              </div>

              <div className="result-item">
                <div className="result-label">Standard Drinks</div>
                <div className="result-value">
                  {result.standardDrinks.toFixed(1)}
                </div>
              </div>

              <div className="result-item">
                <div className="result-label">Time to Zero</div>
                <div className="result-value">
                  {result.timeToZero} hours
                </div>
              </div>
            </div>
          </section>
        </div>

        <div className="info-card">
          <h3>⚠️ Important Disclaimer</h3>
          <p>
            This calculator provides estimates only and does not constitute legal or medical advice.
            Individual metabolism varies significantly. Always use a ride-sharing service or public
            transportation if you have been drinking.
          </p>
          <p className="link-to-full">
            For a more comprehensive BAC calculator with multi-market support, advanced features,
            and better accuracy, visit:{' '}
            <a href="https://baccalculatorai.org/" target="_blank" rel="noopener noreferrer">
              <strong>BAC Calculator AI - Full Version</strong>
            </a>
          </p>
        </div>
      </main>

      <footer className="footer">
        <p>
          Simple BAC Calculator - Open Source | 
          Uses Widmark formula (1932) with 2026 medical consensus
        </p>
        <p>
          For the full-featured version, visit{' '}
          <a href="https://baccalculatorai.org/" target="_blank" rel="noopener noreferrer">
            baccalculatorai.org
          </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

