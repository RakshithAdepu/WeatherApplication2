import { Component } from "react";

import "./index.css";

class Cities extends Component {
  state = {
    delhiTemp: "",
    mumbaiTemp: "",
    puneTemp: "",
    fullDate: ""
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const date = new Date();
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const currentDate = date.getDate();
    const currentMonth = date.getMonth();
    const currentYear = date.getFullYear();
    const subYear = currentYear.toString().substr(-2);

    const hours = date.getHours();
    const dayNum = date.getDay();
    const day = days[dayNum];
    const minutes = date.getMinutes();

    const updatedMinute = minutes <= 9 ? `0${minutes}` : minutes;

    const updatedHours = hours <= 9 ? `0${hours}` : hours;
    const updatedDate = currentDate <= 9 ? `0${currentDate}` : currentDate;
    const updatedMonth =
      currentMonth <= 9 ? `0${currentMonth + 1}` : currentMonth + 1;

    const fullDate = `${updatedDate}/${updatedMonth}/${subYear}`;
    const time = `${updatedHours}:${updatedMinute}`;

    const responseDelhi = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m&forecast_days=1"
    );

    const dataDelhi = await responseDelhi.json();

    const delhiTemp = Math.ceil(dataDelhi.hourly.temperature_2m[hours]);

    const responseMumbai = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=19.07&longitude=72.88&hourly=temperature_2m&forecast_days=1"
    );

    const dataMumbai = await responseMumbai.json();

    const mumbaiTemp = Math.ceil(dataMumbai.hourly.temperature_2m[hours]);

    const responsePune = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=18.52&longitude=73.86&hourly=temperature_2m&forecast_days=1"
    );

    const dataPune = await responsePune.json();

    const puneTemp = Math.ceil(dataPune.hourly.temperature_2m[hours]);

    this.setState({ delhiTemp, mumbaiTemp, puneTemp, fullDate });
  };

  render() {
    const { delhiTemp, mumbaiTemp, puneTemp, fullDate } = this.state;

    return (
      <div>
        <h1 className="Cities_title">Cities</h1>
        <div className="cities_cont">
          <div className="cities_sub_cont">
            <div className="thunder">
              <h1 className="name_sign">Thunder</h1>
            </div>
            <div>
              <div className="cities_together_temp">
                <h1 className="cities_temp">{delhiTemp}</h1>
                <p className="cities_deg">o</p>
                <div className="cities_together_date">
                  <h1 className="cities_name">Delhi</h1>
                  <p className="cities_date">{fullDate}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cities_sub_cont">
            <div className="cloudy">
              <h1 className="name_sign">Cloudy</h1>
            </div>
            <div>
              <div className="cities_together_temp">
                <h1 className="cities_temp">{mumbaiTemp}</h1>
                <p className="cities_deg">o</p>
                <div className="cities_together_date">
                  <h1 className="cities_name">Goa</h1>
                  <p className="cities_date">{fullDate}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="cities_sub_cont">
            <div className="sunny">
              <h1 className="name_sign">Sunny</h1>
            </div>
            <div>
              <div className="cities_together_temp">
                <h1 className="cities_temp">{puneTemp}</h1>
                <p className="cities_deg">o</p>
                <div className="cities_together_date">
                  <h1 className="cities_name">Pune</h1>
                  <p className="cities_date">{fullDate}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Cities;
