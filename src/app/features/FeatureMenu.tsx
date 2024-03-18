"use client";

import { useEffect, useState } from "react";
import { features, type Features } from "./features";
import { readFeature, updateFeature } from "./utils";

export function FeatureMenu() {
  const [localState, setLocalState] = useState<Record<Features, string>>({
    "place-community": "-",
  });

  useEffect(() => {
    setLocalState(
      Object.fromEntries(
        features.map((v) => {
          return [v.key, readFeature(v)];
        })
      ) as Record<Features, string>
    );
  }, []);

  return (
    <>
      <ul style={{ margin: "16px" }}>
        {features.map((feature) => {
          return (
            <li
              key={feature.key}
              style={{
                border: "2px solid grey",
                maxWidth: "512px",
                padding: "16px",
                borderRadius: "16px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <h3 style={{ fontSize: "16px", marginBottom: "4px" }}>
                    {feature.name}
                  </h3>
                  <p style={{ fontSize: "12px" }}>{feature.description}</p>
                </div>
                <select
                  style={{
                    width: "64px",
                    padding: "4px 8px",
                    textAlign: "center",
                    margin: "4px 0px",
                    border: "2px solid grey",
                    borderRadius: "16px",
                  }}
                  value={localState[feature.key]}
                  onChange={(e) => {
                    setFeatureState(feature.key, e.target.value);
                  }}
                >
                  {feature.states.map((state) => (
                    <option key={state} value={state}>
                      {state}
                    </option>
                  ))}
                </select>
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );

  function setFeatureState(key: string, state: string) {
    updateFeature(key, state);
    setLocalState({ ...localState, [key]: state });
  }
}
