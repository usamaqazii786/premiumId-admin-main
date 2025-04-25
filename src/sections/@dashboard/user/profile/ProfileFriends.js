/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { Icon } from '@iconify/react';
import { Box, Card, Stack,Divider ,Button,Typography } from '@mui/material';


export default function ProfileFriends({ data}) {


  return (
    <Box sx={{ mt: 5 }}>

   {data?.spell_one && <>
    <Typography variant="h4" sx={{ mb: 3 }}>
    Spell One  Information  
    <Icon icon="pepicons-pop:fire"  width={30} height={30} />
  </Typography>
  <Card sx={{ p: 3 }}>


    <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} sx={{ py: 1,mt:2,mb:2 }}>
    <Stack width={1} textAlign="center">
    <Typography variant="h5">{data?.spell_one?.name} {data?.spell_one?.slug}</Typography>
    <Typography variant="body2" sx={{ color: 'text.secondary' }}>Name</Typography>
    </Stack>

      <Stack width={1} textAlign="center">
        <Typography variant="h5">{data?.spell_one?.element?.name}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Element Name</Typography>
      </Stack>
    </Stack>


{data?.spell_one?.effect.map(e=>

<>
<Divider/>
<Stack direction="row" divider={<Divider orientation="vertical" flexItem />} sx={{ py: 1,mt:2 }}>
   <Stack width={1} textAlign="center">
 <Typography variant="h5">{e?.level}</Typography>
 <Typography variant="body2" sx={{ color: 'text.secondary',mt:3 }}>Level</Typography>
   </Stack>

   <Stack width={1} textAlign="center">
   <Stack  textAlign="center" direction="row" alignItems="center">
   <div style={{margin:'0 auto',display:'block' }}>
   {e?.effect?.map(e=> <Button  variant="outlined"  sx={{ borderRadius: '20px',width:'auto',textAlign:'center' ,marginRight: '4px',marginBottom:'2px'  }} >{e}</Button>)}
   </div>
   </Stack>
   <Typography variant="body2" sx={{ color: 'text.secondary',mt:3 }}>Effect</Typography>
   </Stack>

   <Stack width={1} textAlign="center">
   <img src={e?.thumbnail} alt="Thumbnail" style={{ width: "70px", height: '70px',borderRadius:'20px',margin:'0 auto',display:'block' }} />
   <Typography variant="body2" sx={{ color: 'text.secondary',mt:3 }}>Thumbnail</Typography>
   </Stack>
 </Stack>
</>

)}

  </Card>
    </>}

    {data?.spell_two && <>
      <Typography variant="h4" sx={{ mb: 3,mt:3 }}>
      Spell Two  Information  
      <Icon icon="pepicons-pop:fire"  width={30} height={30} />
    </Typography>
    <Card sx={{ p: 3 }}>
  
  
      <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} sx={{ py: 1,mt:2,mb:2 }}>
      <Stack width={1} textAlign="center">
      <Typography variant="h5">{data?.spell_two?.name} {data?.spell_one?.slug}</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>Name</Typography>
      </Stack>
  
        <Stack width={1} textAlign="center">
          <Typography variant="h5">{data?.spell_two?.element?.name}</Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>Element Name</Typography>
        </Stack>
      </Stack>
  
      {data?.spell_two?.effect.map(e=>
        
       <>
       <Divider/>
       <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} sx={{ py: 1,mt:2 }}>
          <Stack width={1} textAlign="center">
        <Typography variant="h5">{e?.level}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary',mt:3 }}>Level</Typography>
          </Stack>
    
          <Stack width={1} textAlign="center">
          <Stack  textAlign="center" direction="row" alignItems="center">
          <div style={{margin:'0 auto',display:'block' }}>
          {e?.effect?.map(e=> <Button  variant="outlined"  sx={{ borderRadius: '20px',width:'auto',textAlign:'center' ,marginRight: '4px',marginBottom:'2px'  }} >{e}</Button>)}
          </div>
          </Stack>
          <Typography variant="body2" sx={{ color: 'text.secondary',mt:3 }}>Effect</Typography>
          </Stack>
    
          <Stack width={1} textAlign="center">
          <img src={e?.thumbnail} alt="Thumbnail" style={{ width: "70px", height: '70px',borderRadius:'20px',margin:'0 auto',display:'block' }} />
          <Typography variant="body2" sx={{ color: 'text.secondary',mt:3 }}>Thumbnail</Typography>
          </Stack>
        </Stack>
       </>
  
  )}
  
    </Card>
      </>}

    {data?.spell_three && <>
        <Typography variant="h4" sx={{ mb: 3,mt:3 }}>
        Spell Three  Information  
        <Icon icon="pepicons-pop:fire"  width={30} height={30} />
      </Typography>
      <Card sx={{ p: 3 }}>
    
    
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} sx={{ py: 1,mt:2,mb:2 }}>
        <Stack width={1} textAlign="center">
        <Typography variant="h5">{data?.spell_three?.name} {data?.spell_one?.slug}</Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>Name</Typography>
        </Stack>
    
          <Stack width={1} textAlign="center">
            <Typography variant="h5">{data?.spell_three?.element?.name}</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>Element Name</Typography>
          </Stack>
        </Stack>
    
        {data?.spell_three?.effect.map(e=>
          
        <>
        <Divider/>
        <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} sx={{ py: 1,mt:2 }}>
           <Stack width={1} textAlign="center">
         <Typography variant="h5">{e?.level}</Typography>
         <Typography variant="body2" sx={{ color: 'text.secondary',mt:3 }}>Level</Typography>
           </Stack>
     
           <Stack width={1} textAlign="center">
           <Stack  textAlign="center" direction="row" alignItems="center">
           <div style={{margin:'0 auto',display:'block' }}>
           {e?.effect?.map(e=> <Button  variant="outlined"  sx={{ borderRadius: '20px',width:'auto',textAlign:'center' ,marginRight: '4px',marginBottom:'2px'  }} >{e}</Button>)}
           </div>
           </Stack>
           <Typography variant="body2" sx={{ color: 'text.secondary',mt:3 }}>Effect</Typography>
           </Stack>
     
           <Stack width={1} textAlign="center">
           <img src={e?.thumbnail} alt="Thumbnail" style={{ width: "70px", height: '70px',borderRadius:'20px',margin:'0 auto',display:'block' }} />
           <Typography variant="body2" sx={{ color: 'text.secondary',mt:3 }}>Thumbnail</Typography>
           </Stack>
         </Stack>
        </>
    
    )}
    
      </Card>
    </>}
    
  </Box>
  );
}

