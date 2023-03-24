import { Component } from "react";

import "./index.css";

class Search extends Component {
  state = { inputValue: "", aroundTemperature: "", name: "", result: false };

  onChangeSearch = (event) => {
    this.setState({ inputValue: event.target.value });
  };

  onSubmitSearch = async () => {
    const { inputValue } = this.state;
    const url = `https://geocoding-api.open-meteo.com/v1/search?name=${inputValue}&count=1`;

    const response = await fetch(url);

    const data = await response.json();

    const latitude = data.results[0].latitude.toFixed(2);
    const longitude = data.results[0].longitude.toFixed(2);
    const name = data.results[0].name;
    const urlPlace = `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&hourly=temperature_2m&forecast_days=1`;
    const resp = await fetch(urlPlace);

    const dataSearch = await resp.json();
    const date = new Date();
    const hours = date.getHours();
    const temperature = dataSearch.hourly.temperature_2m[hours];
    const aroundTemperature = Math.ceil(temperature);

    this.setState({ aroundTemperature, name });
    this.setState({ result: true });
  };

  render() {
    const { inputValue, aroundTemperature, name, result } = this.state;

    return (
      <>
        <div className="input_cont">
          <input
            onChange={this.onChangeSearch}
            type="search"
            value={inputValue}
            placeholder="Serach City"
            className="input_search"
          />
          <button
            type="button"
            className="button_input"
            onClick={this.onSubmitSearch}
          >
            <img
              src="https://res.cloudinary.com/dvm3hga6j/image/upload/v1679647137/search_11_search_epu4dh.png"
              alt="search_logo"
            />
          </button>
        </div>
        <div className="earch_cont">
          <div className="earch_img">
            {result ? (
              <div className="result_cont">
                <h1 className="tempet_search">
                  temperature details <br />@{name}:{aroundTemperature}
                </h1>
              </div>
            ) : (
              ""
            )}
          </div>
        </div>
      </>
    );
  }
}

export default Search;
