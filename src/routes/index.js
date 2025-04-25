/* eslint-disable */
import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
// import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
// import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
// import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
// import RoleBasedGuard from '../guards/RoleBasedGuard';
// config
import { PATH_AFTER_LOGIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';
import TextTitle from '../pages/dashboard/TermCondition.js/AddTextTitle';
import Editvideos from '../pages/dashboard/TermCondition.js/EditVedios';
import UsersData from '../pages/dashboard/TermCondition.js/Usersdata';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    // { path: '/', element: <Home/> },
    { path: '/login/admin', element: <Login /> },
    { path: '/codemail', element: <CodeMail /> },
    { path: '/login/company', element: <CompanyLogin /> },
    { path: '/', element: <ClinicLogin /> },
    { path: '/reset-password', element: <Register /> },
    { path: '/subscription', element: <Subscription /> },
    { path: '/forget-password', element: <ResetPassword usertype={'company'} /> },
    { path: '/clinic-reset-passsword', element: <ResetPassword usertype={'clinic'} /> },
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'home', element: <GeneralAnalytics /> },
        { path: 'dorm', element: <Dorm /> },
        { path: 'editdorm/:id', element: <EditDorm /> },
        { path: 'adddorm', element: <AddDorm /> },
        { path: 'maleperticipate', element: <Element1 /> },
        { path: 'element', element: <Element /> },
        { path: 'maleperticipate', element: <Element1 /> },
        { path: 'editelement/:id', element: <EditElement /> },
        { path: 'companyProfile', element: <CompanyProfile /> },
        { path: 'addelement', element: <AddElement /> },
        { path: 'title', element: <TextTitle /> },
        { path: 'videos/:id', element: <Editvideos /> },
        { path: 'usersdata', element: <UsersData /> },
        { path: 'magictype', element: <Magictype /> },
        { path: 'editmagictype/:id', element: <EditMagictype /> },
        { path: 'appointmentchart/:id', element: <AppointmentChart /> },
        { path: 'cProvider/:id', element: <CProvider /> },
        { path: 'cSlot/:id', element: <CSlot /> },
        { path: 'addmagictype', element: <AddMagictype /> },
        { path: 'list', element: <Membership /> },
        { path: 'editlist/:id', element: <EditMembership /> },
        { path: 'addlist', element: <AddMembership /> },
        { path: 'homes', element: <Homes /> },
        { path: 'edithomes/:id', element: <EditHome /> },
        { path: 'addhomes', element: <AddHome /> },
        { path: 'brandsection', element: <BrandSection /> },
        { path: 'addbrandsection', element: <AddBrandSection /> },
        { path: 'project', element: <Project /> },
        { path: 'whatwedo', element: <Whatwedo /> },
        { path: 'projects/:id', element: <EditProject /> },
        { path: 'addprojects', element: <AddProject /> },
        { path: 'addwhatwedo', element: <AddWhatwedo /> },
        { path: 'dynamicsectionpage', element: <Dynamicsectionpage /> },
        { path: 'editdynamicsectionpage/:id', element: <Editdynamicsectionpage /> },
        { path: 'adddynamicsectionpage', element: <Adddynamicsectionpage /> },
        { path: 'box', element: <Box /> },
        { path: 'editbox/:id', element: <EditBox /> },
        { path: 'addbox', element: <AddBox /> },
        { path: 'faq', element: <FAQ /> },
        { path: 'editfaq/:id', element: <EditFAQ /> },
        { path: 'addfaq', element: <AddFAQ /> },
        { path: 'artifact', element: <Review /> },
        { path: 'review/:id', element: <Creview /> },
        { path: 'cotillion', element: <Rarity /> },
        { path: 'editrarity/:id', element: <EditRarity /> },
        { path: 'addrarity', element: <AddRarity /> },
        { path: 'spell', element: <Spell /> },
        { path: 'editspell/:id', element: <EditSpell /> },
        { path: 'detail/:id', element: <Details /> },
        { path: 'addspell', element: <AddSpell /> },
        { path: 'editevent/:id', element: <EditEvent /> },
        { path: 'addevent', element: <AddEvent /> },
        // { path: 'addevent/:id', element: <Addevent /> },
        { path: 'event', element: <Event /> },
        { path: 'edithomeourmission/:id', element: <EditHomeOurMission /> },
        { path: 'addhomeourmission', element: <AddHomeOurMission /> },
        { path: 'homeourmission', element: <HomeOurMission /> },
        { path: 'press', element: <Press /> },
        { path: 'editpress/:id', element: <EditPress /> },
        { path: 'addpress', element: <AddPress /> },
        { path: 'appointment', element: <Appointment /> },
        { path: 'todayShadow', element: <TodayShadow /> },
        { path: 'studentDetail', element: <StudentDetail /> },
        { path: 'card', element: <Card /> },
        { path: 'editcard/:id', element: <EditCard /> },
        { path: 'addcard', element: <AddCard /> },
        { path: 'character', element: <Character /> },
        { path: 'editcharacter/:id', element: <EditCharacter /> },
        { path: 'addcharacter', element: <AddCharacter /> },
        { path: 'CardDetail/:id', element: <Profile /> },
        { path: 'dresscode', element: <DressCode /> },
        { path: 'AddDressCode', element: <AddDressCode /> },
        { path: 'editdresscode/:id', element: <EditDressCode /> },
        { path: 'Form', element: <Form /> },
        { path: 'addForm', element: <AddForm /> },
        { path: 'editform/:id', element: <EditForms /> },
        { path: 'checkinInfo', element: <CheckinInfo /> },
        { path: 'addcheckinInfo', element: <AddCheckinInfo /> },
        { path: 'editcheckinInfo/:id', element: <EditCheckinInfo /> },

        { path: 'ecommerce', element: <GeneralEcommerce /> },

        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
          ],
        },
      ],
    },
    //   {
    //     path: 'auth',
    //     children: [
    //       {
    //         path: 'login',
    //         element: (
    //           <GuestGuard>
    //             <Login />
    //           </GuestGuard>
    //         ),
    //       },
    //       {
    //         path: 'register',
    //         element: (
    //           <GuestGuard>
    //             <Register />
    //           </GuestGuard>
    //         ),
    //       },
    //       { path: 'login-unprotected', element: <Login /> },
    //       { path: 'register-unprotected', element: <Register /> },
    //       { path: 'reset-password', element: <ResetPassword /> },
    //       { path: 'verify', element: <VerifyCode /> },
    //     ],
    //   },

    //   // Dashboard Routes
    //   {
    //     path: 'dashboard',
    //     element: (
    //       <AuthGuard>
    //         <DashboardLayout />
    //       </AuthGuard>
    //     ),
    //     children: [
    //       { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
    //       { path: 'dom', element: <Dom /> },
    //       { path: 'ecommerce', element: <GeneralEcommerce /> },
    //       { path: 'analytics', element: <GeneralAnalytics /> },
    //       { path: 'banking', element: <GeneralBanking /> },
    //       { path: 'booking', element: <GeneralBooking /> },

    // {
    //   path: 'e-commerce',
    //   children: [
    //     { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
    //     { path: 'shop', element: <EcommerceShop /> },
    //     { path: 'product/:name', element: <EcommerceProductDetails /> },
    //     { path: 'list', element: <EcommerceProductList /> },
    //     { path: 'product/new', element: <EcommerceProductCreate /> },
    //     { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
    //     { path: 'checkout', element: <EcommerceCheckout /> },
    //   ],
    // },
    //       {
    //         path: 'user',
    //         children: [
    //           { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
    //           { path: 'profile', element: <UserProfile /> },
    //           { path: 'cards', element: <UserCards /> },
    //           { path: 'list', element: <UserList /> },
    //           { path: 'new', element: <UserCreate /> },
    //           { path: ':name/edit', element: <UserCreate /> },
    //           { path: 'account', element: <UserAccount /> },
    //         ],
    //       },
    //       {
    //         path: 'invoice',
    //         children: [
    //           { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
    //           { path: 'list', element: <InvoiceList /> },
    //           { path: ':id', element: <InvoiceDetails /> },
    //           { path: ':id/edit', element: <InvoiceEdit /> },
    //           { path: 'new', element: <InvoiceCreate /> },
    //         ],
    //       },
    // {
    //   path: 'blog',
    //   children: [
    //     { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
    //     { path: 'posts', element: <BlogPosts /> },
    //     { path: 'post/:title', element: <BlogPost /> },
    //     { path: 'new', element: <BlogNewPost /> },
    //   ],
    // },
    //       {
    //         path: 'mail',
    //         children: [
    //           { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
    //           { path: 'label/:customLabel', element: <Mail /> },
    //           { path: 'label/:customLabel/:mailId', element: <Mail /> },
    //           { path: ':systemLabel', element: <Mail /> },
    //           { path: ':systemLabel/:mailId', element: <Mail /> },
    //         ],
    //       },
    //       {
    //         path: 'chat',
    //         children: [
    //           { element: <Chat />, index: true },
    //           { path: 'new', element: <Chat /> },
    //           { path: ':conversationKey', element: <Chat /> },
    //         ],
    //       },
    //       { path: 'calendar', element: <Calendar /> },
    //       { path: 'kanban', element: <Kanban /> },
    //     ],
    //   },

    //   // Main Routes
    //   {
    //     path: '*',
    //     element: <LogoOnlyLayout />,
    //     children: [
    //       { path: 'coming-soon', element: <ComingSoon /> },
    //       { path: 'maintenance', element: <Maintenance /> },
    //       { path: 'pricing', element: <Pricing /> },
    //       { path: 'payment', element: <Payment /> },
    //       { path: '500', element: <Page500 /> },
    //       { path: '404', element: <NotFound /> },
    //       { path: '*', element: <Navigate to="/404" replace /> },
    //     ],
    //   },
    //   {
    //     path: '/',
    //     element: <Login/>,
    //     children: [
    //       { element: <HomePage />, index: true },
    //       { path: 'about-us', element: <About /> },
    //       { path: 'contact-us', element: <Contact /> },
    //       { path: 'faqs', element: <Faqs /> },
    //     ],
    //   },
    //   { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const CompanyLogin = Loadable(lazy(() => import('../pages/auth/CompanyLogin')));
