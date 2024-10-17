import React, { useState } from 'react';
import ResetPasswordEmail from '../resetpasswordemail/ResetPasswordEmail';
import ResetPasswordNew from '../resetpasswordnew/ResetPasswordNew';

const ResetPasswordFlow = () => {
  const [step, setStep] = useState('email'); // Управление этапами

  const handleContinue = () => {
    setStep('new-password'); // Переход к следующей форме (новый пароль)
  };

  return (
    <div>
      {step === 'email' && <ResetPasswordEmail onContinue={handleContinue} />}
      {step === 'new-password' && <ResetPasswordNew />}
    </div>
  );
};

export default ResetPasswordFlow;