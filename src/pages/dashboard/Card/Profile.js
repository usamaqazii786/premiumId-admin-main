import { capitalCase } from 'change-case';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import { Tab, Box, Card, Tabs, Container } from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useAuth from '../../../hooks/useAuth';
import { useSelector } from '../../../redux/store';
import useTabs from '../../../hooks/useTabs';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
// sections
import {
  Profile,
  ProfileCover,
  ProfileFriends,
  ProfileGallery,
  ProfileFollowers,
} from '../../../sections/@dashboard/user/profile';


const TabsWrapperStyle = styled('div')(({ theme }) => ({
  zIndex: 9,
  bottom: 0,
  width: '100%',
  display: 'flex',
  position: 'absolute',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center',
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(3),
  },
}));

// ----------------------------------------------------------------------

export default function UserProfile() {
    const { id } = useParams();

    const { cards } = useSelector((state) => state.card);
    const currentCard = cards?.find((card) =>card?.id === +(id))
  const { themeStretch } = useSettings();

  const { user } = useAuth();

  const { currentTab, onChangeTab } = useTabs('profile');

  const [, setFindFriends] = useState('');

  const handleFindFriends = (value) => {
    setFindFriends(value);
  };

  const PROFILE_TABS = [
    {
      value: 'profile',
      icon: <Iconify icon={'ic:round-account-box'} width={20} height={20} />,
      component: <Profile data={currentCard} />,
    },
    {
      value: 'Buddy',
      icon: <Icon icon="carbon:partnership"  width={20} height={20} />,
      component: <ProfileFollowers  data={currentCard} />,
    },
    {
      value: 'Spell',
      icon: <Icon icon="pepicons-pop:fire"  width={20} height={20} />,
      component: <ProfileFriends data={currentCard} onFindFriends={handleFindFriends} />,
    },
    {
      value: 'State Formula',
      icon: <Icon icon="eos-icons:compare-states-outlined" width={20} height={20} />,
      component: <ProfileGallery  data={currentCard} />,
    },
  ];

  return (
    <Page title="Card Detail">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="Detail"
          links={[
            { name: 'Dashboard', href: PATH_DASHBOARD.root },
            { name: 'User', href: PATH_DASHBOARD.user.root },
            { name: user?.displayName || '' },
          ]}
        />
        <Card
          sx={{
            mb: 3,
            height: 500,
            position: 'relative',
          }}
        >
          <ProfileCover myProfile={currentCard} />

          <TabsWrapperStyle>
            <Tabs
              allowScrollButtonsMobile
              variant="scrollable"
              scrollButtons="auto"
              value={currentTab}
              onChange={onChangeTab}
            >
              {PROFILE_TABS.map((tab) => (
                <Tab disableRipple key={tab.value} value={tab.value} icon={tab.icon} label={capitalCase(tab.value)} />
              ))}
            </Tabs>
          </TabsWrapperStyle>
        </Card>

        {PROFILE_TABS.map((tab) => {
          const isMatched = tab.value === currentTab;
          return isMatched && <Box key={tab.value}>{tab.component}</Box>;
        })}
      </Container>
    </Page>
  );
}
