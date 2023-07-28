// src/components/rainbow/index.js

import React from 'react'
import { getDefaultWallets } from '@rainbow-me/rainbowkit'
import { configureChains, createConfig, WagmiConfig } from 'wagmi'
import { mainnet, polygon, optimism, arbitrum, zora } from 'wagmi/chains'
import { alchemyProvider } from 'wagmi/providers/alchemy'
import { publicProvider } from 'wagmi/providers/public'
import RainBowButton from './button'

const { chains, publicClient } = configureChains(
  [mainnet, polygon, optimism, arbitrum, zora],
  [alchemyProvider({ apiKey: process.env.REACT_APP_ALCHEMY_ID }), publicProvider()],
)

const { connectors } = getDefaultWallets({
  appName: 'Wallet Connect With RainBow',
  projectId: process.env.REACT_APP_RAINBOW_KEY,
  chains,
})

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
})

export const WalletButton = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainBowButton />
    </WagmiConfig>
  )
}
