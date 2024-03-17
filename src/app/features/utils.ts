export interface FeatureT {
  name: string;
  description: string;
  key: string;
  defaultState: string;
}

export function readFeature(feature: FeatureT) {
  return localStorage.getItem(feature.key) ?? feature.defaultState;
}

export function updateFeature(key: string, state: string) {
  localStorage.setItem(key, state);
}

export function initFeatures(features: FeatureT[]) {
  features.forEach((feature) => {
    if (localStorage.getItem(feature.key) === null) {
      localStorage.setItem(feature.key, feature.defaultState);
    }
  });
}
