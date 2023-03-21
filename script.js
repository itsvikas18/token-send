// const form = document.querySelector('form');

// form.addEventListener('submit', async (event) => {
//     // Prevent the form from submitting and reloading the page
//     event.preventDefault();

//     // Get the values from the form
//     const recipient = document.getElementById('recipient').value;
//     const amount = document.getElementById('amount').value;
//     const token = document.getElementById('token').value;

//     // Validate the form data
//     if (recipient === '' || amount === '' || amount <= 0) {
//         alert('Please enter a valid recipient public key and amount');
//         return;
//     }

//     // Connect to the Solana network
//     const connection = new web3.Connection(web3.clusterApiUrl('devnet'));

//     // Load the wallet
//     const {publicKey, secretKey} = await web3.Keypair.fromSecretKey('FrUFivoPnhnCgKcTFXb2bkmu7JJEtfeNDfjgkYAz8tC1');

//     // Load the spl-token program
//     const splToken = new splToken.Token(
//         connection,
//         new web3.PublicKey('9jAN1W33ACJSVmH3M31E8oDK8CPpNpuT3XP5uLyWYHAt'),
//         splToken.TOKEN_PROGRAM_ID,
//         new web3.Account(),
//     );

//     // Load the sender token account
//     const senderTokenAccount = await splToken.getOrCreateAssociatedAccountInfo(publicKey);

//     // Get the destination token account
//     const destinationTokenAccount = new web3.PublicKey(recipient);

//     // Get the token mint
//     const tokenMint = new web3.PublicKey('9jAN1W33ACJSVmH3M31E8oDK8CPpNpuT3XP5uLyWYHAt');

//     // Create the transfer instruction
//     const transferInstruction = splToken.Token.createTransferInstruction(
//         splToken.TOKEN_PROGRAM_ID,
//         senderTokenAccount.address,
//         destinationTokenAccount,
//         publicKey,
//         [],
//         amount * Math.pow(10, 6),
//     );

//     // Send the transaction
//     const transaction = new web3.Transaction().add(transferInstruction);
//     const signature = await web3.sendAndConfirmTransaction(
//         connection,
//         transaction,
//         [web3.Keypair.fromSecretKey(secretKey)],
//         {commitment: 'singleGossip'}
//     );

//     console.log('Transaction signature:', signature);
//     alert('Transaction successful!');

//   // Notificatioin send button
//   // function showNotification() {
// 		// 	alert("Your transaction has been submitted!");
// 		// }
// });

// Import the required libraries
const {Keypair, Connection, SystemProgram, PublicKey, Transaction, sendAndConfirmTransaction} = require('@solana/web3.js');
const {Token, TOKEN_PROGRAM_ID} = require("@solana/spl-token");

// Define the connection to the Solana network
const connection = new Connection('https://api.devnet.solana.com', 'confirmed');

// Define the token and its associated public key
const tokenPublicKey = new PublicKey('TOKEN_PUBLIC_KEY');
const token = new Token(connection, tokenPublicKey, TOKEN_PROGRAM_ID, keypair);

// Define the recipient's Solana address
const recipientAddress = 'RECIPIENT_SOLANA_ADDRESS';

// Define the amount of tokens to transfer
const amount = 100;

// Define the keypair for your wallet
const keypair = Keypair.fromSecretKey(new Uint8Array([1,2,3,...]));

// Define an async function to transfer the tokens
async function transferTokens() {
  // Get the token account details for the keypair
  const account = await token.getAccountInfo(keypair.publicKey);

  // Define the token transfer instructions
  const transferParams = {
    source: keypair.publicKey,
    dest: new PublicKey(recipientAddress),
    owner: keypair.publicKey,
    amount: amount,
  };

  // Create a transaction with the transfer instructions
  const transaction = new Transaction().add(
    Token.createTransferInstruction(
      TOKEN_PROGRAM_ID,
      transferParams.source,
      transferParams.dest,
      transferParams.owner,
      [],
      transferParams.amount
    )
  );

  // Sign and send the transaction
  const signature = await sendAndConfirmTransaction(
    connection,
    transaction,
    [keypair],
    {commitment: 'confirmed'}
  );

  // Check the transaction status
  console.log(`Transaction ${signature} successful!`);
}

// Call the function to transfer the tokens
transferTokens();
