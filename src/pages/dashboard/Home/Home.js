import { styled } from '@mui/material/styles';
import { Box, Grid, Card, Stack, Container, Typography, CardContent } from '@mui/material';
import { useNavigate } from 'react-router';
import { PATH_ROLE_LOGIN } from '../../../routes/paths'
import { AnalyticsWidgetSummary } from '../../../sections/@dashboard/general/analytics';
// components
import Page from '../../../components/Page';
// sections



// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

export default function Home() {

  const navigate = useNavigate();

  return (
    <Page title="Panel">
      <RootStyle>
        <Container maxWidth="md">
          <Stack direction="row" alignItems="center" sx={{ mb: 5, mt: 10 }}>
            <Box sx={{ flexGrow: 4 }}>
              <Typography variant="h4" gutterBottom>
                Sign in Shadow Match
              </Typography>
            </Box>
          </Stack>
          <Card>
            <CardContent>
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  onClick={() => {
                    navigate(PATH_ROLE_LOGIN.admin);
                  }}
                >
                  <AnalyticsWidgetSummary title={'Admin'} icon={'ri:admin-fill'} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={6}
                  onClick={() => {
                    navigate(PATH_ROLE_LOGIN.company);
                  }}
                >
                  <AnalyticsWidgetSummary title={'Employee'} icon={'subway:admin-1'} />
                </Grid>
                <Grid
                  item
                  xs={12}
                  sm={12}
                  md={12}
                  onClick={() => {
                    navigate(PATH_ROLE_LOGIN.clinic);
                  }}
                >
                  <AnalyticsWidgetSummary title={'Clinic'} icon={'material-symbols:supervisor-account'} />
                </Grid>
              
             
              </Grid>
            </CardContent>
          </Card>
        </Container>
      </RootStyle>
    </Page>
  );
}
