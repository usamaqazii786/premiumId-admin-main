/* eslint-disable arrow-body-style */
import {  Link ,useParams } from 'react-router-dom';
import { Button,Card, Stack,Container, Grid,  CardContent,Divider, Typography } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Iconify from '../../../components/Iconify';
import { useSelector } from '../../../redux/store';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';


export default function CardDetail() {
  const { id } = useParams();

  const { cards } = useSelector((state) => state.card);
  const currentCard = cards?.find((card) =>card?.id === +(id))
  console.log(currentCard)
  return (
    <Page title="Card Detail">
    <Container maxWidth='lg'>
    <HeaderBreadcrumbs
    heading={currentCard?.name}
    links={[
      { name: '', href: '' },]}
      action={ <Button
          variant="contained"
          startIcon={<Iconify icon="eva:arrow-left-fill" />}
          component={Link}
          to={PATH_DASHBOARD.card.card}
        >
          Back to Card
        </Button>}/>
      <Grid container spacing={3}>

      <Grid  xs={12} md={8}>
      <Grid item xs={12} md={12}>
      <Typography variant="h6">State Formula</Typography>
  
      {currentCard?.stat_formula?.map(e=>{
      // eslint-disable-next-line react/jsx-key
      return   <Card sx={{ py: 3,mt:3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
      <Stack width={1} textAlign="center">
      <Typography variant="h5">{e?.level}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>Level</Typography>
      </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h5">{e?.hp_g}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Hp</Typography>
        </Stack>
        <Stack width={1} textAlign="center">
          <Typography variant="h5">{e?.atk_g}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Attack 
          </Typography>
        </Stack>
      </Stack>
    </Card>
      })}
      </Grid>


      </Grid>

    <Grid item xs={12} md={4}>

    <Card sx={{ py: 3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h5">{currentCard?.hp_formula}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            HP Formula
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h5">{currentCard?.atk_formula}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Attack Formula
          </Typography>
        </Stack>
      </Stack>
    </Card>

        <Card sx={{ py: 3,mt:3 }}>
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />}>
        <Stack width={1} textAlign="center">
          <Typography variant="h5">{currentCard?.g_hp_modifier}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            HP Modifier
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h5">{currentCard?.g_atk_modifier}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Attack Modifier
          </Typography>
        </Stack>
      </Stack>
        </Card>

        <Card sx={{ mb: 3 ,mt:3}}>
    <CardContent>
    <Stack spacing={2}>
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         Magic type
        </Typography>
        <Typography variant="subtitle2">{currentCard?.magic_type?.name}</Typography>
      </Stack>
      <Divider />
      <Stack direction="row" justifyContent="space-between">
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        Rarity
        </Typography>
        <Typography variant="subtitle2">{currentCard?.rarity?.name}</Typography>
      </Stack>
    </Stack>
  </CardContent>
        </Card>

      {currentCard?.spell_one && 
        <Card sx={{ mb: 3 ,mt:3}}>
<CardContent>
<Stack spacing={2}>
{currentCard?.spell_one &&
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    Spell One
    </Typography>
    <Typography variant="subtitle2">{currentCard?.spell_one?.name}</Typography>
  </Stack>
}
{currentCard?.spell_two &&
 <>
 <Divider />
 <Stack direction="row" justifyContent="space-between">
   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
   Spell Two
   </Typography>
   <Typography variant="subtitle2">{currentCard?.spell_two?.name}</Typography>
 </Stack>
 </>
}
{currentCard?.spell_three &&
<>
<Divider />
<Stack direction="row" justifyContent="space-between">
  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  Spell Three
  </Typography>
  <Typography variant="subtitle2">{currentCard?.spell_three?.name}</Typography>
</Stack>
</>
}
</Stack>
</CardContent>
        </Card>}

      {currentCard?.buddy_one &&
      <Card sx={{ mb: 3 ,mt:3}}>
<CardContent>
<Stack spacing={2}>
{currentCard?.buddy_one &&
  <Stack direction="row" justifyContent="space-between">
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
    Buddy 1
    </Typography>
    <Typography variant="subtitle2">{currentCard?.buddy_one?.name}</Typography>
  </Stack>
}
{currentCard?.buddy_two &&
 <>
 <Divider />
 <Stack direction="row" justifyContent="space-between">
   <Typography variant="body2" sx={{ color: 'text.secondary' }}>
   Buddy 2
   </Typography>
   <Typography variant="subtitle2">{currentCard?.buddy_two?.name}</Typography>
 </Stack>
 </>
}
{currentCard?.buddy_three &&
<>
<Divider />
<Stack direction="row" justifyContent="space-between">
  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
  Buddy 3
  </Typography>
  <Typography variant="subtitle2">{currentCard?.buddy_three?.name}</Typography>
</Stack>
</>
}
</Stack>
</CardContent>
        </Card>
    } 

     </Grid>

    </Grid>
   
       
    </Container>
  </Page>

  );
}

