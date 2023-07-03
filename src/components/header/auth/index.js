import React, { useState, useEffect } from 'react';
import { useWeb3Modal } from '@web3modal/react';
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../../redux/actions';
import { useSignMessage } from 'wagmi';
import ChainDropdown from './ChainDropdown';
import WalletDropdown from './WalletDropdown';
import supportedNetwork from './SupportedNetwork';
import { getNonce, login } from '../../../services/apiServices';
import { CButton } from '@coreui/react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ConnectWalletButton = () => {
  const [visible, setVisible] = useState(false);
  const { chain } = useNetwork();
  const { open } = useWeb3Modal();
  const { chains, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork();
  const { address, status } = useAccount();
  const { data, error, signMessage } = useSignMessage();
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);

  const findToken = (name) => {
    return supportedNetwork.find((x) => x.name === name);
  };

  const handleDisconnect = () => {
    setVisible(false);
    dispatch(setToken('')); // Reset token in store
  };

  useEffect(() => {
    if (!address) {
      handleDisconnect();
    }
  }, [address, handleDisconnect]);

  const signIn = async () => {
    try {
      const response = await getNonce(address);
      if (response) {
        try {
          const message = response.message;
          await signMessage({ message: message });
          if (!error && data !== undefined) {
            getToken(data, address);
          }
        } catch (error) {
          console.log('Error:', error);
          toast.error('An error occurred. Please try again later.');
        }
      }
    } catch (error) {
      console.log('Error:', error);
      toast.error('An error occurred. Please try again later.');
    }
  };

  const getToken = async (signature, address) => {
    try {
      if (signature) {
        const response = await login(address, signature);
        if (response) {
          setVisible(true);
          dispatch(setToken(response.access_token));
        } else {
          // Handle the error condition if needed
        }
      }
    } catch (error) {
      console.log('Error:', error);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="d-flex flex-row-reverse align-items-center">
        {!address && (
          <CButton
            onClick={() => open()}
            color="primary"
            className={address ? 'w-50 text-truncate h-75 rounded-pill' : 'w-auto rounded-pill'}
          >
            Connect
          </CButton>
        )}
        {address && (
          <WalletDropdown
            address={address}
            visible={visible}
            status={status}
            open={open}
            signIn={signIn}
            handleDisconnect={handleDisconnect}
          />
        )}
        {chain && (
          <ChainDropdown
            chains={chains}
            switchNetwork={switchNetwork}
            chain={chain}
            isLoading={isLoading}
            pendingChainId={pendingChainId}
            findToken={findToken}
          />
        )}
      </div>
    </>
  );
};

export default ConnectWalletButton;
