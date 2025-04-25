/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable camelcase */
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { m } from 'framer-motion';
import { useSnackbar } from 'notistack';
// @mui
import { useTheme, styled } from '@mui/material/styles';
import { Box, Grid, Card, Stack, Button, Divider, Container, Typography } from '@mui/material';
import axios from '../../utils/axios';
import Page from '../../components/Page';
import Image from '../../components/Image';
import Iconify from '../../components/Iconify';
import { varFade, MotionViewport } from '../../components/animate';


const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

export default function Subscription() {
  const theme = useTheme();
  const [sub, setSub] = useState([]);

  const isLight = theme.palette.mode === 'light';

  useEffect(() => {
    handleSubs();
  }, []);

  const handleSubs = async () => {
    try {
      const subscription = await axios.get('/api/plans');
      console.log(subscription, 'subcription');
      setSub(subscription?.data?.data);
    } catch (e) {
      console.log(e?.message);
    }
  };

  return (
    <Page title="Subscription">
    <RootStyle>
      <Container component={MotionViewport}>
        <Box sx={{ mb: 10, textAlign: 'center' }}>
          <m.div variants={varFade().inUp}>
            <Typography component="div" variant="overline" sx={{ mb: 2, color: 'text.disabled' }}>
              pricing plans
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography variant="h2" sx={{ mb: 3 }}>
              The right plan for your business
            </Typography>
          </m.div>
          <m.div variants={varFade().inDown}>
            <Typography
              sx={{
                color: isLight ? 'text.secondary' : 'text.primary',
              }}
            >
              Choose the perfect plan for your needs. Always flexible to grow
            </Typography>
          </m.div>
        </Box>

        <Grid container spacing={5}>
          {sub?.map((plan,i) => (
            <Grid key={i} item xs={12} md={4}>
              <m.div >
                <PlanCard plan={plan} />
              </m.div>
            </Grid>
          ))}
        </Grid>

      </Container>
    </RootStyle>
    </Page>
  );
}

PlanCard.propTypes = {
  plan: PropTypes.shape({
    license: PropTypes.string,
    commons: PropTypes.arrayOf(PropTypes.string),
    icons: PropTypes.arrayOf(PropTypes.string),
    options: PropTypes.arrayOf(PropTypes.string),
  }),
};

function PlanCard({ plan }) {

  const { title, description, duration, duration_type, price,id } = plan;
  const currentUser = JSON.parse(localStorage.getItem('currentuser'));

  const standard = title;
  const plus = title;
  const { enqueueSnackbar } = useSnackbar();

  const OnSubmit = async (id) => {
    try {
      await axios.post(`/api/company/plans/${id}/subscribe`)  
      .then((response)=>{ 
        console.log(response,'response subscription---->>>>')
        if(response?.data?.status === true){
            const redirectUrl = response?.data?.data;
        if (redirectUrl) {
            window.location.href = redirectUrl;
        } 
        // navigate(PATH_DASHBOARD.magictype.magictype);
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  };

  return (
    <Card
      sx={{
        p: 5,
        boxShadow: 0,
      }}
    >
      <Stack spacing={5}>
        <div>
          <Typography variant="overline" component="div" sx={{ mb: 2, color: 'text.disabled' }}>
            LICENSE
          </Typography>
          <Typography variant="h4">{title}</Typography>
        </div>

        <Stack spacing={1.5} direction="row" alignItems="center" sx={{}}>
          <Iconify
            icon={'eva:checkmark-fill'}
            sx={{
              width: 20,
              height: 20,
              color: 'primary.main',
            }}
          />
          <Typography variant="body2">{description}</Typography>
        </Stack>
        <Stack spacing={1.5} direction="row" alignItems="center" sx={{}}>
          <Iconify
            icon={'eva:checkmark-fill'}
            sx={{
              width: 20,
              height: 20,
              color: 'primary.main',
            }}
          />
          <Typography variant="body2">Mutliple Clinics</Typography>
        </Stack>
        <Stack spacing={1.5} direction="row" alignItems="center" sx={{}}>
          <Iconify
            icon={'eva:checkmark-fill'}
            sx={{
              width: 20,
              height: 20,
              color: 'primary.main',
            }}
          />
          <Typography variant="body2">Mutliple Providers</Typography>
        </Stack>
        <Stack spacing={1.5} direction="row" alignItems="center" sx={{}}>
          <Iconify
            icon={'eva:checkmark-fill'}
            sx={{
              width: 20,
              height: 20,
              color: 'primary.main',
            }}
          />
          <Typography variant="overline">{`${duration} ${duration_type} Duration`}</Typography>
        </Stack>
        <Stack
      spacing={1.5}
      direction="row"
      alignItems="center"
      justifyContent="center" 
      sx={{}}
    >
      <Typography variant="h4">{`$${price}`}</Typography>
        </Stack>

        <Button
          size="large"
          fullWidth
          variant="contained"
          target="_blank"
          rel="noopener"
         onClick={()=>{OnSubmit(id)}}
        >
          Choose Plan
        </Button>
      </Stack>
    </Card>
  );
}
