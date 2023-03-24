import { Component } from "react";

import Cities from "../Cities";

import Search from "../Search";
import News from "../News";
import "./index.css";
import Footer from "../Footer";

class Home extends Component {
  state = {
    cloudy: "",
    humidity: "",
    wind: "",
    temperature: "",
    time: "",
    day: "",
    fullDate: "",
    hours: ""
  };

  componentDidMount() {
    this.getData();
  }

  getData = async () => {
    const response = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=18.83&longitude=78.72&hourly=temperature_2m,relativehumidity_2m,cloudcover,windspeed_10m&forecast_days=1"
    );

    const data = await response.json();

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

    const humidity = data.hourly.relativehumidity_2m[hours];
    const cloudy = data.hourly.cloudcover[hours];
    const wind = data.hourly.windspeed_10m[hours];
    const temperature = data.hourly.temperature_2m[hours];
    this.setState({
      humidity,
      wind,
      cloudy,
      temperature,
      time,
      day,
      fullDate,
      hours
    });
  };

  renderDay = () => {
    const {
      wind,
      cloudy,
      humidity,
      temperature,
      time,
      day,
      fullDate
    } = this.state;

    const aroundTemperature = Math.ceil(temperature);

    return (
      <div className="background_image_day">
        <nav className="nav_bar">
          <p className="home_nav">Home</p>
          <p>Cities</p>
          <p className="news_nav">News</p>
        </nav>
        <div className="weather_score_cont">
          <h1 className="weather_details_heading">Weather Details</h1>
          <div className="weather_details_flex">
            <p className="weather_dea_para">Cloudy</p>
            <p className="weather_dea_para">{cloudy}%</p>
          </div>
          <div className="weather_details_flex">
            <p className="weather_dea_para">Humidity </p>
            <p className="weather_dea_para">{humidity}%</p>
          </div>
          <div className="weather_details_flex">
            <p className="weather_dea_para">Wind</p>
            <p className="weather_dea_para">{wind}km/h</p>
          </div>
        </div>
        <div className="tempertaure_cont">
          <h1 className="temperature">{aroundTemperature}</h1>
          <p className="degree">o</p>
          <div className="location">
            <h1>Hyderabad</h1>
            <div className="timings">
              <p className="temperature_para">{time}</p>
              <p>{day}</p>
              <p className="temperature_para">{fullDate}</p>
            </div>
          </div>
          <img
            className="sun_logo"
            src="https://res.cloudinary.com/dvm3hga6j/image/upload/v1679574669/wb-sunny_1_1x_mnxinw.svg"
            alt="sun_logo"
          />
        </div>
      </div>
    );
  };

  renderNight = () => {
    const {
      wind,
      cloudy,
      humidity,
      temperature,
      time,
      day,
      fullDate
    } = this.state;

    const aroundTemperature = Math.ceil(temperature);

    return (
      <div className="background_image_night">
        <nav className="nav_bar">
          <p className="home_nav">Home</p>
          <p>Cities</p>
          <p className="news_nav">News</p>
        </nav>
        <div className="weather_score_cont">
          <h1 className="weather_details_heading">Weather Details</h1>
          <div className="weather_details_flex">
            <p className="weather_dea_para">Cloudy</p>
            <p className="weather_dea_para">{cloudy}%</p>
          </div>
          <div className="weather_details_flex">
            <p className="weather_dea_para">Humidity </p>
            <p className="weather_dea_para">{humidity}%</p>
          </div>
          <div className="weather_details_flex">
            <p className="weather_dea_para">Wind</p>
            <p className="weather_dea_para">{wind}km/h</p>
          </div>
        </div>
        <div className="tempertaure_cont">
          <h1 className="temperature">{aroundTemperature}</h1>
          <p className="degree">o</p>
          <div className="location">
            <h1>Hyderabad</h1>
            <div className="timings">
              <p className="temperature_para">{time}</p>
              <p>{day}</p>
              <p className="temperature_para">{fullDate}</p>
            </div>
          </div>
          <img
            className="sun_logo"
            src="https://res.cloudinary.com/dvm3hga6j/image/upload/v1679578465/moon-4-64_oy2lgt.ico"
            alt="moon_logo"
          />
        </div>
      </div>
    );
  };

  render() {
    const { hours } = this.state;

    return (
      <div>
        {hours <= 18 && hours >= 6 ? this.renderDay() : this.renderNight()}
        <Cities />
        <Search />
        <News />
        <Footer />
      </div>
    );
  }
}

export default Home;
