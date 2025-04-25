/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
import {  useEffect,useState } from 'react';
import { Grid, Container } from '@mui/material';
import { useNavigate } from 'react-router';
import useSettings from '../../hooks/useSettings';
import { PATH_DASHBOARD } from '../../routes/paths';
import Page from '../../components/Page';
import axiosInstance from '../../utils/axios';

// import { AppWelcome } from '../../sections/@dashboard/general/app';
import { AnalyticsWidgetSummary } from '../../sections/@dashboard/general/analytics';

export default function GeneralAnalytics() {
  const { themeStretch } = useSettings();
  const currentUser = JSON.parse(localStorage.getItem('currentuser'));
  const navigate = useNavigate();
  // const [subAdmin,setsubAdmin]=useState(0)
  // const [plan,setplan]=useState(0)
  // const [membership,setmembership]=useState(0)
  const [join,setjoin]=useState(0)
  useEffect(() => {
    getCounts();
  }, []);

  // const getCounts = async () => {
  //   try {
  //     const response = await axiosInstance.get('admin/dashboard');
  //     console.log('data',response)
  //     const {totalPlan,totalMembership,totalSubadmin,totalJoinEmail}=response?.data
  //     setsubAdmin(totalSubadmin)
  //     setplan(totalPlan)
  //     setmembership(totalMembership)
  //     setjoinEmail(totalJoinEmail)
  //      console.log(response.data)
  //   } catch (error) {
  //     console.log(error, 'chapter--->>>>');
  //   }
  // };
  const getCounts = async () => {
    try {
      const response = await axiosInstance.get('talent');
      console.log('data',response)
      const total=response?.data?.data;
      // setsubAdmin(totalSubadmin)
      // setplan(totalPlan)
      // setmembership(totalMembership)
      setjoin(total)
       console.log(response.data?.data,'chapter--->>>>')
    } catch (error) {
      console.log(error, 'chapter--->>>>');
    }
  };

  return (
    <Page title="Dashboard">
      <Container maxWidth={themeStretch ? false : 'xl'}>
        <Grid container spacing={3}>
          {/* <Grid item xs={12} sm={12} md={12}>
            <AppWelcome displayName={currentUser?.name} />
          </Grid> */}
          {currentUser?.is_admin ? (
            <>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                onClick={() => {
                  navigate(PATH_DASHBOARD.element.element);
                }}
              >
                <AnalyticsWidgetSummary
                  title="Sub Admin"
                  total={""}
                  color="error"
                  icon={'majesticons:users-line'}
                  // icon={'octicon:organization-16'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                onClick={() => {
                  navigate(PATH_DASHBOARD.dorm.dorm);
                }}
              >
                <AnalyticsWidgetSummary
                color="warning"
                  title="Subscriptions"
                  total={""}
                  icon={'material-symbols-light:subscriptions-rounded'}
                />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                onClick={() => {
                  navigate(PATH_DASHBOARD.magictype.magictype);
                }}
              >
                <AnalyticsWidgetSummary title="Mailing" total={""} color="info" icon="fluent:mail-12-filled" />
              </Grid>
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                onClick={() => {
                  navigate(PATH_DASHBOARD.spell.spell);
                }}
              >
                <AnalyticsWidgetSummary title="Members Ship" total={""} color="success" icon="fluent:mail-12-filled" />
              </Grid>
            </>
          ) : (
            <>
              {/* <Grid
                item
                xs={12}
                sm={6}
                md={4}
                
                onClick={() => {
                  navigate(PATH_DASHBOARD.dorm.dorm);
                }}
              >
                <AnalyticsWidgetSummary
                  title="Subscriptions"
                  total={plan}
                   color="warning"
                  icon={'material-symbols-light:subscriptions-rounded'}
                />
              </Grid>

              <Grid
                item
                xs={12}
                sm={6}
                md={4}
                onClick={() => {
                  navigate(PATH_DASHBOARD.spell.spell);
                }}
              >
                <AnalyticsWidgetSummary title="Members Ship" total={membership} color="info" icon={'material-symbols:card-membership-outline'} />
              </Grid> */}
              <Grid
                item
                xs={12}
                sm={12}
                md={4}
                onClick={() => {
                  navigate(PATH_DASHBOARD.list.list);
                }}
              >
                <AnalyticsWidgetSummary title="Talent list" total={join?.length} color="success" icon="material-symbols:card-membership-outline" />
              </Grid>
            </>
          )}
        
        </Grid>
      </Container>
    </Page>
  );
}
