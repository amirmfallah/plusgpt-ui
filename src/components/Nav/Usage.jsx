import React from 'react';
import { useAuthContext } from '~/hooks/AuthContext';
import store from '~/store';

export default function Usage(props) {
  //const { newConversation } = store.useConversation();
  const user = props.user;
  return (
    <a
      className="mb-2 flex flex-shrink-0 items-center justify-between gap-3 rounded-md p-3 py-3 text-sm text-white fa"
    >
      <span>میزان مصرف‌ :</span>
      {
        `${user?.plan?.used || 0} / ${user?.plan?.limit || 0} پرسش`
      }

    </a>
  );
}
