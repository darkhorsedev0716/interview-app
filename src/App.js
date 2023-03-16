import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CssBaseline } from '@mui/material';
import './App.css';
import AppFrame from './components/app-frame/AppFrame';
// import ThemeProvider from './providers/theme';
import RouteWithLayout from './components/routeWithLayout/RouteWithLayout';

import Dashboard from './views/Dashboard';
import SignIn from './views/SignIn';
import SignUp from './views/SignUp';
import OpenInterviews from './views/OpenInterviews';
import ClosedInterview from './views/ClosedInterviews'
import SharedInterview from './views/SharedInterviews'
import OnHoldInterview from './views/OnHoldInterviews'
import NewInterview from './views/NewInterview';
import InterviewDetails from './views/InterviewDetails';
import QuestionPool from './views/QuestionPool';
import QuestionCategories from './views/QuestionCategories';
import SystemUsers from './views/SystemUsers';
import NotVerified from './views/NotVerified';
import SharedInterviewReview from './views/SharedInterviewReview';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import CandidateInterview from './views/CandidateInterview';
import LinkInviteInterview from './views/LinkInviteInterview';
import InterviewReview from './views/InterviewReview';
import UpdatePassword from './views/UpdatePassword';
import ResetPassword from './views/ResetPassword';
import InterviewDetailsPublic from './views/InterviewDetailsPublic';
import AppThemeProvider from './providers/theme';

import Users from "./views/admin/Users";

function App() {
  return (
    <CssBaseline>
      <AppThemeProvider>
        <div className="App">
        <ReactNotification />
          <BrowserRouter>
            <AppFrame>
              <Routes>
                <Route exact path='/dashboard' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/dashboard' element={<Dashboard/>}/>
                </Route>
                <Route exact path='/' element={<RouteWithLayout access="public" restricted={true}/>}>
                  <Route exact path='/' element={<SignIn/>}/>
                </Route>
                <Route exact path='/sign-in' element={<RouteWithLayout access="public" restricted={true}/>}>
                  <Route exact path='/sign-in' element={<SignIn/>}/>
                </Route>
                <Route exact path='/sign-up' element={<RouteWithLayout access="public" restricted={true}/>}>
                  <Route exact path='/sign-up' element={<SignUp/>}/>
                </Route>
                <Route exact path='/interviews/open' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/interviews/open' element={<OpenInterviews/>}/>
                </Route>
                <Route exact path='/interviews/closed' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/interviews/closed' element={<ClosedInterview/>}/>
                </Route>
                <Route exact path='/interviews/on-hold' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/interviews/on-hold' element={<OnHoldInterview/>}/>
                </Route>
                <Route exact path='/interviews/shared' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/interviews/shared' element={<SharedInterview/>}/>
                </Route>
                <Route exact path='/interviews/shared-review/:id/:password' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/interviews/shared-review/:id/:password' element={<SharedInterviewReview/>}/>
                </Route>
                <Route exact path='/interviews/new' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/interviews/new' element={<NewInterview/>}/>
                </Route>
                <Route exact path='/interviews/:interviewId' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/interviews/:interviewId' element={<InterviewDetails/>}/>
                </Route>
                <Route exact path='/questions/' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/questions/' element={<QuestionPool/>}/>
                </Route>
                <Route exact path='/question-categories' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/question-categories' element={<QuestionCategories/>}/>
                </Route>
                <Route exact path='/interviews/:interviewId/candidate-interviews/:cInterviewId' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/interviews/:interviewId/candidate-interviews/:cInterviewId' element={<InterviewReview/>}/>
                </Route>
                <Route exact path='/candidate/invite/:token' element={<RouteWithLayout access="public"/>}>
                  <Route exact path='/candidate/invite/:token' element={<CandidateInterview />}/>
                </Route>
                <Route exact path='/interview/invite/:token' element={<RouteWithLayout access="public"/>}>
                  <Route exact path='/interview/invite/:token' element={<LinkInviteInterview />}/>
                </Route>
                <Route exact path='/update-password' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/update-password' element={<UpdatePassword/>}/>
                </Route>
                <Route exact path='/auth/resetPassword/:token' element={<RouteWithLayout access="public"/>}>
                  <Route exact path='/auth/resetPassword/:token' element={<ResetPassword />}/>
                </Route>
                <Route exact path='/interview/share/:id' element={<RouteWithLayout access="public"/>}>
                  <Route exact path='/interview/share/:id' element={<InterviewDetailsPublic />}/>
                </Route>
                <Route exact path='/system-users' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/system-users' element={<SystemUsers />}/>
                </Route>
                <Route exact path='/admin/users' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/admin/users' element={<Users />}/>
                </Route>
                <Route exact path='/not-verified' element={<RouteWithLayout access="private"/>}>
                  <Route exact path='/not-verified' element={<NotVerified />}/>
                </Route>
              </Routes>
            </AppFrame>
          </BrowserRouter>
        </div>
      </AppThemeProvider>
    </CssBaseline>
  );
}

export default App;
