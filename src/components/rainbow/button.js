import React, { useEffect } from 'react'
import { darkTheme, RainbowKitProvider, ConnectButton } from '@rainbow-me/rainbowkit'
import { configureChains } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, zora } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import '@rainbow-me/rainbowkit/styles.css'

const { chains } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }), publicProvider()],
)

const RainBowButton = () => {
  return (
    <RainbowKitProvider chains={chains} theme={darkTheme()}>
      <ConnectButton label="Connect Wallet" />
    </RainbowKitProvider>
  )
}

export default RainBowButton
