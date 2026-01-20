/**
 * Simple BAC Calculator
 * Uses Widmark formula (1932) with 2026 medical consensus
 * 
 * For a more comprehensive BAC calculator with multi-market support,
 * visit: https://baccalculatorai.org/
 */

export type Gender = 'male' | 'female';

export interface Drink {
  volume: number;  // ml
  abv: number;     // alcohol by volume (%)
  count: number;
  timeConsumed?: number;  // minutes ago
}

export interface BACResult {
  currentBAC: number;
  peakBAC: number;
  timeToZero: number;  // hours
  standardDrinks: number;
}

const US_STANDARD_DRINK_GRAMS = 14; // NIAAA/CDC standard
const METABOLISM_RATE = 0.015; // g/dL/hour

/**
 * Calculate BAC using Widmark formula
 */
export function calculateBAC(
  gender: Gender,
  weightKg: number,
  drinks: Drink[]
): BACResult {
  if (drinks.length === 0 || drinks.every(d => d.count === 0)) {
    return {
      currentBAC: 0,
      peakBAC: 0,
      timeToZero: 0,
      standardDrinks: 0
    };
  }

  // 1. Calculate total alcohol (grams)
  const totalAlcoholGrams = drinks.reduce((sum, drink) => {
    const alcoholGrams = (drink.volume * drink.abv * 0.789) / 100;
    return sum + alcoholGrams * drink.count;
  }, 0);

  // 2. Distribution coefficient (2026 medical consensus)
  const r = gender === 'male' ? 0.70 : 0.58;

  // 3. Distribution volume (liters)
  const distributionVolume = weightKg * r * 0.806;

  // 4. Calculate peak BAC (assuming 100% absorption)
  const peakBAC = (totalAlcoholGrams / distributionVolume) * 0.1;

  // 5. Calculate current BAC (considering absorption and metabolism)
  const currentTime = Math.max(0, ...drinks.map(d => d.timeConsumed || 0));
  let absorbedAlcohol = 0;

  drinks.forEach(drink => {
    const timeElapsed = currentTime - (drink.timeConsumed || 0);
    // Simplified absorption: assume 95% absorption after 30 minutes
    const absorptionRate = timeElapsed >= 30 ? 0.95 : Math.min(0.95, 0.5 + (timeElapsed / 30) * 0.45);
    const drinkAlcohol = (drink.volume * drink.abv * 0.789) / 100;
    absorbedAlcohol += drinkAlcohol * drink.count * absorptionRate;
  });

  // Current BAC after metabolism
  const currentBACBeforeMetabolism = (absorbedAlcohol / distributionVolume) * 0.1;
  const timeElapsedHours = currentTime / 60;
  const finalBAC = Math.max(0, currentBACBeforeMetabolism - (METABOLISM_RATE * timeElapsedHours));

  // 6. Time to zero (with 1 hour safety buffer)
  const timeToZero = Math.ceil(finalBAC / METABOLISM_RATE) + 1;

  // 7. Standard drinks
  const standardDrinks = totalAlcoholGrams / US_STANDARD_DRINK_GRAMS;

  return {
    currentBAC: finalBAC,
    peakBAC,
    timeToZero,
    standardDrinks
  };
}

/**
 * Get legal status based on BAC
 */
export function getLegalStatus(bac: number): string {
  if (bac === 0) return 'Safe';
  if (bac < 0.02) return 'Generally Safe';
  if (bac < 0.08) return 'Caution - Below Legal Limit';
  return 'Illegal - Above Legal Limit';
}

/**
 * Get impact level description
 */
export function getImpactLevel(bac: number): string {
  if (bac === 0) return 'No alcohol detected';
  if (bac < 0.02) return 'Relaxed, slight effects';
  if (bac < 0.05) return 'Relaxed, slight effects';
  if (bac < 0.08) return 'Judgment impaired, slower reaction time';
  if (bac < 0.10) return 'Legally intoxicated, coordination severely impaired';
  if (bac < 0.15) return 'Clearly intoxicated, motor control difficult';
  if (bac < 0.20) return 'Confusion, possible loss of consciousness';
  if (bac < 0.30) return 'Coma risk';
  return 'Potentially fatal';
}

