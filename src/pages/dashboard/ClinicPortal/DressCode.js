/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect ,useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import EditIcon from "@mui/icons-material/Edit";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
// @mui
import {
  Box,
  Button,
  Container,
  IconButton,
} from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getDressCode } from '../../../redux/slices/DressCode';
import axios from '../../../utils/axios';
// routes
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';


export default function DressCode() {
  const { enqueueSnackbar } = useSnackbar();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 1,
      },
      {
        accessorKey: "dress_code",
        header: "Name",
        size: 15,
      },
    ],
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { dresscode } = useSelector((state) => state.dresscode);
  const [tableData,setTableData]=useState([]);

  useEffect(() => {
    dispatch(getDressCode());
  }, []);

  useEffect(() => {
    if (dresscode?.length) {
      setTableData(dresscode);
    }
  }, [dresscode]);

  async function handleDelete(rowdata) {
    try {
      await axios.delete(`/api/clinic/dress_code/${rowdata}`)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar('Dress code Deleted Successfully');
        dispatch(getDressCode());
        // window.location.reload();
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }
  


  return (
    <Page title="Dress Code">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Dress Code"
          links={[
            { name: '', href: '' },]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to='/dashboard/AddDressCode'
            >
              New Dress Code
            </Button>
          }
        />
     
          <MaterialReactTable
          columns={columns}
          data={tableData}
          enableRowActions
          renderRowActions={({ row}) => (
            <Box
              sx={{
                display: "flex",
                flexWrap: "nowrap",
                gap: "10px",
                justifyContent: "flex-center",
              }}
            >
              <IconButton
                color="primary"
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                }}
                onClick={()=>navigate(`/dashboard/editdresscode/${row.original.id}`)}
              >
                <EditIcon />
              </IconButton>
              <IconButton
                color="error"
                sx={{
                  border: "1px solid",
                  borderColor: "error.main",
                }}
                 onClick={() => {
                  handleDelete(row.original.id)
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


