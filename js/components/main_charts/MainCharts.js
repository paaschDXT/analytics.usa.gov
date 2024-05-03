import React from "react";
import PropTypes from "prop-types";

import RealtimeVisitors from "./RealtimeVisitors";
import LocationsAndLanguages from "./LocationsAndLanguages";
import Sessions30Days from "./Sessions30Days";
import Visitors30Days from "./Visitors30Days";
import Engagement from "./Engagement";
import TrafficSources from "./TrafficSources";
import DeviceDemographics from "./DeviceDemographics";
import TopPages from "./TopPages";
import TopDownloads from "./TopDownloads";

function MainCharts({ dataURL, dataPrefix, agency }) {
  const dataHrefBase = `${dataURL}/${dataPrefix}`;

  return (
    <>
      <section id="main_data" className="desktop:grid-col-8">
        <article className="chart-realtime">
          <RealtimeVisitors dataHrefBase={dataHrefBase} agency={agency} />
        </article>

        <article className="section">
          <LocationsAndLanguages dataHrefBase={dataHrefBase} />
        </article>

        <article className="section">
          <div className="section__headline">
            <h2>Historical Data and Trends</h2>
          </div>
        </article>

        <article className="section">
          <div className="section__headline">
            <h3>Daily Sessions in the Past 30 Days</h3>
          </div>
          <Sessions30Days dataHrefBase={dataHrefBase} />
        </article>

        <article className="section">
          <section className="section__subheader">
            <Visitors30Days dataHrefBase={dataHrefBase} />
          </section>
        </article>

        <article className="section">
          <section className="section__rate">
            <div className="grid-row">
              <Engagement dataHrefBase={dataHrefBase} />
            </div>
          </section>
        </article>

        <article className="section">
          <div className="section__headline">
            <h2>Top Traffic Sources in the Last 30 Days</h2>
          </div>

          <section className="section__chart">
            <div className="grid-row">
              <TrafficSources dataHrefBase={dataHrefBase} />
            </div>
          </section>
        </article>

        <article className="section">
          <div className="section__headline">
            <h2>User Device Demographics in the Last 30 Days</h2>
          </div>

          <section className="section__chart">
            <div className="grid-row">
              <DeviceDemographics dataHrefBase={dataHrefBase} />
            </div>
          </section>
        </article>
      </section>

      <section id="secondary_data" className="desktop:grid-col-4">
        <section>
          <TopPages dataHrefBase={dataHrefBase} />
        </section>
        <section className="top-downloads">
          <div className="top-downloads__headline">
            <h3>Top Downloads Yesterday</h3>
          </div>

          <h4>
            <em>Total file downloads yesterday on {agency} hostnames.</em>
          </h4>
          <TopDownloads dataHrefBase={dataHrefBase} />
        </section>
      </section>
    </>
  );
}

MainCharts.propTypes = {
  dataURL: PropTypes.string.isRequired,
  dataPrefix: PropTypes.string.isRequired,
  agency: PropTypes.string,
};

export default MainCharts;
