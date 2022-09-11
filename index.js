const Web3 = require('@solana/web3.js');
const {Keypair,Connection,clusterApiUrl} = require('@solana/web3.js');



let payer = Keypair.generate()
console.log('payer',payer.publicKey)
let connection = new Web3.Connection(Web3.clusterApiUrl('devnet'),'confirmed');
// console.log('connection',connection)



const signInTransactionAndSendMoney = async() =>{
  
        let airdropSignature = await connection.requestAirdrop(
            payer.publicKey,
            Web3.LAMPORTS_PER_SOL,

        );
    
       let confirm = await connection.confirmTransaction(airdropSignature);
            console.log('confirm',confirm)
        // let allocateTransaction =await new Web3.Transaction({
        //     feePayer: payer.publicKey,
        //     lamports:Web3.LAMPORTS_PER_SOL
        //   });
console.log('allocation',airdropSignature)
        let balance = await connection.getBalance(payer.publicKey)
        console.log('balance',balance)
        // Create Simple Transaction
        let transaction = new Web3.Transaction();



        const destKey = '2TbB9KknNh2fj5AqwDaHH2hAY25fZRkWZKV6cQY2eLdJ';

        const destPubkey = new Web3.PublicKey(destKey);
        console.log('dest',destPubkey)
        const walletAccountInfo = await connection.getAccountInfo(payer.publicKey)
           

        console.log('walletInfo==>',walletAccountInfo)

        const receiverAccountInfo = await connection.getBalance(destPubkey);
        console.log("receiver data size", receiverAccountInfo);
// // Add an instruction to execute
        transaction.add(Web3.SystemProgram.transfer({
            fromPubkey: payer.publicKey,
            toPubkey: destPubkey,
            lamports:1,
        }));

    let txn = await Web3.sendAndConfirmTransaction(connection, transaction, [payer])
    console.log('txn',txn)
}

signInTransactionAndSendMoney()