import React from "react";
import { useWeb3Modal } from '@web3modal/react'
import { useNetwork, useSwitchNetwork, useAccount } from 'wagmi'

import {
  CAvatar,
  CBadge,
  CButton,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle
} from '@coreui/react'
import ethIcon from '../../../assets/images/tokens/eth.png'
import arbitIcon from '../../../assets/images/tokens/arbitrum.svg'
import maticIcon from '../../../assets/images/tokens/polygon.svg'



const ConnectWalletButton = () => {
  const { chain } = useNetwork()
  const { open } = useWeb3Modal()
  const { chains, isLoading, pendingChainId, switchNetwork } = useSwitchNetwork()
  const { address, status } = useAccount()
  const supportedNetwork = [
    {
      "name": "Ethereum",
      "cover": ethIcon
    },
    {
      "name": "Arbitrum One",
      "cover": arbitIcon
    }, {
      "name": "Polygon",
      "cover": maticIcon
    }
  ]

  const findToken = (name) => {
    return supportedNetwork.find(x => x.name === name)
  }

  return (
    <>
      <div className="d-flex flex-row-reverse align-items-center">
        <CButton onClick={() => open()} color="secondary" variant="outline"
          className={address ? 'w-50 text-truncate h-75' : 'w-auto'}>
          {address ? address : 'Connect Your Wallet'}
        </CButton>
        {chain &&
          <CDropdown>
            <CDropdownToggle href="#" color="light" className="position-relative rounded-pill m-2 font-xs">
              {findToken(chain.name) ? '' : 'Unsupported Network Choosen'}
              <CAvatar src={findToken(chain.name) ? findToken(chain.name).cover : ''} size="sm" />
              {findToken(chain.name) && <CBadge
                className="border border-light p-2 spinner-grow w-15-icon"
                role="status"
                color={`${status} === 'connected'` ? 'success' : 'danger'}
                position="top-end"
                shape="rounded-circle"
              >
                <span className="visually-hidden">New alerts</span>
              </CBadge>}
            </CDropdownToggle>
            <CDropdownMenu>
              {chains.map((x) => (<CDropdownItem
                disabled={!switchNetwork || x.id === chain?.id}
                key={x.id}
                onClick={() => switchNetwork?.(x.id)}
              >
                <CAvatar src={findToken(x.name) ? findToken(x.name).cover : ''} size="sm" className="mx-2" />
                {x.name}
                {isLoading && pendingChainId === x.id && ' (switching)'}
              </CDropdownItem>)
              )}
            </CDropdownMenu>
          </CDropdown>}
      </div >
    </>
  )
};

export default ConnectWalletButton;