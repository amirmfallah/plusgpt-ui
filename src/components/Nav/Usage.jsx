import React from "react";
import { useAuthContext } from "~/hooks/AuthContext";
import store from "~/store";

export default function Usage(props) {
  //const { newConversation } = store.useConversation();
  const user = props.user;
  return (
    <div>
      <a className="mb-2 flex flex-col flex-shrink-0 items-end justify-between gap-3 rounded-md px-3 pt-3 text-sm text-white fa">
        <div className="w-full flex flex-row justify-between items-center content-between">
          <span>میزان مصرف‌ :</span>
          <span>
            {`${new Intl.NumberFormat().format(
              user?.plan?.used || 0
            )} / ${new Intl.NumberFormat().format(
              user?.plan?.limit || 0
            )} پرسش`}
          </span>
        </div>
        <span>
          {`${new Intl.NumberFormat().format(
            user?.plan?.token_used || 0
          )} / ${new Intl.NumberFormat().format(
            user?.plan?.limitToken || 0
          )} کلمه`}
        </span>
      </a>
    </div>
  );
}
