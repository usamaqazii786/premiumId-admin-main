function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_ROLE_LOGIN = '/login';

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_ROLE_LOGIN = {
  root: ROOTS_ROLE_LOGIN,
  admin: path(ROOTS_ROLE_LOGIN, '/admin'),
  company: path(ROOTS_ROLE_LOGIN, `/company`),
  clinic: path(ROOTS_ROLE_LOGIN, '/clinic'),
  officer: path(ROOTS_ROLE_LOGIN, '/officer'),
  member: path(ROOTS_ROLE_LOGIN, '/member'),
  register: path(ROOTS_ROLE_LOGIN, '/register'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dorm: {
    app: path(ROOTS_DASHBOARD, '/'),
    dorm: path(ROOTS_DASHBOARD, '/dorm'),
    editdorm: (id) => path(ROOTS_DASHBOARD, `/editdorm/${id}`),
    adddorm: path(ROOTS_DASHBOARD, '/adddorm'),
  },
  element: {
    app: path(ROOTS_DASHBOARD, '/'),
    element: path(ROOTS_DASHBOARD, '/element'),
    element1: path(ROOTS_DASHBOARD, '/maleperticipate'),
    editelement: (id) => path(ROOTS_DASHBOARD, `/editelement/${id}`),
    companyProfile: path(ROOTS_DASHBOARD, '/companyProfile'),
    addelement: path(ROOTS_DASHBOARD, '/addelement'),
  },
  magictype: {
    app: path(ROOTS_DASHBOARD, '/'),
    magictype: path(ROOTS_DASHBOARD, '/magictype'),
    editmagictype: (id) => path(ROOTS_DASHBOARD, `/editmagictype/${id}`),
    appointmentchart: (id) => path(ROOTS_DASHBOARD, `/appointmentChart/${id}`),
    cProvider: (id) => path(ROOTS_DASHBOARD, `/cProvider/${id}`),
    cSlot: (id) => path(ROOTS_DASHBOARD, `/cSlot/${id}`),
    addmagictype: path(ROOTS_DASHBOARD, '/addmagictype'),
  },
  list: {
    app: path(ROOTS_DASHBOARD, '/'),
    list: path(ROOTS_DASHBOARD, '/list'),
    editlist: (id) => path(ROOTS_DASHBOARD, `/editlist/${id}`),
    addlist: path(ROOTS_DASHBOARD, '/addlist'),
  },
  homes: {
    app: path(ROOTS_DASHBOARD, '/'),
    homes: path(ROOTS_DASHBOARD, '/homes'),
    edithomes: (id) => path(ROOTS_DASHBOARD, `/edithomes/${id}`),
    addhomes: path(ROOTS_DASHBOARD, '/addhomes'),
  },
  brandsection: {
    app: path(ROOTS_DASHBOARD, '/'),
    brandsection: path(ROOTS_DASHBOARD, '/brandsection'),
    // editbrandsection: (id) => path(ROOTS_DASHBOARD, `/editbrandsection/${id}`),
    addbrandsection: path(ROOTS_DASHBOARD, '/addbrandsection'),
  },
  projects: {
    app: path(ROOTS_DASHBOARD, '/'),
    project: path(ROOTS_DASHBOARD, '/project'),
    editproject: (id) => path(ROOTS_DASHBOARD, `/projects/${id}`),
    addproject: path(ROOTS_DASHBOARD, '/addprojects'),
  },
  whatwedo: {
    app: path(ROOTS_DASHBOARD, '/'),
    whatwedo: path(ROOTS_DASHBOARD, '/whatwedo'),
    editwhatwedo: (id) => path(ROOTS_DASHBOARD, `/whatwedo/${id}`),
    addwhatwedo: path(ROOTS_DASHBOARD, '/addwhatwedo'),
  },
  dynamicsectionpage: {
    app: path(ROOTS_DASHBOARD, '/'),
    dynamicsectionpage: path(ROOTS_DASHBOARD, '/dynamicsectionpage'),
    editdynamicsectionpage: (id) => path(ROOTS_DASHBOARD, `/editdynamicsectionpage/${id}`),
    adddynamicsectionpage: path(ROOTS_DASHBOARD, '/adddynamicsectionpage'),
  },
  box: {
    app: path(ROOTS_DASHBOARD, '/'),
    box: path(ROOTS_DASHBOARD, '/box'),
    editbox: (id) => path(ROOTS_DASHBOARD, `/editbox/${id}`),
    addbox: path(ROOTS_DASHBOARD, '/addbox'),
  },
  faq: {
    app: path(ROOTS_DASHBOARD, '/'),
    faq: path(ROOTS_DASHBOARD, '/faq'),
    editfaq: (id) => path(ROOTS_DASHBOARD, `/editFAQ/${id}`),
    addfaq: path(ROOTS_DASHBOARD, '/addfaq'),
  },
  rarity: {
    app: path(ROOTS_DASHBOARD, '/'),
    rarity: path(ROOTS_DASHBOARD, '/cotillion'),
    editrarity: (id) => path(ROOTS_DASHBOARD, `/editrarity/${id}`),
    addrarity: path(ROOTS_DASHBOARD, '/addrarity'),
  },
  review: {
    app: path(ROOTS_DASHBOARD, '/'),
    review: path(ROOTS_DASHBOARD, '/artifact'),
    creview: (id) => path(ROOTS_DASHBOARD, `/review/${id}`),
  },
  spell: {
    app: path(ROOTS_DASHBOARD, '/'),
    spell: path(ROOTS_DASHBOARD, '/spell'),
    detail: (id) => path(ROOTS_DASHBOARD, `/detail/${id}`),
    editspell: (id) => path(ROOTS_DASHBOARD, `/editspell/${id}`),
    addspell: path(ROOTS_DASHBOARD, '/addspell'),
    spelleffect: (id) => path(ROOTS_DASHBOARD, `/spelleffect/${id}`),
  },
  event: {
    app: path(ROOTS_DASHBOARD, '/'),
    event: path(ROOTS_DASHBOARD, '/event'),
    editevent: (id) => path(ROOTS_DASHBOARD, `/editevent/${id}`),
    addevent: path(ROOTS_DASHBOARD, '/addevent'),
    // addslotById:(id) => path(ROOTS_DASHBOARD, `/addslot/${id}`),
  },
  homeourmission: {
    app: path(ROOTS_DASHBOARD, '/'),
    homeourmission: path(ROOTS_DASHBOARD, '/homeourmission'),
    edithomeourmission: (id) => path(ROOTS_DASHBOARD, `/edithomeourmission/${id}`),
    addhomeourmission: path(ROOTS_DASHBOARD, '/addhomeourmission'),
    // addslotById:(id) => path(ROOTS_DASHBOARD, `/addslot/${id}`),
  },
  press: {
    app: path(ROOTS_DASHBOARD, '/'),
    press: path(ROOTS_DASHBOARD, '/press'),
    editpress: (id) => path(ROOTS_DASHBOARD, `/editpress/${id}`),
    addpress: path(ROOTS_DASHBOARD, '/addpress'),
    // addslotById:(id) => path(ROOTS_DASHBOARD, `/addslot/${id}`),
  },
  character: {
    app: path(ROOTS_DASHBOARD, '/'),
    character: path(ROOTS_DASHBOARD, '/character'),
    editcharacter: (id) => path(ROOTS_DASHBOARD, `/editcharacter/${id}`),
    addcharacter: path(ROOTS_DASHBOARD, '/addcharacter'),
  },
  appointment: {
    app: path(ROOTS_DASHBOARD, '/'),
    appointment: path(ROOTS_DASHBOARD, '/appointment'),
    todayShadow: path(ROOTS_DASHBOARD, '/todayShadow'),
    studentDetail: path(ROOTS_DASHBOARD, '/studentDetail'),
    editappointment: (id) => path(ROOTS_DASHBOARD, `/editappointment/${id}`),
    appointmentdetail: (id) => path(ROOTS_DASHBOARD, `/appointmentdetail/${id}`),
    addappointment: path(ROOTS_DASHBOARD, '/addappointment'),
  },
  card: {
    app: path(ROOTS_DASHBOARD, '/'),
    card: path(ROOTS_DASHBOARD, '/card'),
    editcard: (id) => path(ROOTS_DASHBOARD, `/editcard/${id}`),
    carddetail: (id) => path(ROOTS_DASHBOARD, `/carddetail/${id}`),
    addcard: path(ROOTS_DASHBOARD, '/addcard'),
  },

  general: {
    app: path(ROOTS_DASHBOARD, '/'),
    subscription: path(ROOTS_DASHBOARD, '/subscription'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  // blog: {
  //   root: path(ROOTS_DASHBOARD, '/blog'),
  //   posts: path(ROOTS_DASHBOARD, '/blog/posts'),
  //   new: path(ROOTS_DASHBOARD, '/blog/new'),
  //   view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
  //   demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  // },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
