/* eslint-disable camelcase */
import PropTypes from 'prop-types';
// @mui
import { styled } from '@mui/material/styles';
import { Link, Card, Typography, CardHeader, Stack } from '@mui/material';
// components
import Iconify from '../../../../components/Iconify';

// ----------------------------------------------------------------------

const IconStyle = styled(Iconify)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2),
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object,
};

export default function ProfileAbout({ profile }) {

  return (
    <Card>
      <CardHeader title="About" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{profile?.about_me}</Typography>

        <Stack direction="row">
          <IconStyle icon={'eva:pin-fill'} />
          <Typography variant="body2">
            Live at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {profile?.city}
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'eva:email-fill'} />
          <Typography variant="body2">{profile?.email}</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={'fa:university'} />
          <Typography variant="body2">
            Studied at &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {profile?.university}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={'map:postal-code'} />
          <Typography variant="body2">
            Address : &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {profile?.address}
            </Link>
          </Typography>
        </Stack>
        <Stack direction="row">
          <IconStyle icon={'material-symbols:flag-outline'} />
          <Typography variant="body2">
            State : &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              {profile?.state}
            </Link>
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
