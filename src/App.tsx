import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';

import {
  startFetchApod,
  fetchApodFromLocalStorage,
} from './store/actions/apod';

import { PICOFTHEDAY } from './store/types/index';

import Header from './components/Header';
import Apod from './components/Apod';

import './styles/App.scss';
import 'react-datepicker/dist/react-datepicker.css';
// import Loader from './components/Loader';
import Error from './components/Error/Error';
// import Modal from './components/Modal';
import formatDate from './helper/formatDate';
import Loader from './components/Loader';

function App(props: any) {
  const [loading, setLoading] = useState(true);
  let [date, setDate] = useState(new Date());
  const [disableButton, setDisableButton] = useState(false);

  const today: string = formatDate(date);

const disableButtonNext = (dateData:any) => {
  // console.log('ssas',new Date(Date.now()).toISOString().slice(0, 10))
  console.log('a',dateData)
   if (parseInt(dateData) >= Date.now() || ( dateData === new Date(Date.now()).toISOString().slice(0, 10) )) {
      setDisableButton(true)
   }  else {
    setDisableButton(false)
  }
  // setDisableButton(false)
}


  useEffect(() => {
    loadPictureOfTheDay();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  const loadPictureOfTheDay = async () => {
    try {
      return await new Promise((resolve) => {
        resolve(loadPicture());
        
      });
    } catch (error) {
      setLoading(false)
    }
  
  };

  const loadPicture = async () => {
   
       // load picture of the day from local storage
    let picOfTheDay: any = localStorage.getItem(PICOFTHEDAY);

    if (
     picOfTheDay === null  ||
      new Date().getDate() !== new Date(today).getDate()  || localStorage.getItem(PICOFTHEDAY) === "undefined" ||  JSON.parse(picOfTheDay).code !== 200
    ) {
      console.log('Fetching From Api...');
      props.fetchApod(today).then((result: any) => {
        disableButtonNext(result.date)
        if (
          date.getDate() === new Date().getDate() &&
          typeof result !== undefined
        ) {
          localStorage.setItem(PICOFTHEDAY, JSON.stringify(result));
          setLoading(false);
        }
      })
    }  else if (
      new Date().getDate() -
        new Date(JSON.parse(picOfTheDay).date).getDate() ===
      0
    ) {
      console.log('Fetching From Store...');
      picOfTheDay = JSON.parse(picOfTheDay);
      props.fetchFromStore(picOfTheDay);
      setLoading(false);
    }
   
   
  };

  // props.apod &&  (props.apod.error || !props.apod.data)
  //   <Error
  //   errorMessage={props.apod.error}
  //   onClick={() => window.location.reload()}
  //   actionTitle='refresh'
  // />

  if (loading) {
    return <Loader />;
  } else {
    return (
      <div className='padding-left-right'>
        {/* {JSON.stringify(props.apod)} */}
        {props.apod && (props.apod.error || !props.apod.data) ? (
          <div>
              <Header
              disableButtonNext={disableButtonNext}
              disableButton={disableButton}
              setDisabledButton={setDisableButton}
              date={date}
              setDate={setDate}
            />
          <div className='center-flex'>
            
            <Error
              errorMessage={props.apod.error}
              onClick={() => window.location.reload()}
              actionTitle='refresh'
            />

          
          </div>
          </div>
        ) : (
          <div className='padding-left-right'>
            <Header
              disableButtonNext={disableButtonNext}
              disableButton={disableButton}
              setDisabledButton={setDisableButton}
              date={date}
              setDate={setDate}
            />
            
            <Apod
            //  date={date}
              disableButton={disableButton}
              setDisabledButton={setDisableButton}
              data={props.apod.data}
            />
          </div>
        )}
      </div>
    );
  } //
}

const mapStateToProps = (state: any) => ({
  apod: state,
});

const mapDispatchToProps = (dispatch: any) => ({
  fetchApod: (date?: string) => dispatch(startFetchApod(date)),
  fetchFromStore: (data: object) => dispatch(fetchApodFromLocalStorage(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
