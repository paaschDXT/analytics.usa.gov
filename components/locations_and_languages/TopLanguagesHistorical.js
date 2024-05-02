import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import d3 from "d3";

import renderBlock from "../../js/lib/renderblock";
import transformers from "../../js/lib/transformers";

function TopLanguagesHistorical({ dataHrefBase }) {
  const dataURL = `${dataHrefBase}/language.json`;
  const ref = useRef(null);

  useEffect(() => {
    const initHistoricalLanguagesChart = async () => {
      const result = await d3
        .select(ref.current)
        .datum({
          source: dataURL,
          block: ref.current,
        })
        .call(
          renderBlock.buildBarChartWithLabel((d) => {
            // 1. filter out non-languages - (other)
            // 2. convert object into array of objects
            // 3. sort desc by visitors #

            const languages = d.totals.by_language;
            const keysToExclude = ["(other)"];
            const filteredLanguages = {};

            for (const key in languages) {
              if (!keysToExclude.includes(key)) {
                filteredLanguages[key] = languages[key];
              }
            }

            const languagesArray = [];
            for (const [key, value] of Object.entries(filteredLanguages)) {
              languagesArray.push({ language: key, visitors: value });
            }

            d.totals.by_language = languagesArray;

            const values = transformers.findProportionsOfMetric(
              d.totals.by_language,
              (list) => list.map((x) => x.visitors),
            );

            return values.slice(0, 10);
          }, "language"),
        );
      return result;
    };
    initHistoricalLanguagesChart().catch(console.error);
  }, []);

  return (
    <>
      <figure id="chart_top-languages" data-block="languages" ref={ref}>
        <div className="data bar-chart"></div>
      </figure>
    </>
  );
}

TopLanguagesHistorical.propTypes = {
  dataHrefBase: PropTypes.string.isRequired,
};

export default TopLanguagesHistorical;
