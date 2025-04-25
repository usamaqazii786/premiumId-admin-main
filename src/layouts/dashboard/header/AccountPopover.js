/* eslint-disable */
import { useSnackbar } from 'notistack';
import { useState } from 'react';
import { Link, Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import { alpha } from '@mui/material/styles';
import { Box, Divider, Typography, MenuItem, Stack, Button } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// components
import MyAvatar from '../../../components/MyAvatar';
import MenuPopover from '../../../components/MenuPopover';
import { IconButtonAnimate } from '../../../components/animate';

export default function AccountPopover() {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const currentUser = JSON.parse(localStorage.getItem('currentuser'));

  const isMountedRef = useIsMountedRef();

  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(null);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };
  const handleLogout = async () => {
    try {
      await logout();
      localStorage.removeItem('currentuser');
      navigate('/', { replace: true });

      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout!', { variant: 'error' });
    }
  };

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          p: 0,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.8),
            },
          }),
        }}
      >
        <MyAvatar />
      </IconButtonAnimate>

      <MenuPopover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        sx={{
          p: 0,
          mt: 1.5,
          ml: 0.75,
          '& .MuiMenuItem-root': {
            typography: 'body2',
            borderRadius: 0.75,
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {currentUser?.first_name}
            {/* {currentUser?.role === 'admin' ? `${currentUser?.fname} ${currentUser?.lname}` : `${currentUser?.name}`} */}
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {currentUser?.email}
          </Typography>
            {/* <Stack sx={{display:"flex"}}> */}
              <MenuItem component={RouterLink} sx={{px:0}} to={PATH_DASHBOARD.element.companyProfile}>
                Profile
              </MenuItem>
            {/* </Stack> */}
        </Box>

        {/* {currentUser?.role !== 'admin' && (
          <>
            <Divider sx={{ borderStyle: 'dashed' }} />
            <Stack sx={{ p: 1 }}>
              <MenuItem component={RouterLink} to={PATH_DASHBOARD.element.companyProfile}>
                Profile
              </MenuItem>
            </Stack>
            <Divider sx={{ borderStyle: 'dashed' }} />
          </>
        )} */}

        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
        <Divider sx={{ borderStyle: 'dashed' }} />

        {/* <Button  component={RouterLink} to="/forget" sx={{ ml:2, mb:2 }}>
        Chnage Password
        </Button> */}
        {/* <MenuItem to sx={{ m: 1 }}>
          <Link to={'/forget'} >Forget Password?</Link>
        </MenuItem> */}
      </MenuPopover>
    </>
  );
}
