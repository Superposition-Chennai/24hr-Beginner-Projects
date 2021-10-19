// http://api.weatherapi.com/v1/current.json?key=c04f7782ee194fc0abb102426213107&q=Mumbai
import { inputsliceactions } from './input';
import { citydetailsliceactions } from './citydetail';

export const fetchdetail = (name) => {
  console.log('me',name)
  return async (dispatch) => {
    dispatch(inputsliceactions.setloading(true));

    const fetchdata = async () => {
      const res = await fetch(
        `https://api.weatherapi.com/v1/current.json?key=e0b53a0e6f624151a90110255210108&q=${name}`
      );
      console.log(res);

      if (!res.ok) {
        throw new Error('No Such Country Found');
      }
      const data = await res.json();
      console.log(data);
      return data;
    };

    fetchdata()
      .then((data) => {
        dispatch(citydetailsliceactions.seterrorr({ err: '' }));

        dispatch(
          citydetailsliceactions.setstate({
            icon: data.current.condition.icon,
            name: data.location.name,
            region: data.location.region,
            country: data.location.country,
            temp: data.current.temp_c,
            wind: data.current.wind_mph,
            humidity: data.current.humidity,
            precipitation: data.current.precip_mm,
            code: data.current.condition.code,
          })
        );

        dispatch(inputsliceactions.setloading(false));
      })
      .catch((err) => {
        dispatch(citydetailsliceactions.seterrorr({ err: 'Invalid location' }));

        dispatch(inputsliceactions.setloading(false));
      });
  };
};
