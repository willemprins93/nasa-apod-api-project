import React, { useState, useEffect } from "react";
import { Link, withRouter } from "react-router-dom";
import { format } from "date-fns";
import { getAPOD } from "../../services/nasaService";
import "./PictureCard.css";

const PictureCard = (props) => {
  const [apod, setAPOD] = useState({});
  const [lazyLoad, setLazy] = useState(false);
  const [fullSizeToggle, setToggle] = useState("hidden");

  let date = "";

  if (props.match.params.date) {
    date = props.match.params.date;
  } else if (props.match.path === "/today") {
    date = format(Date.now(), "yyyy-MM-dd");
  } else if (props.match.path === "/yesterday") {
    date = format(new Date(Date.now() - 864e5), "yyyy-MM-dd");
  }

  const prevDate = format(
    new Date(
      parseInt(date.substr(0, 4)),
      parseInt(date.substr(5, 2)) - 1,
      parseInt(date.substr(8, 2)) - 1
    ),
    "yyyy-MM-dd"
  );

  const nextDate = format(
    new Date(
      parseInt(date.substr(0, 4)),
      parseInt(date.substr(5, 2)) - 1,
      parseInt(date.substr(8, 2)) + 1
    ),
    "yyyy-MM-dd"
  );

  let today = false;
  const currentDate = format(Date.now(), "yyyy-MM-dd");
  if (
    currentDate === props.match.url.substr(1) ||
    props.match.path === "/today"
  ) {
    today = true;
  }

  useEffect(() => {
    getAPOD(date)
      .then((res) => {
        setTimeout(() => {
          setLazy(true);
        }, 200);
        setAPOD(res);
      })
      .catch((err) => console.error);
  }, [date]);

  const toggleFullSize = (e) => {
    e.preventDefault();
    const view = fullSizeToggle === "hidden" ? "display" : "hidden";
    setToggle(view);
  };

  const fadeOut = (e) => {
    e.preventDefault();
    setLazy(false);
    setTimeout(() => {
      props.history.push("/");
    }, 1000);
  };

  const fadePrev = (e) => {
    e.preventDefault();
    setLazy(false);
    setTimeout(() => {
      props.history.push(`/${prevDate}`);
    }, 1000);
  };

  const fadeNext = (e) => {
    e.preventDefault();
    setLazy(false);
    setTimeout(() => {
      props.history.push(`/${nextDate}`);
    }, 1000);
  };

  return (
    <>
      <h2 className="heading">Astronomy Picture of the Day: {apod.date}</h2>
      <nav className="control-nav">
        <div className="controls-box">
          <Link onClick={fadePrev} className="controls" to={`/${prevDate}`}>
            Previous
          </Link>
        </div>
        <hr className="controls-divider" />
        <div className="controls-box">
          <Link onClick={fadeOut} className="controls" to={`/`}>
            Home
          </Link>
        </div>
        <hr className="controls-divider" />
        <div className="controls-box">
          {!today && (
            <Link onClick={fadeNext} className="controls" to={`/${nextDate}`}>
              Next
            </Link>
          )}
        </div>
      </nav>
      <div className="picture-card">
        <p className="title">Astronomy Picture of the Day: {date}</p>
        <div className="img-box">
          <a href="" onClick={toggleFullSize}>
            <img
              className={`picture ${lazyLoad && "lazy-load"}`}
              src={apod && apod.url}
              alt={apod && apod.title}
            />
          </a>
        </div>
        <a href="" onClick={toggleFullSize} className={`${fullSizeToggle}`}>
          <div className={`fullsize-wrapper`}>
            <div
              className="fullsize-img"
              style={{ backgroundImage: `url(${apod.url})` }}
            />
          </div>
        </a>
        <h1 className={`title ${lazyLoad && "lazy-load"}`}>
          {apod && apod.title}
        </h1>
        {apod.copyright && (
          <>
            <p className={`copyright-logo ${lazyLoad && "lazy-load"}`}>© </p>
            <p className={`copyright ${lazyLoad && "lazy-load"}`}>
              {apod && apod.copyright}
            </p>
          </>
        )}
        <p className={`date ${lazyLoad && "lazy-load"}`}>{apod && apod.date}</p>
        <p className={`description && ${lazyLoad && "lazy-load"}`}>
          {apod && apod.explanation}
        </p>
      </div>
    </>
  );
};

export default withRouter(PictureCard);
