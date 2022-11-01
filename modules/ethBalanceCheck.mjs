const esBaseUrl = 'https://api.etherscan.io/api'
import config from '../config.json' assert { type: 'json' };
const esApiKey = config.etherscanKey
import chalk from 'chalk'

export const balanceCheck = async (wallets, numOfWallets) => {
    const esAccModule = '?module=account'
    const esBalAction = '&action=balancemulti'
    const esBalTag = '&tag=latest'
    const walletUrl = `&address=${wallets}`
    const esBalUrl = `${esBaseUrl}${esAccModule}${esBalAction}${walletUrl}${esBalTag}${esApiKey}`
    //console.log(esBalUrl)
    try {
        const response = await fetch(esBalUrl, {method: 'GET'})
        if(response.ok) {
            let jsonResponse = await response.json()
            let finalResponse = `Wallet Balance(s)\nWallet 1: ${chalk.yellow(+((jsonResponse.result[0].balance)/(Math.pow(10, 18)).toFixed(3)))} ETH`
            //console.log(jsonResponse.result[0].balance)
            for (let i = 1; i < numOfWallets; ++i) {
                let currentWalletString = `\nWallet ${i+1}: ${chalk.yellow(+((jsonResponse.result[i].balance)/(Math.pow(10, 18)).toFixed(3)))} ETH`
                //console.log(currentWalletString)
                finalResponse += currentWalletString
                //console.log(finalResponse)
            }
            return finalResponse;
        }
        throw new Error('Request failed!')
    } catch(error) {
        console.log(error)
    }
}

/*balanceCheck('0xbD721f670f6C793dc949E50734CCA35C078E93F5').then( async (result) => {
    console.log(result)})*/