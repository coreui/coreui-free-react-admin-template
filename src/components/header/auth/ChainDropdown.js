import React from 'react';
import supportedNetwork from './SupportedNetwork';
import { CAvatar, CDropdown, CDropdownToggle, CDropdownMenu, CDropdownItem } from '@coreui/react';

const ChainDropdown = ({ chains, chain, switchNetwork, isLoading, pendingChainId }) => {
  const findToken = (name) => {
    return supportedNetwork.find((x) => x.name === name);
  };

  return (
    <CDropdown dark>
      <CDropdownToggle className="position-relative rounded-pill m-2 font-xs" variant="ghost" color="secondary">
        {findToken(chain.name) ? '' : 'Unsupported Network Choosen'}
        <CAvatar src={findToken(chain.name) ? findToken(chain.name).cover : ''} size="sm" />
      </CDropdownToggle>
      <CDropdownMenu>
        {chains.map((x) => (
          <CDropdownItem
            disabled={!switchNetwork || x.id === chain?.id}
            key={x.id}
            onClick={() => switchNetwork?.(x.id)}
          >
            <CAvatar src={findToken(x.name) ? findToken(x.name).cover : ''} size="sm" className="mx-2" />
            {x.name}
            {isLoading && pendingChainId === x.id && ' (switching)'}
          </CDropdownItem>
        ))}
      </CDropdownMenu>
    </CDropdown>
  );
};

export default ChainDropdown;
