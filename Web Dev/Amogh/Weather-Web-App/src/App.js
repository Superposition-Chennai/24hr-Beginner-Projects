import React from 'react';
import styles from './App.module.css';
import Input from './components/Input';
import { useSelector, useDispatch } from 'react-redux';
import Loading from './components/Loading';
import {
  FaWind,
  FaCloudRain,
  FaCloudShowersHeavy,
  FaToggleOn,
} from 'react-icons/fa';
import { useState } from 'react';
function App() {
  const [toggle, settoggle] = useState(false);
  const dispatch = useDispatch();
  const {
    details: {
      icon,
      name,
      region,
      country,
      temp,
      wind,
      humidity,
      precipitation,
      code,
    },
    error,
  } = useSelector((state) => state.city);
  // dispatch(inputsliceactions.setloading(true));
  const { value, loading } = useSelector((state) => state.input);

  const togglehandler = () => {
    settoggle((prevstate) => !prevstate);
  };

  return (
    <div className={`${styles.main} ${toggle ? styles.dark : ''}`}>
      <div>
        <Input toggle={toggle}/>
      </div>
      <div
        className={` ${styles['container']} ${
          code === 1000 && toggle===false ? styles['clear-container'] : (toggle===true?styles['dark-container']:'')
        } `}
      >
        {/* <div className={styles['back']}> */}
        {value.length === 0 && !loading && (
          <p className={styles.msg}>Enter some City Name and Press submit</p>
        )}
        {loading && <Loading />}
        {error.length > 0 && !loading && <p>{error}</p>}
        {error.length === 0 && !loading && value.length > 0 && (
          <>
            {' '}
            <div className={styles['details']}></div>
            <img alt="" src={icon} />
            <p className={styles.temp}>{temp}°C</p>
            <p style={{ margin: '27px 0px',fontSize:'19px' }}>{name}</p>
            <div className={styles.row}>
              <div className={styles['elements']}>
                <FaWind />
                <p className={styles.p}>Wind</p>
                <p className={styles.info}>{wind}</p>
              </div>
              <div className={styles['elements']}>
                <FaCloudShowersHeavy />
                <p className={styles.p}>Humidity</p>
                <p className={styles.info}>{humidity}</p>
              </div>
              <div className={styles['elements']}>
                <FaCloudRain />
                <p className={styles.p}>Precipitation</p>
                <p className={styles.info}>{precipitation}</p>
              </div>
            </div>
          </>
        )}
        {/* </div> */}
      </div>
      <button class={` ${styles['button']} ${
          toggle ? styles['toggle-light'] : styles['toggle']
        } `} onClick={togglehandler}>Toggle</button>
    </div>
  );
}

export default App;
