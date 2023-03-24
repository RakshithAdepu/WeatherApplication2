import "./index.css";

const News = () => (
  <div>
    <h1 className="news_title">News</h1>
    <div className="news_cont">
      <div className="thunder_delhi">
        <h1 className="news_details">
          Thunder Stikes <br />
          Delhi
        </h1>
      </div>
      <div className="cloud_mainpur">
        <h1 className="news_details">
          Cloudstroms in <br />
          Mainpur
        </h1>
      </div>
      <div className="summer_mumbai">
        <h1 className="news_details">
          It's summer season
          <br />
          at Mumbai
        </h1>
      </div>
    </div>
  </div>
);

export default News;
