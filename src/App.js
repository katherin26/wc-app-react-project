import React from "react";
import "bulma/css/bulma.css";
import "./App.css";
import Header from "./components/Header";
import Banner from "./components/Banner";
import SearchBar from "./components/SearchBar";
import ResultList from "./components/ResultList";
import Footer from "./components/Footer";
import PaperRoll from "./components/PaperRoll";
import ViewMoreBtn from "./components/ViewMoreBtn";
import SadPaper from "./components/SadPaper";
import Form from "./components/form/Form";

import { search, searchByCoordinates } from "./services/api";
import { getCurrentLocation } from "./services/geolocation";

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.searchMode = null;
    this.recordsBuffer = [];
    this.params = null;

    this.state = {
      records: [],
      status: null,
      showAddRestroomForm: false,
    };
  }

  async handleSearch(searchType, options) {
    if (this.state.status === "LOADING") return;
    this.reset();

    if (searchType === "TEXT") await this.textSearch(options);
    if (searchType === "LOCATION") await this.locationSearch(options);
  }

  async textSearch(options) {
    if (!options.inputValue) return;
    this.searchMode = "TEXT";
    this.params = {
      query: options.inputValue,
      ada: options.ada,
      unisex: options.unisex,
      changingTable: options.changingTable,
      page: 1,
    };

    await this.loadRecords();
  }

  async locationSearch(options) {
    this.reset();
    this.searchMode = "LOCATION";

    const coordinates = await getCurrentLocation(navigator);
    if (coordinates) {
      this.params = {
        lat: coordinates.latitude,
        lng: coordinates.longitude,
        ada: options.ada,
        unisex: options.unisex,
        changingTable: options.changingTable,
        page: 1,
      };

      await this.loadRecords();
    } else {
      this.setState({ status: "NO_LOCATION" });
    }
  }

  async loadRecords() {
    this.setState({ status: "LOADING" });

    let result;
    switch (this.searchMode) {
      case "TEXT":
        result = await search(this.params);
        break;
      case "LOCATION":
        result = await searchByCoordinates(this.params);
        break;
      default:
        result = { records: [] };
    }

    if (!result.records.length) this.setState({ status: "NO_DATA" });
    else {
      await this.delay();
      this.recordsBuffer.push(...result.records);
      this.params.page = result.nextPage;
      this.setState({
        status: "DATA",
        records: this.state.records.concat(this.recordsBuffer.splice(0, 10)),
      });
    }
  }

  async loadMore() {
    this.setState({ status: "LOADING" });

    if (this.recordsBuffer.length < 10) {
      let result;

      switch (this.searchMode) {
        case "TEXT":
          result = await search(this.params);
          break;
        case "LOCATION":
          result = await searchByCoordinates(this.params);
          break;
        default:
          result = { records: [] };
      }

      if (!result.records.length) this.setState({ status: "DONE" });
      else {
        this.recordsBuffer.push(...result.records);
        this.params.page = result.nextPage;
        await this.delay();
        this.setState({ status: "DATA" });
        this.setState({
          records: this.state.records.concat(this.recordsBuffer.splice(0, 10)),
        });
      }
    } else {
      await this.delay();
      this.setState({ status: "DATA" });
      this.setState({
        records: this.state.records.concat(this.recordsBuffer.splice(0, 10)),
      });
    }
  }

  delay() {
    return new Promise((resolve, reject) => {
      setTimeout(resolve, 3000);
    });
  }

  reset() {
    this.searchMode = null;
    this.recordsBuffer = [];
    this.params = null;
    this.setState({ records: [], status: null });
  }

  render() {
    return (
      <div className="App">
        <Header
          handleClickOnNewRestroom={() =>
            this.setState({ showAddRestroomForm: true })
          }
        />
        <Banner />
        <Form
          title="Add Restroom"
          showModal={this.state.showAddRestroomForm}
          handleClickOnBtn={() => this.setState({ showAddRestroomForm: false })}
        />
        <SearchBar
          searchHandler={this.handleSearch.bind(this)}
          isLoading={this.state.status === "LOADING"}
        />
        {this.state.records.length ? (
          <ResultList records={this.state.records} />
        ) : (
          ""
        )}

        {this.state.status === "LOADING" ? <PaperRoll interval={1000} /> : ""}
        {this.state.status === "DATA" ? (
          <ViewMoreBtn clickHandler={this.loadMore.bind(this)} />
        ) : (
          ""
        )}
        {this.state.status === "DONE" ? (
          <SadPaper message="You ran out of paper" />
        ) : (
          ""
        )}
        {this.state.status === "NO_DATA" ? (
          <SadPaper message="Sorry, no restrooms found" />
        ) : (
          ""
        )}
        {this.state.status === "NO_LOCATION" ? (
          <SadPaper message="Unable to get your location" />
        ) : (
          ""
        )}
        <Footer />
      </div>
    );
  }
}
