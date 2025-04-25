/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-invalid-html-attribute */
/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect ,useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import { Delete as DeleteIcon } from "@mui/icons-material";
import { Link as RouterLink } from 'react-router-dom';
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
import { getRegistrationForm } from '../../../redux/slices/RegistrationForm';
import axios from '../../../utils/axios';
// routes
// components
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';


export default function Form() {
  const { enqueueSnackbar } = useSnackbar();

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 1,
      },
      {
        accessorKey: "form",
        header: "Forms",
        size: 20,
        Cell: ({ row }) => (
          <a href={row?.original?.form} rel="" style={{ width: "60px", height: '60px',borderRadius:'15px' }} >{row?.original?.form}</a>
        ),
      },
    ],
    []
  );

  const dispatch = useDispatch();
  const { registrationForm } = useSelector((state) => state.registrationForm);
  const [tableData,setTableData]=useState([]);

  useEffect(() => {
    dispatch(getRegistrationForm());
  }, []);

  useEffect(() => {
    if (registrationForm?.length) {
      setTableData(registrationForm);
    }
  }, [registrationForm]);

  async function handleDelete(rowdata) {
    try {
      await axios.delete(`/api/clinic/forms/${rowdata}`)
      .then((response)=>{ 
        if(response?.data?.status === true){
        enqueueSnackbar('Clinic Deleted Successfully');
        dispatch(getRegistrationForm());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{ 
        variant: 'error'
      });
      console.error(error);
    }
  }
  

  return (
    <Page title="Registration Form">
      <Container maxWidth='lg'>
        <HeaderBreadcrumbs
          heading="Forms"
          links={[
            { name: '', href: '' },]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to='/dashboard/addForm'
            >
              New Forms
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
              {/* <IconButton
                color="primary"
                sx={{
                  border: "1px solid",
                  borderColor: "primary.main",
                }}
                onClick={()=>{navigate(`/dashboard/editForm/${row.original.id}`)}}
              >
                <EditIcon />
              </IconButton> */}
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


