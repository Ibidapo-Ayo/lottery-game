import React from 'react'
import ConnectWalletBtn from './ConnectWalletBtn'

const Header = () => {
    return (
        <div className='w-full px-20 py-4 flex justify-end'>
            <div className='flex justify-end items-center'>
                  <ConnectWalletBtn />
            </div>
        </div>
    )
}

export default Header