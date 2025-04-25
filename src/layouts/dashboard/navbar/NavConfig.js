/* eslint-disable import/order */
import { Icon } from '@iconify/react';
import { PATH_DASHBOARD } from '../../../routes/paths';
import ManIcon from '@mui/icons-material/Man';

const navConfig = [
  {
    items: [
      { title: 'Dashboard', path: '/dashboard/home', icon: <Icon icon="ri:dashboard-line" /> },
      // { title: 'Sub Admin', path: PATH_DASHBOARD.element.element, icon: <ManIcon />},
      // { title: 'Subscription', path: PATH_DASHBOARD.dorm.dorm, icon: <Icon icon="material-symbols-light:subscriptions-rounded" /> },
      // { title: 'Membership', path: PATH_DASHBOARD.spell.spell,icon: <Icon icon="material-symbols:card-membership-outline" />},
      // { title: 'Mailng List', path: PATH_DASHBOARD.magictype.magictype, icon: <Icon icon="fluent:mail-12-filled" /> },
      { title: 'Home', path: PATH_DASHBOARD.homes.homes, icon: <ManIcon /> },
      { title: 'Talent List', path: PATH_DASHBOARD.list.list, icon: <ManIcon /> },
      { title: 'Project List', path: PATH_DASHBOARD.projects.project, icon: <ManIcon /> },
      { title: 'What We Do', path: PATH_DASHBOARD.whatwedo.whatwedo, icon: <ManIcon /> },
      { title: 'Brand Section', path: PATH_DASHBOARD.brandsection.brandsection, icon: <ManIcon /> },
      // { title: 'Box', path: PATH_DASHBOARD.box.box, icon: <Icon icon="nimbus:box-packed" />},
      // { title: 'FAQ', path: PATH_DASHBOARD.faq.faq, icon: <Icon icon="mdi:faq" />},
      // { title: 'Event', path: PATH_DASHBOARD.event.event, icon:   <Icon icon="material-symbols:event-available-outline-rounded" />},
      // { title: 'Home Our Mission', path: PATH_DASHBOARD.homeourmission.homeourmission, icon:   <Icon icon="icon-park-twotone:user-to-user-transmission" />},
      // { title: 'Dynamic Pages', path: PATH_DASHBOARD.press.press, icon:  <Icon icon="material-symbols:page-info-rounded" />},
      // { title: 'Dynamic Section Page', path: PATH_DASHBOARD.dynamicsectionpage.dynamicsectionpage, icon:   <Icon icon="fluent-mdl2:reopen-pages" />},
      // { title: 'Artifacts Donation', path: PATH_DASHBOARD.review.review, icon: <VolunteerActivismIcon/> },
    ],
  },

  {
    items: [
      { title: 'Dashboard', path: '/dashboard/home', icon: <Icon icon="ri:dashboard-line" /> },
      // { title: 'Subscription', path: PATH_DASHBOARD.dorm.dorm, icon: <Icon icon="material-symbols-light:subscriptions-rounded" /> },
      { title: 'Home', path: PATH_DASHBOARD.homes.homes, icon: <ManIcon /> },
      { title: 'Talent List', path: PATH_DASHBOARD.list.list, icon: <ManIcon /> },
      // { title: 'Membership', path: PATH_DASHBOARD.spell.spell,icon: <Icon icon="material-symbols:card-membership-outline" />},
      // { title: 'Mailng List', path: PATH_DASHBOARD.magictype.magictype, icon: <Icon icon="fluent:mail-12-filled" /> },

      // { title: 'Cotillion Organization', path: PATH_DASHBOARD.rarity.rarity, icon: <Icon icon="fe:warning"/> },
      // { title: 'Male Participation', path: PATH_DASHBOARD.element.element1, icon: <ManIcon />},
      // { title: 'Affiliated (s) or Business', path: PATH_DASHBOARD.tag.tag, icon: <BusinessIcon />},
      // { title: 'Artifacts Donation', path: PATH_DASHBOARD.review.review, icon: <VolunteerActivismIcon/> },
      // { title: 'Slot', path: PATH_DASHBOARD.slot.addslot, icon: <Icon icon="entypo:time-slot" />},
      // { title: 'appointment', path: PATH_DASHBOARD.appointment.appointment, icon: <Icon icon="teenyicons:appointments-outline"/> },
      // { title: 'Today Shadow', path: PATH_DASHBOARD.appointment.todayShadow, icon: <Icon icon="teenyicons:appointments-outline"/> },
      // { title: 'Student Attendance', path: PATH_DASHBOARD.tag.tag, icon: <Icon icon="ph:student-fill" /> },
      // { title: 'Review', path: PATH_DASHBOARD.review.review, icon: <Icon icon="material-symbols:rate-review-outline"/> },
      // { title: 'Dress Code', path: '/dashboard/dresscode', icon: <Icon icon="material-symbols:dresser"/> },
      // { title: 'Forms', path: '/dashboard/Form', icon: <Icon icon="material-symbols:app-registration"/> },
      // { title: 'Check-in Info', path: '/dashboard/checkinInfo', icon: <Icon icon="material-symbols:library-add-check-outline"/> },
    ],
  },

  // {
  //   subheader: 'management',
  //   items: [
  //     // USER
  //     {
  //       title: 'user',
  //       path: PATH_DASHBOARD.user.root,
  //       icon: ICONS.user,
  //       children: [
  //         { title: 'profile', path: PATH_DASHBOARD.user.profile },
  //         { title: 'cards', path: PATH_DASHBOARD.user.cards },
  //         { title: 'list', path: PATH_DASHBOARD.user.list },
  //         { title: 'create', path: PATH_DASHBOARD.user.new },
  //         { title: 'edit', path: PATH_DASHBOARD.user.demoEdit },
  //         { title: 'account', path: PATH_DASHBOARD.user.account },
  //       ],
  //     },

  //     // E-COMMERCE
  // {
  //   title: 'e-commerce',
  //   path: PATH_DASHBOARD.eCommerce.root,
  //   icon: ICONS.cart,
  //   children: [
  //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
  //     { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
  //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
  //     { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
  //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
  //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
  //   ],
  // },

  //     // INVOICE
  //     {
  //       title: 'invoice',
  //       path: PATH_DASHBOARD.invoice.root,
  //       icon: ICONS.invoice,
  //       children: [
  //         { title: 'list', path: PATH_DASHBOARD.invoice.list },
  //         { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
  //         { title: 'create', path: PATH_DASHBOARD.invoice.new },
  //         { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
  //       ],
  //     },

  // BLOG
  // {
  //   title: 'blog',
  //   path: PATH_DASHBOARD.blog.root,
  //   icon: ICONS.blog,
  //   children: [
  //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
  //     { title: 'post', path: PATH_DASHBOARD.blog.demoView },
  //     { title: 'create', path: PATH_DASHBOARD.blog.new },
  //   ],
  // },
  //   ],
  // },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: (
  //         <Label variant="outlined" color="error">
  //           +32
  //         </Label>
  //       ),
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
  //   ],
  // },
];

export default navConfig;
