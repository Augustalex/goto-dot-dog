import { useEffect, useState } from "react";
import { readFeature, updateFeature } from "./utils";

export const features = [
  {
    name: "Place community page",
    key: "place-community",
    description:
      "When clicking on a place in the list, you will be taken to a page with community content about the place. You can easily open the map from there, and also click a button to leave a rating.",
    defaultState: "off",
    states: ["off", "on"],
  },
] as const;

export type Features = (typeof features)[number]["key"];

export function useFeature(key: Features) {
  let defaultState = "-";
  const feature = features.find((f) => f.key === key);
  if (feature) {
    defaultState = feature.defaultState;
  } else {
    throw new Error(`Feature with key ${key} not found`);
  }
  const [featureState, setFeatureState] = useState(defaultState);

  useEffect(() => {
    setFeatureState(readFeature(feature));
  }, [feature]);

  return featureState;
}

export function setFeature(key: Features, state: string) {
  const feature = features.find((f) => f.key === key);
  if (!feature) {
    throw new Error(`Feature with key ${key} not found`);
  }

  updateFeature(feature.key, state);
}
