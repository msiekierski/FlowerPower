import { makeStyles, Typography } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import FlowerShopPreviewCard, {
  FlowerShopPreviewCardProps,
} from '../../components/FlowerShopPreviewCard/FlowerShopPreviewCard';
import Menu from '../../components/Menu/Menu';
import CarouselItem from './CarouselItem/CarouselItem';
import { BsArrowRightSquare, BsArrowLeftSquare } from 'react-icons/bs';
import CustomCarousel from '../../components/CustomCarousel/CustomCarousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import apiShopListToState from '../../utils/objectMapping/apiShopListToState';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/root-reducer';

const useStyles = makeStyles((theme) => ({
  carouselContainer: {
    marginTop: '3%',
  },
  flowerShopsContainer: {
    display: 'flex',
    overflowX: 'auto',
  },
  [theme.breakpoints.down(theme.breakpoints.values.md)]: {
    flowerShopsContainer: {
      display: 'flex',
      overflowX: 'auto',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
      '-ms-overflow-style': 'none' /* IE and Edge */,
      'scrollbar-width': 'none' /* Firefox */,
    },
  },
  promotedStores: {
    marginTop: '20px',
    position: 'relative',
  },
  leftScrollIcon: {
    fontSize: '3rem',
    zIndex: 1000,
    position: 'absolute',
    left: '5%',
    top: '50%',
    opacity: '0.5',
  },
  rightScrollIcon: {
    position: 'absolute',
    right: '5%',
  },
}));

