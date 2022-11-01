import ethers from 'ethers'
import { parse } from 'csv-parse'
import fs from 'fs'
import { balanceCheck } from './ethBalanceCheck.mjs'
import chalk from 'chalk'
import inquirer from 'inquirer';
import { walletGenerator } from './ethGenerateWallets.mjs'

const walletManagerQ = [
    {
      type: 'list',
      name: 'tool',
      message: 'Select an option:',
      choices: ['Get Wallet Balances', 'Generate Wallets', 'Disperse ETH', 'Collect ETH', 'Collect NFTs'],
      filter(val) {
        return val.toLowerCase();
      }
    }
  ];

  const ethWalletGenQ = [
      {
        type: 'input',
        name: 'walletsQuantity',
        message: 'How many wallets would you like to generate?',
        validate(value) {
          const valid = !isNaN(parseFloat(value));
          return valid || 'Please enter a number';
        },
        filter: Number,
      },
      {
        type: 'input',
        name: 'walletPrefix',
        message: 'Please input a prefix for your wellets (default is \'Burner Wallet\'):',
      }  
  ];

const getBalances = () => {
    fs.readFile('ethWallets.csv', 'utf-8', (err, data) => {
                if (err) console.log('Error reading ethWallets.csv:' + err);
                else {
                    const wallets = data.split('\n').slice(1);
                    //console.log(wallets)
                    let walletsToCheck = []
                    wallets.forEach(row => {
                        const columns = row.split(',');
                        const walletNames = columns[0];
                        //console.log(columns[1])
                        walletsToCheck.push(columns[1])
                        //console.log(walletsToCheck)
                        //console.log(walletNames)
                        return walletsToCheck;
                })
                //console.log(walletsToCheck)
                const numOfWallets = wallets.length
                const walletQueue = walletsToCheck.toString()
                console.log (chalk.yellow(numOfWallets) + ' wallets detected.')
        
                balanceCheck(walletQueue, numOfWallets).then( async (result) => {
            console.log(result)})
        }})
        };

const genWallets = () => {inquirer.prompt(ethWalletGenQ).then((answers) => {
        console.log('\nTransaction Confirmed.');
        walletGenerator(answers.walletsQuantity, answers.walletPrefix);
          })};

export const walletManager = async () => {inquirer.prompt(walletManagerQ).then((answers) => {
        console.log('\nTransaction Confirmed.');
        if (answers.tool === 'get wallet balances') {
         console.log(`Getting Wallet Balances...`)
             getBalances()
             setTimeout(walletManager, 2000)
        } else if (answers.tool === 'generate wallets') {
             console.log(`Starting ${chalk.blue('Ethereum')} Wallet Generator...`)
             genWallets();
        } else if (answers.tool === '\x1B[32maptos\x1B[39m') {
             console.log(`${chalk.green('Aptos')} selected.`)
        }
          })};