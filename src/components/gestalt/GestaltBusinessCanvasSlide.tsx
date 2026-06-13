import { BusinessCanvasMap, canvasVariantLabel } from "@/components/fw-vision";
import { bmcEraAi } from "./data/bmc-era-ai";

export function GestaltBusinessCanvasSlide() {
  const variant = bmcEraAi.variant ?? "traditional";

  return (
    <div className="gestalt-business-canvas">
      <div className="gestalt-business-canvas__label-row">
        <span className="gestalt-business-canvas__scenario">AI Inflection — Startup Rush</span>
        <span className="gestalt-business-canvas__variant">{canvasVariantLabel(variant)}</span>
      </div>
      <div className="gestalt-business-canvas__chart">
        <BusinessCanvasMap data={bmcEraAi} variant={variant} />
      </div>
    </div>
  );
}

export default GestaltBusinessCanvasSlide;
