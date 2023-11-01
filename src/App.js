import 'bootstrap/dist/css/bootstrap.min.css';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider, useLocation } from 'react-router-dom';
import Home from './components/pages/Home/Index.js';

import Login from './components/loginForm/LoginContextProviderInterface.js';
import SpSignUp from './components/loginForm/ServiceProviderSignupContextProviderInterface.js';
import CustSignUp from './components/loginForm/CustomerSignupContextProviderInterface.js';
import AdvertiserSignUp from './components/loginForm/AdvertiserSignupContextProviderInterface.js';
import ViewServices from './components/pages/User/ViewServices.js';
import ViewServicesJobs from './components/pages/User/ViewServicesJob.js';
import ServicePage from './components/pages/User/ServicePage.js';
import ServicePageJob from './components/pages/User/ServicePageJob.js';
import ResetPasswordContextProviderInterface from './components/loginForm/ResetPasswordContextProviderInterface.js';
import Review from './components/pages/User/Admin/ViewReviewandRating.js';

import CreateAd from './components/pages/advertiser/Dashboard/CreateAd.js';
import AdsPage from './components/pages/advertiser/AdsPage.js';
import AdDashbord from './components/pages/advertiser/Dashboard/AdDashboard.js';
import ViewAd from './components/pages/advertiser/ViewAd.js';
import ViewThread from './components/pages/Forum/ViewThread/ViewThread.js';
import About from './components/pages/User/About/Index.js';
import AdvertiserChat from './components/pages/User/Chat/ChatPage.js';
import Subscribtion from "./components/pages/advertiser/Dashboard/Subscription/subscription.js";
import Ads from "./components/pages/advertiser/Dashboard/Ads/Index.js";
import EditAd from "./components/pages/advertiser/Dashboard/EditAd.js";
import Subscriped from "./components/pages/advertiser/Dashboard/Subscription/subscribed.js";
import SubscripetionIndex from "./components/pages/advertiser/Dashboard/Subscription/Index.js";

import SpDashboard from './components/pages/ServiceProvider/SpDashboard/Index.js';
import SpViewJobs from './components/pages/ServiceProvider/ViewJobs/Index.js';
import SpViewVacancies from './components/pages/ServiceProvider/ViewVacancies/Index.js';
import SpApplyVacancy from './components/pages/ServiceProvider/ApplyVacancy/Index.js';
import SpServices from './components/pages/ServiceProvider/MyServices/index.js';
import SpViewAJob from './components/pages/ServiceProvider/ViewAJob/Index.js';
import SpViewAVacancy from './components/pages/ServiceProvider/ViewAVacancy/Index.js';
import SpAddNewServices from './components/pages/ServiceProvider/AddNewServices/Index.js';
import SpCreateBlog from './components/pages/ServiceProvider/CreateABlog/Index.js';
import SpCreateTrainingSession from './components/pages/ServiceProvider/CreateTrainingSession/Index.js';
import SpMyProjectsJobs from './components/pages/ServiceProvider/MyProjectsJobs/Index.js';
import SpMyProjectsVacancies from './components/pages/ServiceProvider/MyProjectsVacancies/Index.js';
import SpViewTrainingSessions from './components/pages/ServiceProvider/ViewTrainingSessions/Index.js';
import SpViewATrainingSession from './components/pages/ServiceProvider/ViewATrainingSession/Index.js';
import SpMyProjectStates from './components/pages/ServiceProvider/MyProjectStates.js';
import SpOngoingJob from './components/pages/ServiceProvider/OngoingJob/Index.js';
import SpAcceptedVacancy from './components/pages/ServiceProvider/AcceptedVacancy/Index.js';
import SpStartJob from './components/pages/ServiceProvider/StartJob/Index.js';
import SpAvailabilityCalendar from './components/pages/ServiceProvider/AvailabilityCalendar/Index.js';
import SpMyTrainingSessions from './components/pages/ServiceProvider/MyTrainingSessions/Index.js';
import SpViewHistory from './components/pages/ServiceProvider/ViewHistory/Index.js';
import SpPendingJob from './components/pages/ServiceProvider/PendingJob/Index.js';
import SpOngoingVacancy from './components/pages/ServiceProvider/OngoingVacancy/Index.js';
import SpViewJobsHome from './components/pages/User/ViewAjob.js';
import SpChat from './components/pages/User/Chat/ChatPage.js';
import SpViewAserviceJob from './components/pages/User/ViewAjob.js';
import CreateQuotation from './components/pages/ServiceProvider/CreateQuotation/Index.js';
import SpCompletedJobs from './components/pages/ServiceProvider/CompletedJob/Index.js';
import SpCompletedVacancies from './components/pages/ServiceProvider/CompletedVacancy/Index.js';
import TrainingSessionVerification from './components/pages/ServiceProvider/TrainingSessionVerification.js';
import SpComplaints from './components/pages/ServiceProvider/SpComplaints/index.js';

