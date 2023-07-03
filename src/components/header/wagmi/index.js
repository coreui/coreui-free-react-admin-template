import React from 'react';
import ConnectWalletButton from '../auth';
import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum';
import { Web3Modal } from '@web3modal/react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, mainnet, polygon } from 'wagmi/chains';

const chains = [arbitrum, mainnet, polygon];
const projectId = 'Your Projcet ID';

const { publicClient } = configureChains(chains, [w3mProvider({ projectId })]);
const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: w3mConnectors({ projectId, version: 1, chains }),
  publicClient
});

const ethereumClient = new EthereumClient(wagmiConfig, chains);

const WagmiAuth = () => {
  return (
    <WagmiConfig config={wagmiConfig}>
      <ConnectWalletButton />
      <Web3Modal projectId={projectId} ethereumClient={ethereumClient} />
    </WagmiConfig>
  );
};

export default WagmiAuth;
