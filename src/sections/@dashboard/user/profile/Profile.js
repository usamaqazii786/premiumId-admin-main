/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */
import { Card, Stack, Grid, CardHeader, CardContent,Divider, Typography,Link } from '@mui/material';
import Image from '../../../../components/Image';
import ProfileAbout from './ProfileAbout';


export default function Profile({data,additionalInfo,signature}) {
  const currentUser = JSON.parse(localStorage.getItem('currentuser'))

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={4}>
      <ProfileAbout profile={data} />
      <Card sx={{ marginTop: '10px' }}>
      <CardHeader title="All Form" />
        <Stack spacing={3}>
        <CardContent>
        <Stack spacing={2}>
        <Stack direction="row">
          <Typography variant="body2">
            form :
            <Link component="span" variant="subtitle2" color="text.primary">
              {/* {profile?.university} */}
              jsnaj
            </Link>
          </Typography>
        </Stack>
        </Stack>
      </CardContent>




      

        </Stack>
        </Card>
      </Grid>

      <Grid item xs={12} md={8}>
      <Card>
      <CardHeader title="Appointment Requirement" />
        <Stack spacing={3}>
        <CardContent>
        <Stack spacing={2}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
             Dress Code 
            </Typography>
            <Typography variant="subtitle2">{currentUser?.dress_code?.dress_code}</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
           Check-In Info
            </Typography>
            <Typography variant="subtitle2">{currentUser?.checkin_info?.info}</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            TB Test
            </Typography>
            <Typography variant="subtitle2">{additionalInfo?.title}</Typography>
          </Stack>
          <Divider />
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Additional Comment 
            </Typography>
            <Typography variant="subtitle2">{additionalInfo?.additional_comment}</Typography>
          </Stack>
          <Divider />
          <Stack direction="column" >
          <Typography variant="body2">Test Report</Typography>
          <Image alt="Test Reprt Image" src={additionalInfo?.test} sx={{ borderRadius: 1 }} />
          </Stack>
          <Divider />
          <Stack direction="column" >
          <Typography variant="body2">Student signature</Typography>
          <Image alt="Test Reprt Image" src={signature} ratio="16/9"  sx={{ borderRadius: 1 }} />
          </Stack>
        </Stack>
      </CardContent>




      

        </Stack>
        </Card>
      </Grid>
{/* 
      <Grid item sx={12} md={4}>
      <Stack spacing={3}>
      <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
      <Box sx={{ flexGrow: 1 }}>
        <Typography  variant="h4">TAG</Typography>

        <Stack direction="row" alignItems="center" spacing={1} sx={{ mt: 2, mb: 2 }}>
          <Typography component="span" variant="subtitle2">
          Total
          </Typography>
          <Typography component="span" variant="subtitle2">
        {data?.card_tag?.length}
          </Typography>
        </Stack>
        {data?.card_tag?.map(e=><Button  variant="outlined"  sx={{ borderRadius: '20px', marginRight: '4px',marginBottom:'2px' }} >{e?.tag?.name}</Button>)}
        
      </Box>
      <IconWrapperStyle
      sx={{
        
          color: 'secondary',
          bgcolor: alpha(theme.palette.error.main, 0.16),

      }}
    >
    <Iconify
    width={86}
    height={86}
    icon='solar:tag-linear'
  />
    </IconWrapperStyle>
    </Card>
      </Stack>
      </Grid> */}
    </Grid>
  );
}
