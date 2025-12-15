'use client';

import { userSession } from './user-session';
import { showConnect } from '@stacks/connect';
import { STACKS_TESTNET, STACKS_MAINNET } from '@stacks/network';
import { Button } from './components/ui/button';

// Use testnet for development, switch to STACKS_MAINNET for production
const network = STACKS_TESTNET;

export default function WalletConnect() {
  const handleConnectWallet = async () => {
    const appDetails = {
      name: 'Stacks App', // Replace with your app name
      icon: 'https://your-app-logo.com/logo.png', // Replace with your app logo
    };

    showConnect({
      appDetails,
      onFinish: () => {
        window.location.reload();
      },
      userSession,
      network, // Use the network constant we defined above
    });
  };

  const handleDisconnect = () => {
    userSession.signUserOut('/');
  };

  if (userSession.isUserSignedIn()) {
    const userData = userSession.loadUserData();
    // Use .testnet for testnet, .mainnet for mainnet
    const address = userData.profile.stxAddress.testnet;
    
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm font-medium">
          {`${address.slice(0, 5)}...${address.slice(-4)}`}
        </span>
        <Button onClick={handleDisconnect} variant="outline">
          Disconnect
        </Button>
      </div>
    );
  }

  return (
    <Button onClick={handleConnectWallet}>
      Connect Wallet
    </Button>
  );
}