const MainPage = () => {
  const classes = useStyles();

  const [recommendedShops, setRecomenndedShops] = useState<
    Array<FlowerShopPreviewCardProps>
  >([]);

  const user = useSelector((state: RootState) => state.user.user);

  useEffect(() => {
    fetchShops();
  }, []);

  const fetchShops = async () => {
    let city = 'Wroclaw';
    if (user !== null && user.city !== null) {
      city = user.city!;
    }
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_ADDRESS}flowerPower/customer/get/shopList`,
        { params: { city: city } }
      );
      setRecomenndedShops(data.map((data: any) => apiShopListToState(data)));
    } catch (e) {
    }
  };

  const carouselLinks: Array<string> = [
    'https://lh3.googleusercontent.com/NigeC3XkrG_44HzJdCMYv0VTrt2DAslGoPYSvEe6l3MzA-T7hYUdACdgY25ikTJ676OJTWEmID8juCItSkscot4G8-hDNC7saQeFAwY58gejmVb7LkinzA8ekH17mZ65qgs0mw67EDI3ou_4JTc3S766BF5o0K2pAxAUzuvfXb5_N-0KnQgpp2JOiCB6fI0Fyhr7B5zBTgagzXI9kj0CKx8hXD0q05Ifdr-0Gd0_5L1BwYhaeF8qBFb7LHxf0nJ58mzPzaJ4JLPAqRt1xbnx5aDoecWJ0sAm95JYS1j7Zt5MAiz25jAqjnFDTFgt7ARRzg9tuaPdpNkI6-HZZNazQJ3YLTXvjxPF2woGbnI8ZKTbEfSfbmxSdYkSgnSKNmZZnVZwuknFCSu2OaT4KqeTRbaV5u-Wsx5idJJsjxOpX8-m9IkENayn-vjXVM9SxttSYZiWVvMa3algsbeZfOweJ9ShGYU3KooHz0r1ZvMgyomss4pRYltHXGr8WEu9D2tvVFuY92vogvoyPgkIi_Uwu50TNcos4Kuf_1te1SC5y06rlehsKzMy3Biww51j3kJUQk3YLpAqNYoFgAcqz1tkowTnXdrwjDdOkxNQb7ZvXNNjjasL8lu74YoTbm4Gfkl0O1lWCxp11XPDcGabE1fI_aw_erM0CRSvzUHhR88k_BYqK_9-nhLSbeM1o1uN6NDy_zDcJYW028ovIjexkMskVg=w1068-h696-no?authuser=4',
    'https://lh3.googleusercontent.com/pw/AM-JKLUCaColsFBNZ0Xwm0AtCMDNkAoN6Nzl8j8vSjNNf_ShI4yoWkN4Thqg-15IdUfcqIT4OV_-JRhhxCXO1RNyRMjulEpQ6R8sp74DtEXnVLPXI_8RBVdfz7_ApVwPU9itRWXaZ4pVxLFU7Y4wiICezJU=w967-h725-no',
    'https://lh3.googleusercontent.com/1F_hQIpLCPIBF6tZDsIlNs7BYuNFVeJZX8mgb30CpN4Nf5R0XgWzjy5PpW9snfx4TJinC-2EV-Jp20RuOve7TyeLoD0IEPign2OZBK6oo4Y97FQyXG0zPGm5jzsmvhw5w_ERy9R-ef1j-Y22oDCiz4dClUBI81IybHyl5hKrNAA8oFJoAKebrTvfluAE1-t-yP3LkXSEL_pEKapQJ3Eho2tlXBYL6GLmoXeNEzayeoPUssxIdPTpiBf3NPTdDeHLIDJSVEpZcfYg8M78hJSS2r_QKmIAIk65t04VaU4bzospqr7mmhoQxeypZuMZfhPrzim7xXJEJFGkBJb1Ef-3DhhryaNAJuIOihKWAFLHIIvgxKSvQCxCtluSgCViLLAO7xdwncvjFEb7g1li2zxz2Dp844OV8aRekpAGLKpJfbfDY1L1-gOze4wcsaqbEyqBXUjqcXbINxpJ6uZacGeGtsQX8QI_mJ7m2fuqZJ7h2CHG35gg_1VI3YDZh8e7ElVHUh8fe3A8XhsvEpnHwkFxIMreGPgsh8xJSwPrmE0e9J7vhGv5jKHzBAKURl7TwlvkYs11ZoCOE9SFUH2WDydHIPtNKgKJZkxaIlW-mLrih0GvptayQTj2_Fsl5ePxfJiSI1NZ6IU2Ekg2-NLrPmPnopfP-bLZmRj5HmYzjs2jCXxzOFqZeE5iAo-QY0iZaNUBbrqO-eI3PjJQEBW2RPE6DQ=w1050-h700-no?authuser=4',
    'https://lh3.googleusercontent.com/iHsU0hLgRmyrVOGF1ufwoAK2ni8EYVZ9XsTDu2vQKXbguGHxLtCqVH7LNYOU4Ban1SBnpjKnnWqqbh-qawjX3K8-YpVyCbA0tjLYm5KRAfk2td4Q8D8bheAwWGJwEXn55atuSi3VjxO_4ftYgpHmH4z4l2Frn81rllzezw8aAI26-Dthcnl1hUoD6uI6jpSZMMV2wQgqTKvw96yC8tgrF3E6R828ZccacQQxlN-XrTCPlFTo2k88oiDcdGmmeps0lVWVnYTDcEeBjevta5hWDcaCtNLgKvjXdsTb8_h9NQSB9IaK0a5yFflcX-P2MpRgmCTeVvfxudxP2hxKsTkfaIsHJFo527U2MRKkWkK624dd3W3HrEfcJMinL-vJCEDESeqWsNc6FWfkaZQs2RA-ikAe_LH7rWQUVfSdp-ERtWObz5RvECU7nQy1vpLccfMdicir23I_WI39UCjKC8TqIq_ui6yQ7JZfq1Jx1sw1JB_k-iVU9AfHgMzqjtQJgOJhhQlKaTTeqjfHcqtorpu5h5PMffYi0SX13NGk9PIeiktuW6W7xGAMWYncXQ2y7vrzWaH6OaJc5_S67R-1ihfCpBjFmLI2YkVM0QijFs5PG1GylODEFIt4uqR0bV9guTlU8D2BnAjhupA9UwcM7QdwRF5DqCd7WD1-2EtgFg5Q-AWR5uhVnax_RZinWFOL-Icf5ShtticrVz2Ew7BjjaSjJQ=w1053-h699-no?authuser=4',
  ];

  return (
    <>
      <Menu />
      <div className={classes.carouselContainer}>
        <Carousel animation="slide">
          {carouselLinks.map((item, i) => (
            <CarouselItem key={i} imageSource={item} />
          ))}
        </Carousel>
      </div>
      <div className={classes.promotedStores}>
        <Typography
          variant="h5"
          noWrap
          style={{ fontWeight: 'bold', textDecoration: 'underline' }}
        >
          Recommended Florists'
        </Typography>
        <CustomCarousel
          carouselComponents={recommendedShops.map((store, index) => (
            <FlowerShopPreviewCard key={index} {...store} />
          ))}
        />
      </div>
    </>
  );
};

export default MainPage;