import RootLayout from './components/layout/RootLayout.js';
import SpLayout from './components/layout/SpLayout.js';
import AdvertiserLayout from './components/layout/AdvertiserLayout.js';
import AdminLayout from './components/layout/AdminLayout.js';
import Layout404 from './components/layout/Layout404.js';
import PageNotFound from './components/pages/PageNotFound.js';

import AdminDashboard from './components/pages/Admin/AdminDashboard/AdminDashboard.js';
import AdminServices from './components/pages/Admin/AdminServices/AdminServices.js';
import AdminServiceProvider from './components/pages/Admin/AdminUsers/AdminServiceProviders.js';
import AdminCustomers from './components/pages/Admin/AdminUsers/AdminCustomers.js';
import AdminAdvertisers from './components/pages/Admin/AdminUsers/AdminAdvertisers.js';
import AdminReviews from './components/pages/Admin/AdminReviews/AdminReviews.js';
import AdminComplaints from './components/pages/Admin/AdminComplaints/AdminComplaints.js';
import AdminReport from './components/pages/Admin/AdminReport/AdminReport.js';
import AdminAdvertisements from './components/pages/Admin/AdminAdvertisements/AdminAdvertisements.js';
import AdminViewHistory from './components/pages/Admin/AdminHistory/AdminHistory.js';
import ViewReviewandRating from './components/pages/User/Admin/ViewReviewandRating.js';
import AdminChat from './components/pages/User/Chat/ChatPage.js';
import AdminSessions from './components/pages/Admin/AdminSessions/AdminSessions.js';
import AdminInvoices from './components/pages/Admin/AdminInvoices/AdminInvoices.js';

import CustomerDashboard from './components/pages/Customer/CustomerDashboard/CustomerDashboard.js';
import CustomerLayout from './components/layout/CustomerLayout.js';
import CustomerProfile from './components/pages/User/Customer/EditProfile.js';
import PostVacancyFormIndex from './components/pages/Customer/PostVacancyFormIndex.js';
import OngoingProject from './components/pages/Customer/CustomerDashboard/OngoingProject.js';
import Quotation from './components/pages/Customer/Quotation.js'
import ViewVacancy from './components/pages/Customer/ViewVacancy.js';
import SocialShareSP from './components/pages/Customer/SocialShare/SocialShareSP.js';
import AddReviewandRating from './components/pages/User/Customer/AddReviewandRating.js';
import CustomerViewHistory from './components/pages/User/Customer/ViewHistory.js';
import CustomerChat from './components/pages/User/Chat/ChatPage.js';
import CustomerJob from './components/pages/Customer/ViewAJobCustomer/Index.js';

import Searchserviceprovider from './components/pages/Customer/SearchServiceProvider.js';
import ViewServiceProvider from './components/pages/Customer/ViewServiceProvider.js';
import ToDoForm from './components/pages/Customer/ToDoForm.js';
import RatenReview from './components/pages/Customer/RatenReview.js';
import ViewAservice from './components/pages/User/ViewAservice.js';
import ReceivedQuotation from './components/pages/Customer/ReceivedQuotation.js';
import ViewAQuotation from './components/pages/Customer/ViewAQuotation.js';
import ViewVacancyResponse from './components/pages/Customer/ViewVacanyResponse.js';
import CustomerComplaints from './components/pages/Customer/Complaints.js';
import CustomerComplaintPage from './components/pages/Customer/CustomerComplaintPage.js';
import PostVacancyForm from './components/pages/Customer/PostVacancyForm.js';
import JobRequest from './components/pages/Customer/JobRequest.js';
import Forum from './components/pages/Forum/Forum.js';
import ContactpageNR from './components/pages/User/Customer/ContactpageNR.js'
import ToDoList from './components/pages/ServiceProvider/CreateToDo.js';
import RequestedQuotation from './components/pages/Customer/RequestedQuotation.js';
import PostedVacancies from './components/pages/Customer/PostedVacancies.js';
import PostJobForm from './components/pages/Customer/PostJobForm.js';
import PostedJobs from './components/pages/Customer/PostedJobs.js';
import RequestedJobs from './components/pages/Customer/RequestedJobs.js';
import ViewPostedJobs from './components/pages/Customer/ViewPostedJobs.js';
import ViewVacancyReply from './components/pages/Customer/ViewVacancyReply.js';
import ActivateCustomer from './ContextFiles/ActivateCustomer.js';
import ActivateUser from './ContextFiles/ActivateUser.js';
import ViewPostedJobs1 from './components/pages/Customer/ViewPostedJobs1.js';

