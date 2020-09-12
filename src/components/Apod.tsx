import React, { useEffect, useRef, useState } from 'react';

import Button from './Button';
import { FAVORITES } from '../store/types/index';
import ModalComponent from './Modal';
import { startFetchApod } from '../store/actions/apod';
import { connect } from 'react-redux';

import formatDate from '../helper/formatDate';
import { startSetDateQuery } from '../store/actions/date';
// import Loader from './Loader';
// import Error from './Error/Error';

type ApodProps = {
  data: {
    title: string;
    copyright: string;
    date: string;
    media_type: string;
    url: string;
    hdurl: string;
    explanation: string;
  };
  disableButton: boolean;
  setDisabledButton: Function;
};

const Apod: React.FC<ApodProps> = ({
  data,
  disableButton,
  setDisabledButton,
  ...props
}) => {
  // if (!data) return <Loader />;
  const [showModal, setShowModal] = useState({
    state: false,
    variant: 'small',
    message: '',
  });

  const [queryDate, setQueryDate] = useState('');
  const [isFavorite, setIsFavorite] = useState(false);
  const buttonRef: React.MutableRefObject<undefined> = useRef(undefined);
  const checkDateDiff = () => {
    const date = new Date(queryDate);
    const today = new Date();
    if (!queryDate && today) {
      setDisabledButton(true);
    } else if (today.getDate() === date.getDate()) {
      setDisabledButton(true);
    }
  };

  useEffect(() => {
    checkDateDiff();
    checkIsFavorite(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [queryDate, isFavorite, data]);

  const checkIsFavorite = (data: any) => {
    let favorites: object[] = [];
    // check get item is the store
    let favoritesStore = localStorage.getItem(FAVORITES);

    if (favoritesStore === null) return;

    // item in the favorite store
    const storeData: string | null = localStorage.getItem(FAVORITES);

    favorites = storeData !== null && JSON.parse(storeData);

    const found = favorites.findIndex(
      (item: any) => item.title === data.title || item.url === data.url
    );

    found !== -1 ? setIsFavorite(true) : setIsFavorite(false);
  };

  const toggleFavorite = (data: any) => {
    let favorites: object[] = [];
    // check get item is the store
    let favoritesStore = localStorage.getItem(FAVORITES);

    if (favoritesStore === null) {
      favorites.push(data);
      localStorage.setItem(FAVORITES, JSON.stringify(favorites));
    } else {
      // item in the favorite store
      const storeData: string | null = localStorage.getItem(FAVORITES);

      favorites = storeData !== null && JSON.parse(storeData);

      // if item exist in the store
      const found: number = favorites.findIndex(
        (item: any) => item.title === data.title || item.url === data.url
      );

      // if item not in the store
      if (found === -1) {
        favorites.push(data);
        localStorage.setItem(FAVORITES, JSON.stringify(favorites));
        setShowModal({
          state: true,
          variant: 'small',
          message: 'Marked as Favourite',
        });

        setIsFavorite(true);
        (buttonRef.current as any).classList.add('button--marked');
      } else {
        //  remove from favorite
        favorites.splice(found, 1);
        localStorage.setItem(FAVORITES, JSON.stringify(favorites));
        setShowModal({
          state: true,
          variant: 'small',
          message: 'Unmarked as Favourite',
        });

        setIsFavorite(false);
        (buttonRef.current as any).classList.remove('button--marked');
      }
    }
  };

  const loadFromPreviousDay = () => {
    let day: number = new Date().getDate();

    if (!queryDate) {
      day -= 1;
      day = new Date().setDate(day);
    } else {
      const prevDay = new Date(queryDate).getDate();
      day = prevDay - 1;
      day = new Date().setDate(day);
    }
    const date = formatDate(new Date(day));
    setQueryDate(date);
    (props as any).dateQuery(date);

    setDisabledButton(false);
    (props as any).queryApod(date);
  };

  const loadFromNextDay = () => {
    let today: Date = new Date();
    let day: number = today.getDate();

    checkDateDiff();

    if (!queryDate) {
      day += 1;
      day = new Date().setDate(day);
    } else {
      const nextDay = new Date(queryDate).getDate();
      day = nextDay + 1;
      day = new Date().setDate(day);
    }
    const date = formatDate(new Date(day));
    setQueryDate(date);
    (props as any).dateQuery(date);
    (props as any).queryApod(date);
  };

  return (
    <div className='container-fluid'>
      <ModalComponent
        showModal={showModal.state}
        variant={showModal.variant}
        closeModal={() => {
          setShowModal({ ...showModal, state: false });
        }}
      >
        <h2 style={{ color: 'black' }}>{showModal.message}</h2>
      </ModalComponent>
      <aside className='brand-aside'>
        <h3>The Astronomical picture of the day</h3>
      </aside>
      <div className='apod'>
        <Button
          ClickHandler={() => toggleFavorite(data)}
          classes={
            isFavorite ? 'button--favorite button--marked' : 'button--favorite'
          }
          title='mark as favorite'
          customRef={buttonRef}
        >
          <i
            className={isFavorite ? 'fa fa-heart' : 'fa fa-heart-o '}
            aria-hidden='true'
          ></i>
          {/* fa-heart */}
        </Button>
        <div className='apod__media col-7'>
          {data && data.media_type === 'image' ? (
            <img src={data.url} className='media' alt={data.title} />
          ) : (
            <iframe
              title={data.title}
              src={data.url}
              frameBorder='0'
              // gesture="media"
              allow='encrypted-media'
              allowFullScreen
              className='media'
            />
          )}
        </div>

        <div className='apod__details col-4'>
          <h2 className='apod__title'> {data && data.title} </h2>
          <div style={{ position: 'relative' }}>
            <h3 className='apod__copyright'>
              {data && data.copyright} - <span>{data && data.date}</span>
            </h3>
            <p className='apod__explanation'>{data && data.explanation}</p>
            <div className='controls'>
              <Button
               key='s'
                ClickHandler={loadFromPreviousDay}
                classes='button--prev cursor-pointer'
              >
                Prev Day
              </Button>
              <Button
                disabled={disableButton}
                ClickHandler={loadFromNextDay}
                classes='button--next cursor-pointer'
              >
                Next Day
              </Button>
              {/* <Error /> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  queryApod: (date?: string) => dispatch(startFetchApod(date)),
  dateQuery: (date: string) => dispatch(startSetDateQuery(date)),
});

export default connect(undefined, mapDispatchToProps)(Apod);
