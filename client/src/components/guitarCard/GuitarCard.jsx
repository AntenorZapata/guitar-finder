import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import './GuitarCard.css';
import { FaGuitar, FaRegCalendarCheck } from 'react-icons/fa';
import { ImPriceTag } from 'react-icons/im';
// import fender from './2.jpg';

const gtImage = './2.jpg';

function GuitarCard({ guitar, favorite, handleDeleteFav }) {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token') || '';

  return (
    <div>
      {favorite ? (
        <div className="card card-fav">
          <MdFavorite onClick={() => handleDeleteFav(guitar._id)} className="fav-heart" />
          <div className="card__header">
            <div className="card__picture">
              <img
                src={`./images/${guitar.imageCover}`}
                alt="fender 1"
                className="card__picture-img"
              />
            </div>
            <h3 className="heading-tertirary heading-fav">
              <span>{`${guitar.brand} ${guitar.model}`}</span>
            </h3>
          </div>
        </div>
      ) : (
        <div>
          <div className="card">
            <div className="card__header">
              <div className="card__picture">
                <div className="card__picture-overlay">&nbsp;</div>
                <img
                  src={`./images/${guitar.imageCover}`}
                  alt="fender 1"
                  className="card__picture-img"
                />
              </div>
              <h3 className="heading-tertirary">
                <span>
                  {`${guitar.brand} ${guitar.model}`}
                </span>
              </h3>
            </div>

            <div className="card__details">
              <h4 className="card__sub-heading">{guitar.tags}</h4>
              <p className="card__text">
                {guitar.summary}
              </p>
              <div className="card__data">
                <FaGuitar className="card__icon">
                  <use xlinkHref="img/icons.svg#icon-map-pin" />
                </FaGuitar>
                <span>{guitar.country}</span>
              </div>
              <div className="card__data">
                <FaRegCalendarCheck className="card__icon">
                  <use xlinkHref="img/icons.svg#icon-calendar" />
                </FaRegCalendarCheck>
                <span>
                  {`Ano: ${guitar.year}`}
                </span>
              </div>

            </div>

            <div className="card__footer">
              <p>
                <span className="card__footer-value">
                  {`R$ ${guitar.price},00`}
                </span>
                {/* <span className="card__footer-text">per person</span> */}
              </p>
              <p className="card__ratings" />
              <Link
                to={`/guitarDetails/${guitar._id}`}
                className="btn-card"
              >
                Detalhes
              </Link>
            </div>
          </div>
        </div>

      )}

    </div>
  );
}

export default GuitarCard;
