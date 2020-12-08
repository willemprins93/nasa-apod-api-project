import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { format } from "date-fns";
import "./Navigation.css";

const currentDate = Date.now();

const now = format(currentDate, "yyyy-MM-dd");

class Navigation extends Component {
  state = {
    date: "",
    lazyLoad: false,
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({
        lazyLoad: true,
      });
    }, 200);
  };

  handleChange = (e) => {
    const inputDate = e.target.value;

    this.setState({
      date: inputDate,
    });
  };

  goToday = (e) => {
    e.preventDefault();
    this.setState({
      lazyLoad: false,
    });
    setTimeout(() => {
      this.props.history.push("/today");
    }, 1000);
  };

  goYesterday = (e) => {
    e.preventDefault();
    this.setState({
      lazyLoad: false,
    });
    setTimeout(() => {
      this.props.history.push("/yesterday");
    }, 1000);
  };

  goDate = (e) => {
    e.preventDefault();
    this.setState({
      lazyLoad: false,
    });
    setTimeout(() => {
      this.props.history.push(`/${this.state.date}`);
    }, 1000);
  };

  render() {
    const { date, lazyLoad } = this.state;
    return (
      <div className={`navigation-container ${lazyLoad && "lazy-load"}`}>
        <h1>Astronomy Picture of the Day</h1>
        <div className="navigation">
          <Link onClick={this.goToday} className="nav-link" to="/today">
            Today
          </Link>
          <Link onClick={this.goYesterday} className="nav-link" to="/yesterday">
            Yesterday
          </Link>
          <input
            type="date"
            name="date"
            min="1995-06-16"
            max={now}
            value={date}
            onChange={this.handleChange}
          />
          <Link
            onClick={this.goDate}
            className={`date-submit ${date && "display"}`}
            exact
            to={"/" + date}
          >
            Go
          </Link>
        </div>
      </div>
    );
  }
}

export default withRouter(Navigation);
