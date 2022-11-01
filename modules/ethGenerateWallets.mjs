import ethers from 'ethers'
import fs from 'fs'
import chalk from 'chalk'
import chalkAnimate from'chalk-animation'
const csv = './ethWallets.csv'

const checkCSV = () => {
    console.log('Checking ethWallets.csv')
if (fs.existsSync(csv)) {fs.readFile(csv, 'utf-8', (err, data) => {
        if (err) console.log(err)
        else {
            const rows = data.split('\n');
            if (rows[0] === 'Wallet Name,Public Address,Private Key') {
                console.log('ethWallets.csv verified!')
                return;
            }}})} else {
                console.log(`ethWallets.csv not found. ${chalk.green('Generating now...')}`)
                fs.writeFile(csv, 'Wallet Name,Public Address,Private Key', (err) => {
                    if (err) {
                        console.log( 'Error generating ethWallets.csv: ' + err)
                    }
                })
            }
            }

export const walletGenerator = async (numOfWallets, walletPrefix='Burner Wallet') => {
    checkCSV()
await new Promise(r => setTimeout(r, 3000));
for (let i = 1; i <= numOfWallets; ++i) {
    const genWallet = ethers.Wallet.createRandom()
    let newWallet = `\n${walletPrefix}${i},${genWallet.address},${genWallet.privateKey}`
    console.log(`Wallet ${i} generated.`)
    fs.appendFile(csv, newWallet, (err) => {
        if (err) {
            console.log('Error writing to CSV:' + err)
        }})}
}


/*const genWallet = ethers.Wallet.createRandom()
console.log('address:', wallet.address)
console.log('privateKey:', wallet.privateKey)*/