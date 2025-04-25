/* eslint-disable react/prop-types */
import { Box,IconButton,Card, Typography,CardContent } from '@mui/material';
import { styled } from '@mui/material/styles';
import cssStyles from '../../../../utils/cssStyles';
import Image from '../../../../components/Image';
import Iconify from '../../../../components/Iconify';

const CaptionStyle = styled(CardContent)(({ theme }) => ({
  ...cssStyles().bgBlur({ blur: 2, color: theme.palette.grey[900] }),
  bottom: 0,
  width: '100%',
  display: 'flex',
  alignItems: 'center',
  position: 'absolute',
  justifyContent: 'space-between',
  color: theme.palette.common.white,
}));

export default function ProfileFollowers({ data }) {


  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Buddy
      </Typography>

    {/*
    <Grid container spacing={3}>
       {data?.buddy_one &&
        <Grid key={data?.buddy_one?.id} item xs={12} md={4}>
           
        <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Avatar alt={data?.buddy_one?.name} src={data?.buddy_one?.image} sx={{ width: 48, height: 48 }} />
        <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {data?.buddy_one?.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {data?.buddy_one?.slug}
            </Typography>
          </Box>
        </Box>
      </Card>
        </Grid>
      }
      {data?.buddy_two &&
        <Grid key={data?.buddy_two?.id} item xs={12} md={4}>
           
        <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Avatar alt={data?.buddy_two?.name} src={data?.buddy_two?.image} sx={{ width: 48, height: 48 }} />
        <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {data?.buddy_two?.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {data?.buddy_two?.slug}
            </Typography>
          </Box>
        </Box>
      </Card>
        </Grid>
      }
      {data?.buddy_three &&
        <Grid key={data?.buddy_three?.id} item xs={12} md={4}>
           
        <Card sx={{ display: 'flex', alignItems: 'center', p: 3 }}>
        <Avatar alt={data?.buddy_three?.name} src={data?.buddy_three?.image} sx={{ width: 48, height: 48 }} />
        <Box sx={{ flexGrow: 1, minWidth: 0, pl: 2, pr: 1 }}>
          <Typography variant="subtitle2" noWrap>
            {data?.buddy_three?.name}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Iconify icon={'eva:pin-fill'} sx={{ width: 16, height: 16, mr: 0.5, flexShrink: 0 }} />
            <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
              {data?.buddy_three?.slug}
            </Typography>
          </Box>
        </Box>
      </Card>
        </Grid>
      }
      </Grid>
  */}

      <Card sx={{ p: 3 }}>
      <Box
        sx={{
          display: 'grid',
          gap: 3,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(3, 1fr)',
          },
        }}
      >
        
          {data?.buddy_one && <>
            <GalleryItem key={data?.buddy_one?.id} image={data?.buddy_one?.image} name={data?.buddy_one?.name} slug={data?.buddy_one?.slug}/> </>}
          {data?.buddy_two && <>
            <GalleryItem key={data?.buddy_two?.id} image={data?.buddy_two?.image} name={data?.buddy_two?.name} slug={data?.buddy_two?.slug}/></>}
          {data?.buddy_three &&  <> <GalleryItem key={data?.buddy_three?.id} image={data?.buddy_three?.image} name={data?.buddy_three?.name} slug={data?.buddy_three?.slug}/></>}
      </Box>
    </Card>


    </Box>
  );
}
function GalleryItem({image, onOpenLightbox,slug,name}) {

  return (
    <Card sx={{ cursor: 'pointer', position: 'relative' }}>
      <Image alt="gallery image" ratio="1/1" src={image} onClick={() => onOpenLightbox(image)} />

      <CaptionStyle>
        <div>
          <Typography variant="subtitle1">{name}</Typography>
          <Typography variant="body2" sx={{ opacity: 0.72 }}>{slug}</Typography>
        </div>
        <IconButton color="inherit">
          <Iconify icon={'eva:more-vertical-fill'} width={20} height={20} />
        </IconButton>
      </CaptionStyle>
    </Card>
  );
}


