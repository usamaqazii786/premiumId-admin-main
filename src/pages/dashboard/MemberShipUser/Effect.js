/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect ,useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useSnackbar } from 'notistack';
import {
  Box,
  Button,
  Container,
  IconButton
} from '@mui/material';
import {  Link as RouterLink,useParams } from 'react-router-dom';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Effect() {

  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 50,
      },
      {
        accessorKey: "level",
        header: "Level",
        size: 100,
      },
      {
        accessorKey: "effect",
        header: "Effect Tag",
        size: 350,
        Cell: ({ renderedCellValue }) => (
            renderedCellValue?.map((effect, index) => <Button  variant="contained"  sx={{ borderRadius: '20px', marginRight: '4px',marginBottom:'2px'  }} key={index}>{effect}</Button>  )
        ),
      },
      {
        accessorKey: "thumbnail",
        header: "Thumbnail",
        size: 150,
        Cell: ({ renderedCellValue }) => (
          <img src={renderedCellValue} alt="Thumbnail" style={{ width: "70px", height: '70px',borderRadius:'20px' }} />
        ),
      },
    ],
    []
  );

  const [tableData,setTableData]=useState([])

  useEffect(() => {
    GetEffect()
  }, []);
  
  async function GetEffect(){
    try{
      axios.get(`show/spell-effect?spell_id=${id}`)
      .then((res)=>{
        console.log(res)
        if(res.data.status === true){
          setTableData(res?.data?.data)
        }
      })
    }
    catch(error){
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }

  async function handleDelete(rowdata) {
    try {
      await axios.get(`delete/spell-effect/${rowdata}`)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar(response?.data?.message);
        GetEffect();
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }

  return (
    <Page title="Effect">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Effect"
          links={[
            { name: '', href: '' },]}
            action={ <Button
                variant="contained"
                startIcon={<Iconify icon="eva:arrow-left-fill" />}
                component={RouterLink}
                to={PATH_DASHBOARD.spell.spell}
              >
                Back to Spell
              </Button>}/>
     
          <MaterialReactTable
          columns={columns}
          data={tableData}
          enableRowActions
          renderRowActions={({ row}) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                gap: "5px",
                justifyContent: "flex-center",
              }}
            >
              <IconButton
                color="error"
                sx={{
                  border: "1px solid",
                  borderColor: "error.main",
                }}
                 onClick={() => {handleDelete(row.original.id)}}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          positionActionsColumn="last"
        /> 
      </Container>
    </Page>
  );
}