import PrivateRoute from './PrivateRoute.js';
import AuthenticationContextProvider from './ContextFiles/Authentication/AuthenticationContextProvider.js';
import PrivateRouteLayout from './components/layout/PrivateRouteLayout.js';
import { Navigate } from 'react-router-dom';

let isAuth = localStorage.getItem('authenticated');
let user = localStorage.getItem('role'); 

if (user) {
  user = user.toLowerCase();
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route index element={isAuth ? (<Navigate to={`/${user}`} />) : (<Home />)} />
        <Route path="/services" element={isAuth ? (<Navigate to={`/${user}`} />) : (<ViewServices />)} />
        <Route path="/services/:serviceName" element={isAuth ? (<Navigate to={`/${user}`} />) : (<ServicePage />)} />
        <Route path="/services/ViewAservice" element={isAuth ? (<Navigate to={`/${user}`} />) : (<ViewAservice />)} />
        <Route path="/review" element={isAuth ? (<Navigate to={`/${user}`} />) : (<Review />)} />

        <Route path="/jobs" element={isAuth ? (<Navigate to={`/${user}`} />) : (<ViewServicesJobs />)} />
        <Route path="/jobs/:serviceName" element={isAuth ? (<Navigate to={`/${user}`} />) : (<ServicePageJob />)} />
        <Route path="/jobs/ViewAjob" element={<SpViewAserviceJob />} />
        <Route path="/login" element={ isAuth ? ( <Navigate to={`/${user}`} />) : (<Login /> )}/>
        <Route path="/signup/customer" element={isAuth ? (<Navigate to={`/${user}`} />) : (<CustSignUp />)} />
        <Route path="/signup/serviceProvider" element={isAuth ? (<Navigate to={`/${user}`} />) : (<SpSignUp />)} />
        <Route path="/signup/advertiser" element={isAuth ? (<Navigate to={`/${user}`} />) : (<AdvertiserSignUp />)} />
        <Route path="/About" element={isAuth ? (<Navigate to={`/${user}`} />) : (<About />)} />
        <Route path="/Contactus" element={<ContactpageNR />} />
        <Route exact path="/ResetPassword" element={isAuth ? (<Navigate to={`/${user}`} />) : (<ResetPasswordContextProviderInterface />)} />
      </Route>

      <Route path="/admin" element={<PrivateRouteLayout />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="serviceProviders" element={<AdminServiceProvider />} />
          <Route path="customers" element={<AdminCustomers />} />
          <Route path="advertisers" element={<AdminAdvertisers />} />
          <Route path="reviews" element={<AdminReviews />} />
          <Route path="complaints" element={<AdminComplaints />} />
          <Route path="report" element={<AdminReport />} />
          <Route path="advertisements" element={<AdminAdvertisements />} />
          <Route path="invoice" element={<AdminInvoices />} />
          <Route path="history" element={<AdminViewHistory />} />
          <Route path="review" element={<ViewReviewandRating />} />
          <Route path="chat" element={<AdminChat />} />
          <Route path="sessions" element={<AdminSessions />} />
        </Route>
      </Route>

      <Route path="/Advertiser" element={<PrivateRouteLayout />}>
        <Route path="/Advertiser" element={<AdvertiserLayout />}>
          <Route path="CreateAd" element={<CreateAd />} />
          <Route path="View" element={<ViewAd />} />
          <Route index element={<AdDashbord />} />
          <Route path="Subscribtion" element={<Subscribtion />} />
          <Route path="Subscription" element={<SubscripetionIndex />} />
          <Route path="Chat" element={<AdvertiserChat />} />
          <Route path="Ads" element={<Ads />} />
          <Route path="EditAd/:id" element={<EditAd />} />
          <Route path="Subscribed/:subId" element={<Subscriped />} />
          <Route path="Forum" element={<Forum />} />
          <Route path="ViewThread" element={<ViewThread />} />
        </Route>
      </Route>

      <Route path="/Customer" element={<CustomerLayout />}>
        <Route index element={<CustomerDashboard />} />
        <Route path="PostVacancyFormIndex" element={<PostVacancyFormIndex />} />
        <Route path="OngoingProject" element={<OngoingProject />} />
        <Route path="Quotation" element={<Quotation />} />
        <Route path="ViewVacancy" element={<ViewVacancy />} />
        <Route path="SocialShareSP" element={<SocialShareSP />} />
        <Route path="PostVacancyForm" element={<PostVacancyForm />} />
        <Route path="ViewServiceProvider/:id" element={<ViewServiceProvider />}/>
        <Route path="ToDoForm" element={<ToDoForm />} />
        <Route path="RatenReview" element={<RatenReview />} />
        <Route path="Searchserviceprovider" element={<Searchserviceprovider />}/>
        <Route path="ReceivedQuotation" element={<ReceivedQuotation />} />
        <Route path="AddReview" element={<AddReviewandRating />} />
        <Route path="History" element={<CustomerViewHistory />} />
        <Route path="CustomerComplaintPage" element={<CustomerComplaintPage />}/>
        <Route path="ViewAQuotation" element={<ViewAQuotation />} />
        <Route path="ViewVacancyResponse" element={<ViewVacancyResponse />} />
        <Route path="CustomerComplaints" element={<CustomerComplaints />} />
        <Route path="AdsPage" element={<AdsPage />} />
        <Route path="Chat" element={<CustomerChat />} />
        <Route path="ToDoList" element={<ToDoList />} />
        <Route path="RequestedQuotation" element={<RequestedQuotation />} />
        <Route path="PostedVacancies" element={<PostedVacancies />} />
        <Route path="JobRequest" element={<JobRequest />} />
        <Route path="PostJobForm" element={<PostJobForm />} />
        <Route path="PostedJobs" element={<PostedJobs />} />
        <Route path="RequestedJobs" element={<RequestedJobs />} />
        {/* <Route path="ViewPostedJobs/:id" element={<ViewPostedJobs />} /> */}
        <Route path="ViewPostedJobs1/:id" element={<ViewPostedJobs1 />} />
        <Route path="ViewVacancyReply" element={<ViewVacancyReply />} />
        
        <Route path="ViewPostedJobs/:id" element={<CustomerJob />} />
      </Route>

      <Route path="/ServiceProvider" element={<PrivateRouteLayout />}>
        <Route path="/ServiceProvider" element={<SpLayout />}>
          <Route index element={<SpDashboard />} />
          <Route path="ViewJobs" element={<SpViewJobs />} />
          <Route path="ViewVacancies" element={<SpViewVacancies />} />
          <Route path="ApplyVacancy/:id" element={<SpApplyVacancy />} />
          <Route path="MyServices" element={<SpServices />} />
          <Route path="ViewAJob/:id" element={<SpViewAJob />} />
          <Route path="ViewAVacancy/:id" element={<SpViewAVacancy />} />
          <Route path="AddNewServices" element={<SpAddNewServices />} />
          <Route path="CreateBlog" element={<SpCreateBlog />} />
          <Route path="CreateTrainingSession" element={<SpCreateTrainingSession />} />
          <Route path="MyProjectsJobs" element={<SpMyProjectsJobs />} />
          <Route path="MyProjectsVacancies" element={<SpMyProjectsVacancies />} />
          <Route path="ViewTrainingSessions" element={<SpViewTrainingSessions />} />
          <Route path="ViewATrainingSession/:id" element={<SpViewATrainingSession />} />
          <Route path="MyProjectStates" element={<SpMyProjectStates />} />
          <Route path="OngoingJob/:id" element={<SpOngoingJob />} />
          <Route path="AcceptedVacancy" element={<SpAcceptedVacancy />} />
          <Route path="StartJob/:id" element={<SpStartJob />} />
          <Route path="AvailabilityCalendar" element={<SpAvailabilityCalendar />} />
          <Route path="MyTrainingSessions" element={<SpMyTrainingSessions />} />
          <Route path="ViewHistory" element={<SpViewHistory />} />
          <Route path="PendingJob/:id" element={<SpPendingJob />} />
          <Route path="OngoingVacancy/:id" element={<SpOngoingVacancy />} />
          {/* <Route path="Forum" element={<Forum />} />
        <Route path="ViewThread" element={<ViewThread />} /> */}
        <Route path="ToDoList/:id" element={<ToDoList />} />
        <Route path="Chat" element={<SpChat />} />
        <Route path="AdsPage" element={<AdsPage />} />
        <Route path="CreateQuotation/:id" element={<CreateQuotation />} />
        <Route path="CompletedJob/:id" element={<SpCompletedJobs />} />
        <Route path="CompletedVacancy/:id" element={<SpCompletedVacancies />} />
        <Route path="TrainingSessionVerification/:mobilenumber" element={<TrainingSessionVerification />} />
        <Route path="Complaints" element={<SpComplaints />} />
      </Route>
      </Route>

      <Route path='/activateCustomer' element={<ActivateCustomer />} />
      <Route path='/activateUser' element={<ActivateUser />} />
      <Route path="*" element={<Layout404> {" "}<PageNotFound /></Layout404>}
      />
    </>
  )
);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;
