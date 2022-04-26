import * as React from 'react';
import { Page } from '../../../components/Page';
import UserList from '../../../components/UserList';
import { useHistory } from 'react-router-dom';
import { UserListReturn } from '../../../types/UserListReturn';

const UsersList = () => {
  const history = useHistory();

  const handleSelectUser = ({ userId }: UserListReturn) => {
    history.push(`/users/show/${userId}`);
  }

  return (
    <Page>
      <UserList onUserSelected={handleSelectUser}/>
    </Page>
  );
};

export default UsersList;
