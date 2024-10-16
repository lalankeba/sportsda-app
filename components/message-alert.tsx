import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Alert } from 'react-bootstrap';

export interface AlertHandler {
  triggerAlert: (content: React.ReactNode, variant: string) => void;
}

const MessageAlert = forwardRef<AlertHandler>((_, ref) => {
  const [show, setShow] = useState<boolean>(false);
  const [alertContent, setAlertContent] = useState<React.ReactNode>(null);
  const [alertVariant, setAlertVariant] = useState<string>('light');

  const triggerAlert = (content: React.ReactNode, variant: string) => {
    setAlertContent(content);
    setAlertVariant(variant);
    setShow(true);

    setTimeout(() => setShow(false), 3000);
  };

  useImperativeHandle(ref, () => ({
    triggerAlert
  }));

  return (
    <>
      {show && (
        <Alert variant={alertVariant} onClose={() => setShow(false)} dismissible>
          {alertContent}
        </Alert>
      )}
    </>
  );
});

MessageAlert.displayName = 'MessageAlert';

export default MessageAlert;