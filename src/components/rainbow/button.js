import React, { useEffect } from 'react'
import { CButton } from '@coreui/react'
import { useSelector } from 'react-redux'
import { RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit'
import { configureChains, useAccount } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, zora } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { useGetNonce } from '../../redux/modules/userNonce'
import { publicProvider } from 'wagmi/providers/public'
import '@rainbow-me/rainbowkit/styles.css'

const { chains } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }), publicProvider()],
)

const RainBowButton = () => {
  const { address } = useAccount()
  const { dispatchGetNonce } = useGetNonce()
  const userToken = useSelector((state) => state.userSign?.data?.access_token)

  useEffect(() => {
    if (address) {
      dispatchGetNonce(address)
    }
  }, [address, dispatchGetNonce])

  const handleSignInWallet = () => {
    if (address) {
      dispatchGetNonce(address)
    }
  }

  return (
    <>
      {!userToken && address && (
        <CButton color="light" className="mx-2" onClick={handleSignInWallet}>
          Sign In Wallet
        </CButton>
      )}
      <RainbowKitProvider chains={chains}>
        <ConnectButton label="Connect Wallet" />
      </RainbowKitProvider>
    </>
  )
}

export default RainBowButton
