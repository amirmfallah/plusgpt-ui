import React from 'react';
import { useNavigate, useNavigation } from 'react-router-dom';
import { useAuthContext } from '~/hooks/AuthContext';
import store from '~/store';

export default function NoSub() {
  //const { newConversation } = store.useConversation();
  const navigate = useNavigate();
  return (
    <a className='btn btn-primary justify-start mb-2 flex flex-col flex-shrink-0  gap-2 rounded-md p-3 py-3 text-sm text-white fa'
    onClick={() => navigate("/plans")}>
    <b
    >
      خرید بسته سوال
    </b>
    <span style={{fontSize: 12}}>شما بسته فعالی ندارید.</span>
    </a>

  );
}
