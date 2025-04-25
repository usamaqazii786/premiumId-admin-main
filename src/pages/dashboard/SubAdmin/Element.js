/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import { useState, useEffect, useMemo } from 'react';
import MaterialReactTable from 'material-react-table';
import EditIcon from '@mui/icons-material/Edit';
import { Delete as DeleteIcon } from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { Box, Button, Container, IconButton ,Typography,Divider,Grid,Stack,Dialog} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import axios from '../../../utils/axios';
// import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from '../../../redux/store';
import { getelements } from '../../../redux/slices/element';
// import axios from '../../../utils/axios';
import { PATH_DASHBOARD } from '../../../routes/paths';
import Page from '../../../components/Page';
import Iconify from '../../../components/Iconify';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';

export default function Element() {
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const [deletedId, setDeletedId] = useState('');
  const imagepath =localStorage.getItem('imagepath');
  console.log(imagepath,'imagepath')

  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
        size: 1,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 10,
      },
     
      {
        accessorKey: 'email',
        header: 'Email',
        size: 10,
      },
     
      {
        accessorKey: "status",
        header: "Status",
        size: 10,
        Cell: ({ row }) => (
          row?.original?.is_active
          ? (
            <Button fullWidth variant="contained" color="success" endIcon={<Iconify icon={'eva:checkmark-circle-2-fill'} />} onClick={()=>{handleStatus(row?.original?.id,0)}}>
              Active
            </Button>
          ) : (
            <Button fullWidth variant="contained" color="error" endIcon={<Iconify icon={'eva:close-circle-fill'} />} onClick={()=>{handleStatus(row?.original?.id,1)}}>
              Deactive
            </Button>
          )
        ),
        
      },
      {
        accessorKey: "image",
        header: "Image",
        size: 2,
        Cell: ({ row }) => (
          <img 
            src={`${imagepath}${row?.original?.image}`} 
            alt="subadmin" 
            style={{ width: "60px", height: "60px", borderRadius: "15px" }} 
          />
        ),
      },
    
    ],
    []
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { elements } = useSelector((state) => state.element);
  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    dispatch(getelements());
  }, [dispatch]);

  useEffect(() => {
    if (elements.length) {
      setTableData(elements);
    }
  }, [elements]);

  async function handleDelete() {
    try {
      await axios.delete(`admin/admins/${deletedId}`)
      .then((response)=>{
        if(response?.data){
          setShow(false)
        enqueueSnackbar('Sub Admin Deleted Successfully');
        dispatch(getelements());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{
        variant: 'error'
      });
      console.error(error);
    }
  }

  async function handleStatus(id,status) {
    try {
      const subAdmin=new FormData();
      subAdmin.append('id',id)
      subAdmin.append('is_active',status)
      await axios.post(`admin/admins/changeStatus`,subAdmin)
      .then((response)=>{
        if(response?.data){
        enqueueSnackbar('Sub Admin Status Changed Successfully');
        dispatch(getelements());
      }})
    } catch (error) {
      enqueueSnackbar(error?.message,{
        variant: 'error'
      });
      console.error(error);
    }
  }

  const handleClose = () => {
    setShow(false);
  };

  return (
    <Page title="Sub Admin">
      <Container maxWidth="xl">
        <HeaderBreadcrumbs
          heading="Sub Admin"
          links={[{ name: '', href: '' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
              component={RouterLink}
              to={PATH_DASHBOARD.element.addelement}
            >
              New Sub Admin
            </Button>
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
                color="success"
                sx={{
                  border: '1px solid',
                  borderColor: 'success.main'
                }}
                onClick={() => {
                  navigate(PATH_DASHBOARD.element.editelement(row.original.id));
                }}
              >
                <EditIcon color='green'/>
              </IconButton>
              <IconButton
                color="error"
                sx={{
                  border: '1px solid',
                  borderColor: 'error.main',
                }}
                onClick={() => {
                  setDeletedId(row.original.id);
                  setShow(true)
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Box>
          )}
          positionActionsColumn="last"
        />
        <Dialog open={show} onClose={handleClose} fullWidth maxWidth="sm">
          <Stack sx={{ py: 4, px: 4, alignItems: 'center' }} spacing={2}>
            <Iconify  icon="mi:delete" width={60} height={60} color='red'/>{/* Adjust the size */}
            <Typography variant="h6" align="center">
              Do You Want to Delete this?
            </Typography>
            <Typography align="center">Once deleted, you will not be able to recover this!</Typography>
            <Divider sx={{ width: '100%' }} />

          <Grid container spacing={1} justifyContent="center">
            <Grid item xs={12}>
              <Stack spacing={2} direction="row" justifyContent="center" py={1} my={1}>
                <Grid item xs={6} md={6}>
                  <LoadingButton
                    type="button"
                    color="success"
                    variant="outlined"
                    size="medium"
                    onClick={() => handleClose()}
                    endIcon={<Iconify icon={'eva:close-circle-fill'} />}
                    fullWidth
                  >
                    No
                  </LoadingButton>
                </Grid>
                <Grid item xs={6} md={6}>
                  <LoadingButton
                    type="button"
                    color="error"
                    variant="contained"
                    size="medium"
                    onClick={()=>handleDelete()}

                    fullWidth
                  >
                    Yes <DeleteIcon />
                  </LoadingButton>
                </Grid>
              </Stack>
            </Grid>
          </Grid>
          </Stack>
        </Dialog>
      </Container>
    </Page>
  );
}
