/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-key */
/* eslint-disable react/prop-types */

import { Card, Typography,Stack,Box ,Divider} from '@mui/material';


export default function ProfileGallery({ data }) {
 
  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="h4" sx={{ mb: 3 }}>
        State Formula
      </Typography>

      <Card sx={{ p: 3 }}>
    
      {data?.stat_formula?.map(e=>{
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


      </Card>
      
    </Box>
  );
}