import { useEffect } from "react";
import store from "~/store";
import { Dialog } from "../ui/Dialog.tsx";
import DialogTemplate from "../ui/DialogTemplate";
import { useClearConversationsMutation } from "~/data-provider";

const ClearConvos = ({ open, onOpenChange }) => {
  const { newConversation } = store.useConversation();
  const { refreshConversations } = store.useConversations();
  const clearConvosMutation = useClearConversationsMutation();

  const clickHandler = () => {
    console.log("Clearing conversations...");
    clearConvosMutation.mutate();
  };

  useEffect(() => {
    if (clearConvosMutation.isSuccess) {
      newConversation();
      refreshConversations();
    }
  }, [clearConvosMutation.isSuccess]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTemplate
        title="پاک کردن گفت‌و‌گو ها"
        description="آیا مطمئنید؟ این عمل غیر قابل بازگشت است."
        selection={{
          selectHandler: clickHandler,
          selectClasses:
            "bg-red-600 hover:bg-red-700 dark:hover:bg-red-800 text-white",
          selectText: "پاک کردن",
        }}
      />
    </Dialog>
  );
};

export default ClearConvos;
