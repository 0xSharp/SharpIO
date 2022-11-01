/**
 * Pizza delivery prompt example
 * run example by writing `node pizza.js` in your console
 */

 import inquirer from 'inquirer';
 import chalk from 'chalk';
 import chalkAnimate from'chalk-animation'
 import { walletManager } from './modules/ethWalletManager.mjs'
 
 const sleep = (r = 10000) => new Promise((r) => setTimeout(r))

 const intro = async () => {
  const rainbowTitle = chalkAnimate.rainbow(`
  
███████╗██╗  ██╗ █████╗ ██████╗ ██████╗ ██╗ ██████╗ 
██╔════╝██║  ██║██╔══██╗██╔══██╗██╔══██╗██║██╔═══██╗
███████╗███████║███████║██████╔╝██████╔╝██║██║   ██║
╚════██║██╔══██║██╔══██║██╔══██╗██╔═══╝ ██║██║   ██║
███████║██║  ██║██║  ██║██║  ██║██║     ██║╚██████╔╝
╚══════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝     ╚═╝ ╚═════╝ 
                                                    
      
`)
rainbowTitle.start()
await sleep();

console.log(`
    ${chalk.bgBlue('Changelog')} 
    v0.0.1
    SharpIO now ${chalk.red('*exists*')}
  `);
 }

 const mainMenuQ = [
   {
     type: 'list',
     name: 'blockchain',
     message: 'Select a blockchain:',
     choices: [chalk.blue('Ethereum'), chalk.magenta('Solana'), chalk.green('Aptos')],
     filter(val) {
       return val.toLowerCase();
     }
   }
 ];

 const ethMenuQ = [
  {
    type: 'list',
    name: 'tool',
    message: 'Select a tool:',
    choices: ['Wallet Manager', 'Gas Estimator', 'Return to Main Menu'],
    filter(val) {
      return val.toLowerCase();
    }
  }
];
const ethMenu = () => {inquirer.prompt(ethMenuQ).then((answers) => {
  if (answers.tool === 'wallet manager') {
   console.log(`Wallet Manager selected.`);
   walletManager();
  } else if (answers.tool === '\x1B[35msolana\x1B[39m') {
   console.log(`${chalk.magenta('Solana')} selected.`)
  } else if (answers.tool === '\x1B[32maptos\x1B[39m') {
   console.log(`${chalk.green('Aptos')} selected.`)
  }
})};

const mainMenu = () => {inquirer.prompt(mainMenuQ).then((answers) => {
   console.log('\nTransaction Confirmed.');
   //console.log(answers)
   if (answers.blockchain === '\x1B[34methereum\x1B[39m') {
    console.log(`${chalk.blue('Ethereum')} selected.`)
    ethMenu();
   } else if (answers.blockchain === '\x1B[35msolana\x1B[39m') {
    console.log(`${chalk.magenta('Solana')} selected.`)
   } else if (answers.blockchain === '\x1B[32maptos\x1B[39m') {
    console.log(`${chalk.green('Aptos')} selected.`)
   }
 })};

await intro()
mainMenu()