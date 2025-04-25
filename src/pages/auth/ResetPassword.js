/* eslint-disable react/prop-types */
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
import Page from '../../components/Page';
// sections
import { ResetPasswordForm } from '../../sections/auth/reset-password';

const RootStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0),
}));

export default function ResetPassword({usertype}) {
console.log(usertype,'resetpassword')
  return (
    <Page title="Reset Password" sx={{ height: 1 }}>
      <RootStyle>
        <LogoOnlyLayout />

        <Container>
          <Box sx={{ maxWidth: 480, mx: 'auto' }}>
       
                <Typography variant="h3" paragraph>
                  Forgot your password?
                </Typography>
                <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                  Please enter the email address associated with your account and We will email you a link to reset your
                  password.
                </Typography>

                <ResetPasswordForm usertype={usertype} />

                <Button fullWidth size="large" component={RouterLink} to='/' sx={{ mt: 1 }}>
                  Back
                </Button>
             
          </Box>
        </Container>
      </RootStyle>
    </Page>
  );
}
