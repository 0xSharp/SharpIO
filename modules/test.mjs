const esBaseUrl = 'https://api.etherscan.io/api'
import config from '../config.json' assert { type: 'json' };
const esApiKey = config.etherscanKey
//console.log(esApiKey)

const balanceCheck = async (wallets) => {
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
            console.log(jsonResponse)
            jsonResponse['result'].forEach(key => {
                console.log(key)
                console.log("log 1")
            })
            let balResponse = `Wallet Balance(s)\nWallet 1: ${JSON.stringify(jsonResponse['result']['balance'])}`
            console.log("log 2")
            console.log(JSON.stringify(jsonResponse['result'].balance))
            //console.log(balResponse)
            return balResponse;
            console.log("log 3")
        }
        throw new Error('Request failed!')
    } catch(error) {
        console.log(error)
    }
}

balanceCheck('0xbD721f670f6C793dc949E50734CCA35C078E93F5').then( async (result) => {
    console.log(result)})