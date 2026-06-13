import { StrategyMapQuadrant } from "@/components/fw-vision";
import { evolvingStrategyDdes } from "./data/evolving-strategy-ddes";

const BAND_WEIGHTS: readonly [number, number, number, number] = [
  0.42, 0.22, 0.2, 0.16,
];

const JUNE_2026_VERSION = "v3-jun-2026";

export function GestaltStrategyMapSlide() {
  const version =
    evolvingStrategyDdes.versions.find((v) => v.id === JUNE_2026_VERSION) ??
    evolvingStrategyDdes.versions[evolvingStrategyDdes.versions.length - 1]!;

  return (
    <div className="gestalt-strategy-map">
      <div className="gestalt-strategy-map__caption">
        <span className="gestalt-strategy-map__caption-label">{version.label}</span>
        <span className="gestalt-strategy-map__caption-question">{version.compellingQuestion}</span>
      </div>
      <div className="gestalt-strategy-map__chart">
        <StrategyMapQuadrant
          data={evolvingStrategyDdes}
          activeVersionId={JUNE_2026_VERSION}
          bandRadialWeights={BAND_WEIGHTS}
        />
      </div>
    </div>
  );
}

export default GestaltStrategyMapSlide;
