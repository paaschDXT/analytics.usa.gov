import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import d3 from "d3";

import barChart from "../../lib/chart_helpers/barchart";
import formatters from "../../lib/chart_helpers/formatters";
import renderBlock from "../../lib/chart_helpers/renderblock";
import transformers from "../../lib/chart_helpers/transformers";

function DevicesChart({ dataHrefBase }) {
  const dataURL = `${dataHrefBase}/devices.json`;
  const ref = useRef(null);

  useEffect(() => {
    const initDevicesChart = async () => {
      const result = await d3
        .select(ref.current)
        .datum({
          source: dataURL,
          block: ref.current,
        })
        .call(
          renderBlock
            .loadAndRender()
            .transform((d) => {
              const devices = transformers.listify(d.totals.by_device);
              devices.forEach((device) => {
                if (device.key === "smart tv") {
                  device.key = "Smart TV";
                }
              });
              return transformers.findProportionsOfMetricFromValue(devices);
            })
            .render(
              barChart()
                .value((d) => d.proportion)
                .format(formatters.floatToPercent),
            ),
        );
      return result;
    };
    initDevicesChart().catch(console.error);
  }, []);

  return (
    <figure id="chart_device_types" ref={ref}>
      <div className="data bar-chart"></div>
    </figure>
  );
}

DevicesChart.propTypes = {
  dataHrefBase: PropTypes.string.isRequired,
};

export default DevicesChart;
