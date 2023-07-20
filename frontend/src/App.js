import logo from './logo.svg';
import './App.css';
import { createBrowserHistory } from 'history';
import { Switch, Router } from 'react-router-dom';

import { HomeTemplate } from './templates/HomeTemplate/HomeTemplate';
import Home from './pages/Home/Home';
import Contact from './pages/Contact/Contact';
import News from './pages/News/News';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Detail from './pages/Detail/Detail';
import { MovieTemplate } from './templates/HomeTemplate/MovieTemplate';
import CheckOutTemplate from './templates/CheckOutTemplate';
import Checkout from './pages/Checkout/Checkout';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';

import { Suspense, lazy } from 'react';
import UserTemplate from './templates/UserTemplate';
import Loading from './components/Loading/Loading';
import { AdminTemplate } from './templates/AdminTemplate';
import MovieMng from './pages/Admin/MovieMng/MovieMng';
import AddNew from './pages/Admin/MovieMng/AddNew';
import Edit from './pages/Admin/MovieMng/Edit';
import ShowTime from './pages/Admin/MovieMng/ShowTime';
import UserMng from './pages/Admin/UserMng/UserMng';
import UserEdit from './pages/Admin/UserMng/UserEdit';
import AddUser from './pages/Admin/UserMng/AddUser';
import Profile from './pages/Profile/Profile';
import {ProfileTemplate} from './templates/ProfileTemplate';
import OrderHistory from './pages/Admin/UserMng/OrderHistory';
import BannerMng from './pages/Admin/CarouselMng/AddCarousel';
import CarouselMng from './pages/Admin/CarouselMng/CarouselMng';
import AddCarousel from './pages/Admin/CarouselMng/AddCarousel';
import EditCarousel from './pages/Admin/CarouselMng/EditCarousel';
import TheatreMng from './pages/Admin/TheatreMng/TheatreMng';
import AddTheatre from './pages/Admin/TheatreMng/AddTheatre';
import TheatreEdit from './pages/Admin/TheatreMng/TheatreEdit';
import ThetreChildMng from './pages/Admin/TheatreChildMng/TheatreChildlMng';
import AddTheatreChild from './pages/Admin/TheatreChildMng/AddTheatreChild';
import NewsMng from './pages/Admin/NewsMng/NewsMng';
import AddNews from './pages/Admin/NewsMng/AddNews';
import NewsEdit from './pages/Admin/NewsMng/NewsEdit';
import NewsDetail from './pages/News/NewsDetail';

const CheckOutTemplateLazy = lazy(() => import('./templates/CheckOutTemplate'));

export const history = createBrowserHistory();

function App() {
  return (
    <Router history={history}>
      <Loading/>
      <Switch>
        <HomeTemplate path='/home' exact Component={Home} />
        <HomeTemplate path='/contact' exact Component={Contact} />
        <HomeTemplate path='/news' exact Component={News} />
        <HomeTemplate path='/news/detail/:id' exact Component={NewsDetail} />
        <MovieTemplate path='/detail/:id' exact Component={Detail} />
        <CheckOutTemplate path='/checkout/:id' exact Component={Checkout} />
        {/* <Suspense fallback={<h1>LOADING...</h1>}>
        <CheckOutTemplateLazy path='/checkout/:id' exact Component={Checkout}/>
      </Suspense> */}
        <UserTemplate path='/login' exact Component={Login} />
        <UserTemplate path='/register' exact Component={Register} />
        <ProfileTemplate path='/users' exact Component={Profile} />
        <ProfileTemplate path='/users/profile' exact Component={Profile} />
        <ProfileTemplate path='/users/edit/:id' exact Component={UserEdit} />
        <ProfileTemplate path='/users/ordershistory' exact Component={OrderHistory} />
        {/* <AdminTemplate path='/admin' exact Component={Dashboard} /> */}

        <AdminTemplate path='/admin' exact Component={UserMng} />
        <AdminTemplate path='/admin/users' exact Component={UserMng} />
        <AdminTemplate path='/admin/users/edit/:id' exact Component={UserEdit} />
        <AdminTemplate path='/admin/users/adduser' exact Component={AddUser} />

        <AdminTemplate path='/admin/moviemng' exact Component={MovieMng} />
        <AdminTemplate path='/admin/moviemng/addnew' exact Component={AddNew} />
        <AdminTemplate path='/admin/moviemng/edit/:id' exact Component={Edit} />
        <AdminTemplate path='/admin/moviemng/showtime/:id' exact Component={ShowTime} />

        <AdminTemplate path='/admin/carouselmng' exact Component={CarouselMng} />
        <AdminTemplate path='/admin/carouselmng/addnew' exact Component={AddCarousel} />
        <AdminTemplate path='/admin/carouselmng/edit/:id' exact Component={EditCarousel} />

        <AdminTemplate path='/admin/theatremng' exact Component={TheatreMng} />
        <AdminTemplate path='/admin/theatremng/addtheatre' exact Component={AddTheatre} />
        <AdminTemplate path='/admin/theatremng/edit/:id' exact Component={TheatreEdit} />

        <AdminTemplate path='/admin/theatrechildmng' exact Component={ThetreChildMng} />
        <AdminTemplate path='/admin/theatremng/addtheatrechild' exact Component={AddTheatreChild} />

        {/* tin tuc */}
        <AdminTemplate path='/admin/newsmng' exact Component={NewsMng} />
        <AdminTemplate path='/admin/newsmng/addnews' exact Component={AddNews} />
        <AdminTemplate path='/admin/newsmng/edit/:id' exact Component={NewsEdit} />

        <HomeTemplate path='/' exact Component={Home} />
        <HomeTemplate Component={Home} />
      </Switch>
    </Router>

  );
}

export default App;