const ClinicLogin = Loadable(lazy(() => import('../pages/auth/ClinicLogin')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const CodeMail = Loadable(lazy(() => import('../pages/auth/CodeMail')));

const Subscription = Loadable(lazy(() => import('../pages/dashboard/Subscription')));
const Home = Loadable(lazy(() => import('../pages/dashboard/Home/Home')));

const Dorm = Loadable(lazy(() => import('../pages/dashboard/Subscription/Dorm')));
const EditDorm = Loadable(lazy(() => import('../pages/dashboard/Subscription/EditDorm')));
const AddDorm = Loadable(lazy(() => import('../pages/dashboard/Subscription/AddDorm')));

const Press = Loadable(lazy(() => import('../pages/dashboard/Press/Press')));
const EditPress = Loadable(lazy(() => import('../pages/dashboard/Press/EditPress')));
const AddPress = Loadable(lazy(() => import('../pages/dashboard/Press/AddPress')));

const Element1 = Loadable(lazy(() => import('../pages/dashboard/SubAdmin/Element1')));
const Element = Loadable(lazy(() => import('../pages/dashboard/SubAdmin/Element')));
const EditElement = Loadable(lazy(() => import('../pages/dashboard/SubAdmin/EditElement')));
const CompanyProfile = Loadable(lazy(() => import('../pages/dashboard/SubAdmin/CompanyProfile')));
const AddElement = Loadable(lazy(() => import('../pages/dashboard/SubAdmin/AddElement')));

const Magictype = Loadable(lazy(() => import('../pages/dashboard/MailingList/Magictype')));
const EditMagictype = Loadable(lazy(() => import('../pages/dashboard/MailingList/EditMagictype')));
const AddMagictype = Loadable(lazy(() => import('../pages/dashboard/MailingList/AddMagictype')));

const AppointmentChart = Loadable(lazy(() => import('../pages/dashboard/MailingList/AppointmentChart')));
const CProvider = Loadable(lazy(() => import('../pages/dashboard/MailingList/Provider')));
const CSlot = Loadable(lazy(() => import('../pages/dashboard/MailingList/Slot')));

const Membership = Loadable(lazy(() => import('../pages/dashboard/Membership/Membership')));
const EditMembership = Loadable(lazy(() => import('../pages/dashboard/Membership/EditMembership')));
const AddMembership = Loadable(lazy(() => import('../pages/dashboard/Membership/AddMembership')));

const BrandSection = Loadable(lazy(() => import('../pages/dashboard/BrandSection/BrandSection')));
const AddBrandSection = Loadable(lazy(() => import('../pages/dashboard/BrandSection/AddBrandSection')));

const Homes = Loadable(lazy(() => import('../pages/dashboard/Homes/Homes')));
const Project = Loadable(lazy(() => import('../pages/dashboard/Project/Index')));
const Whatwedo = Loadable(lazy(() => import('../pages/dashboard/Whatwedo/Index')));
const EditHome = Loadable(lazy(() => import('../pages/dashboard/Homes/EditHomes')));
const AddHome = Loadable(lazy(() => import('../pages/dashboard/Homes/AddHomes')));
const AddProject = Loadable(lazy(() => import('../pages/dashboard/Project/AddProjects')));
const EditProject = Loadable(lazy(() => import('../pages/dashboard/Project/EditProjects')));
const AddWhatwedo = Loadable(lazy(() => import('../pages/dashboard/Whatwedo/AddWhatwedo')));

const Box = Loadable(lazy(() => import('../pages/dashboard/Box/Box')));
const EditBox = Loadable(lazy(() => import('../pages/dashboard/Box/EditBox')));
const AddBox = Loadable(lazy(() => import('../pages/dashboard/Box/AddBox')));

const FAQ = Loadable(lazy(() => import('../pages/dashboard/FAQ/FAQ')));
const EditFAQ = Loadable(lazy(() => import('../pages/dashboard/FAQ/EditFAQ')));
const AddFAQ = Loadable(lazy(() => import('../pages/dashboard/FAQ/AddFAQ')));

const Review = Loadable(lazy(() => import('../pages/dashboard/Review/Review')));
const Creview = Loadable(lazy(() => import('../pages/dashboard/Review/Creview')));

const Rarity = Loadable(lazy(() => import('../pages/dashboard/TermCondition.js/Rarity')));
const EditRarity = Loadable(lazy(() => import('../pages/dashboard/TermCondition.js/EditRarity')));
const AddRarity = Loadable(lazy(() => import('../pages/dashboard/TermCondition.js/AddRarity')));

const Spell = Loadable(lazy(() => import('../pages/dashboard/MemberShipUser/Spell')));
const Details = Loadable(lazy(() => import('../pages/dashboard/MemberShipUser/Details')));
const EditSpell = Loadable(lazy(() => import('../pages/dashboard/MemberShipUser/EditSpell')));
const AddSpell = Loadable(lazy(() => import('../pages/dashboard/MemberShipUser/AddSpell')));

const EditEvent = Loadable(lazy(() => import('../pages/dashboard/Event/EditEvent')));
const AddEvent = Loadable(lazy(() => import('../pages/dashboard/Event/AddEvent')));
const Event = Loadable(lazy(() => import('../pages/dashboard/Event/Event')));

const EditHomeOurMission = Loadable(lazy(() => import('../pages/dashboard/HomeOurMission/EditHomeOurMission')));
const AddHomeOurMission = Loadable(lazy(() => import('../pages/dashboard/HomeOurMission/AddHomeOurMission')));
const HomeOurMission = Loadable(lazy(() => import('../pages/dashboard/HomeOurMission/HomeOurMission')));

const Dynamicsectionpage = Loadable(lazy(() => import('../pages/dashboard/Dynamicsectionpage/Dynamicsectionpage')));
const Editdynamicsectionpage = Loadable(
  lazy(() => import('../pages/dashboard/Dynamicsectionpage/Editdynamicsectionpage'))
);
const Adddynamicsectionpage = Loadable(
  lazy(() => import('../pages/dashboard/Dynamicsectionpage/AddDynamicsectionpage'))
);

const Appointment = Loadable(lazy(() => import('../pages/dashboard/Appointment/Appointment')));
const TodayShadow = Loadable(lazy(() => import('../pages/dashboard/TodayShadow/TodayShadow')));
const StudentDetail = Loadable(lazy(() => import('../pages/dashboard/TodayShadow/StudentDetail')));

const Card = Loadable(lazy(() => import('../pages/dashboard/Card/Card')));
const EditCard = Loadable(lazy(() => import('../pages/dashboard/Card/EditCard')));
const AddCard = Loadable(lazy(() => import('../pages/dashboard/Card/AddCard')));
// const CardDetail = Loadable(lazy(() => import('../pages/dashboard/Card/CardDetails')));
const Profile = Loadable(lazy(() => import('../pages/dashboard/Card/Profile')));
const DressCode = Loadable(lazy(() => import('../pages/dashboard/ClinicPortal/DressCode')));
const AddDressCode = Loadable(lazy(() => import('../pages/dashboard/ClinicPortal/AddDressCode')));
const EditDressCode = Loadable(lazy(() => import('../pages/dashboard/ClinicPortal/EditDressCode')));
const Form = Loadable(lazy(() => import('../pages/dashboard/ClinicPortal/Form')));
const AddForm = Loadable(lazy(() => import('../pages/dashboard/ClinicPortal/AddForm')));
const EditForms = Loadable(lazy(() => import('../pages/dashboard/ClinicPortal/EditFroms')));
const CheckinInfo = Loadable(lazy(() => import('../pages/dashboard/ClinicPortal/CheckinInfo')));
const AddCheckinInfo = Loadable(lazy(() => import('../pages/dashboard/ClinicPortal/AddCheckInfo')));
const EditCheckinInfo = Loadable(lazy(() => import('../pages/dashboard/ClinicPortal/EditCheckInfo')));

const Character = Loadable(lazy(() => import('../pages/dashboard/Character/Character')));
const EditCharacter = Loadable(lazy(() => import('../pages/dashboard/Character/EditCharacter')));
const AddCharacter = Loadable(lazy(() => import('../pages/dashboard/Character/AddCharacter')));

const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
// const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// // INVOICE
// const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
// const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
// const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
// const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// BLOG
// const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
// const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
// const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));
//
// // USER
// const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
// const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
// const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
// const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
// const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// // APP
// const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
// const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
// const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
// const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// // MAIN
// const HomePage = Loadable(lazy(() => import('../pages/Home')));
// const About = Loadable(lazy(() => import('../pages/About')));
// const Contact = Loadable(lazy(() => import('../pages/Contact')));
// const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
// const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
// const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
// const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
// const Payment = Loadable(lazy(() => import('../pages/Payment')));
// const Page500 = Loadable(lazy(() => import('../pages/Page500')));
// const NotFound = Loadable(lazy(() => import('../pages/Page404')));
