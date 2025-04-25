/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
// import EditIcon from "@mui/icons-material/Edit";
// import { Delete as DeleteIcon } from "@mui/icons-material";
// import { useNavigate } from 'react-router-dom';
import {
  Box,
  
  Container,
  IconButton,
} from '@mui/material';
import { Delete as DeleteIcon } from "@mui/icons-material";
// redux
// import { useSnackbar } from 'notistack';
import { useSnackbar } from 'notistack';

import axios from '../../../utils/axios';
// import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getelements } from '../../../redux/slices/element1';
// import axios from '../../../utils/axios';
// import { PATH_DASHBOARD } from '../../../routes/paths';
import Page from '../../../components/Page';
// import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Element1() {
  // const { enqueueSnackbar } = useSnackbar();
  const { enqueueSnackbar } = useSnackbar();
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 1,
      },
      {
        accessorKey: 'beau_name_at_presentation',
        header: 'Name',
        size: 10,
      },
      {
        accessorKey: 'beau_escort_name',
        header: 'Beau Escort name',
        size: 20,
      },
      {
        accessorKey: 'beau_year_presented',
        header: 'Beau year',
        size: 10,
      },
      {
        accessorKey: 'beau_sponsoring_organization',
        header: 'Beau Sponsoring',
        size: 50,
      },
      {
        accessorKey: 'beau_city',
        header: 'Beau City',
        size: 10,
      },
      {
        accessorKey: 'beau_state',
        header: 'Beau state',
        size: 10,
      },
    ],
    []
  );

  // const navigate = useNavigate();
  const dispatch = useDispatch();
  const { elements } = useSelector((state) => state.element1);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getelements());
  }, [dispatch]);

  useEffect(() => {
    if (elements.length) {
      setTableData(elements);
    }
  }, [elements]);

  // async function handleDelete(rowdata) {
  //   try {
  //     await axios.delete(`/api/admin/companies/${rowdata}`)
  //     .then((response)=>{
  //       if(response?.data?.status === true){
  //       enqueueSnackbar('Company Deleted Successfully');
  //       dispatch(getelements());
  //     }})
  //   } catch (error) {
  //     enqueueSnackbar(error?.message,{
  //       variant: 'error'
  //     });
  //     console.error(error);
  //   }
  // }

  // async function handleStatus(id) {
  //   try {
  //     await axios.put(`/api/admin/companies/${id}/active_deactive`)
  //     .then((response)=>{
  //       if(response?.data?.status === true){
  //       enqueueSnackbar('Company Status Changed Successfully');
  //       dispatch(getelements());
  //     }})
  //   } catch (error) {
  //     enqueueSnackbar(error?.message,{
  //       variant: 'error'
  //     });
  //     console.error(error);
  //   }
  // }
  async function handleDelete(rowdata) {
    const data = new FormData()
    data.append('id', rowdata);
    
    try {
      await axios.post(`api/admin/del/participant/male/form`,data)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar('Deleted Successfully');
        dispatch(getelements());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }
  return (
    <Page title="Male Participation">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="Male Participation"
          links={[{ name: '', href: '' }]}
          action={
            <></>
            //   <Button
            //     variant="contained"
            //     startIcon={<Iconify icon="eva:plus-fill" />}
            //     component={RouterLink}
            //     to={PATH_DASHBOARD.element.addelement}
            //   >
            //     New Employee
            //   </Button>
          }
        />

        <MaterialReactTable
          columns={columns}
          data={tableData}
          enableRowActions
          renderRowActions={({ row }) => (
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'nowrap',
                gap: '10px',
                justifyContent: 'flex-center',
              }}
            >
              <IconButton
                color="error"
                sx={{
                  border: '1px solid',
                  borderColor: 'error.main',
                }}
                onClick={() => {
                  handleDelete(row.original.id);
                }}
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
