import React, { useState } from "react";

const usePopupMessage = () => {
  const [open, setOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState(false);
  const [dialogContent, setDialogContent] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [showErrorIcon, setShowErrorIcon] = useState(false);
  const [btnText, setBtnText] = useState();
  const [onClickActionbutton, setOnClickActionButton] = useState();
  const [onClose, setOnClose] = useState();

  const modifyOpen = (newOpen) => {
    setOpen(newOpen);
  };

  const modifyDialogTitle = (newDialogTitle) => {
    setDialogTitle(newDialogTitle);
  };

  const modifyDialogContent = (newDialogContent) => {
    setDialogContent(newDialogContent);
  };

  const modifyIsDelete = (newIsDelete) => {
    setIsDelete(newIsDelete);
  };

  const modifyShowErrorIcon = (newShowErrorIcon) => {
    setShowErrorIcon(newShowErrorIcon);
  };

  const modifyBtnText = (newBtnText) => {
    setBtnText(newBtnText);
  };

  const modifyOnClickActionButton = (newOnClickActionButton) => {
    setOnClickActionButton(newOnClickActionButton);
  };

  const modifyOnClose = (newOnClose) => {
    setOnClose(newOnClose);
  };

  return {
    open,
    isDelete,
    modifyOpen,
    modifyDialogTitle,
    modifyDialogContent,
    modifyIsDelete,
    modifyShowErrorIcon,
    modifyBtnText,
    modifyOnClickActionButton,
    modifyOnClose,
    props: {
      modifyOpen,
      dialogTitle,
      dialogContent,
      isDelete,
      showErrorIcon,
      btnText,
      onClickActionbutton,
      onClose,
      openDialog: open,
    },
  };
};

export default usePopupMessage;
