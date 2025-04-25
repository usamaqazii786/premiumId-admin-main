/* eslint-disable react/prop-types */
import { styled } from '@mui/material/styles';
import { Box, Typography,Avatar} from '@mui/material';
import cssStyles from '../../../../utils/cssStyles';
import Image from '../../../../components/Image';

const RootStyle = styled('div')(() => ({
  '&:before': {
    ...cssStyles().bgBlur({ blur:0.05 }),
    top: 0,
    // zIndex: 9,
    // content: "''",
    width: '100%',
    height: '50%',
    position: 'absolute',
  }
}
));

const InfoStyle = styled('div')(({ theme }) => ({
  left: 0,
  right: 0,
  zIndex: 99,
  position: 'absolute',
  marginTop: theme.spacing(5),
  [theme.breakpoints.up('md')]: {
    right: 'auto',
    display: 'flex',
    alignItems: 'center',
    left: theme.spacing(3),
    bottom: theme.spacing(3),
  },
}));

export default function ProfileCover({ myProfile }) {

  const { fname,lname,image} = myProfile;
  return (
    <RootStyle>
      <InfoStyle>
      <Avatar alt={''} src={image} sx={{ width: 148, height: 148,border:'2px solid white',boxShadow:''}} />

        <Box
          sx={{
            my:-18,
            ml: { md: 3 },
            mt: { xs: 5, md: 0 },
            color: 'common.white',
            textAlign: { xs: 'bottom', md: 'left' },
          }}
        >
          <Typography variant="h4" sx={{ color: 'text.secondary' }}>{`${fname} ${lname}`}</Typography>
        </Box>
      </InfoStyle>
      <Image alt="profile cover" src={image} sx={{ position: 'absolute',width:'auto',height:'auto', top: 0, left: 0, right: 0, bottom: 0 }} />
    </RootStyle>
  );
}
