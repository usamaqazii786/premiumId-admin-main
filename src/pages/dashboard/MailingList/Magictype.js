/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect ,useMemo } from 'react';
import MaterialReactTable from "material-react-table";
import { Delete as DeleteIcon } from "@mui/icons-material";
import {
  Box,
Grid,Dialog,Stack,
  Container,
  IconButton,Typography,Divider
} from '@mui/material';
// redux
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector } from '../../../redux/store';
import { getmagictypes } from '../../../redux/slices/magictype';
import axios from '../../../utils/axios';
import Page from '../../../components/Page';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Iconify from '../../../components/Iconify';


export default function Magictype() {
  const { enqueueSnackbar } = useSnackbar();
  const [show, setShow] = useState(false);
  const [deletedId, setDeletedId] = useState('');

  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
        size: 1,
      },
      {
        accessorKey: "first_name",
        header: "First Name",
        size: 5,
      },
      {
        accessorKey: "last_name",
        header: "Last Name",
        size: 5,
      },
      {
        accessorKey: "email",
        header: "Email",
        size: 10,
      },
      {
        accessorKey: "quality_life",
        header: " Enhancing the quality of life for Moorish-Americans",
        size: 20,
      },
    
      {
        accessorKey: "send_me_copy",
        header: "Send Copy of Response",
        size: 2,
        Cell: ({ row }) => (
         row?.original?.send_me_copy ? <p>YES</p>:<p>NO</p>
        ),
      },
  
    ],
    []
  );

  const dispatch = useDispatch();
  const { magictypes } = useSelector((state) => state.magictype);
  const [tableData,setTableData]=useState([])

  useEffect(() => {
    dispatch(getmagictypes());
  }, []);

  useEffect(() => {
    if (magictypes?.length) {
      setTableData(magictypes);
    }
  }, [magictypes]);

  async function handleDelete() {
    try {
      await axios.delete(`admin/join-email/${deletedId}`)
      .then((response)=>{ 
        if(response?.data){
          setShow(false)
        enqueueSnackbar('Deleted Successfully');
        dispatch(getmagictypes());
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
    <Page title="Mailing">
      <Container maxWidth='xl'>
        <HeaderBreadcrumbs
          heading="Mailing List"
          links={[
            { name: '', href: '' },]}
          action=''
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
                color="error"
                sx={{
                  border: "1px solid",
                  borderColor: "error.main",
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


