// hooks
import useAuth from '../hooks/useAuth';
// utils
import createAvatar from '../utils/createAvatar';
//
import Avatar from './Avatar';

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
   const { user } = useAuth();
   const currentUser=JSON.parse(localStorage.getItem('currentuser'))
  return (
    <Avatar
      src={`https://dontmess.devssh.xyz/${currentUser?.image}`}
      alt={user?.displayName}
      color={currentUser?.image ? 'default' : createAvatar(user?.displayName).color}
      {...other}
    >
      {createAvatar(user?.displayName).name}
    </Avatar>
  );
}
