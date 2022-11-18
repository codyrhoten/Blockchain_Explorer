const crypto = require("crypto");
const EC = require("elliptic").ec,
  ec = new EC("secp256k1");
  let sha3 = require('js-sha3');
const mint_key_pair = ec.genKeyPair();
const mint_public_address = mint_key_pair.getPublic("hex");
const holderKeyPair = ec.genKeyPair();
// const keyPair = ec.genKeyPair();
const SHA256 = (message) =>
  crypto.createHash("sha256").update(message).digest("hex");

export class Block {
  timeStamp = "";
  data = [];
  constructor(timeStamp, data) {
    this.timeStamp = timeStamp;
    this.data = data;
    this.hash = this.getHash();
    this.prevHash = "";
    this.nonce = 0;
  }

  getHash() {
    return SHA256(
      JSON.stringify(this.data) + this.timeStamp + this.prevHash + this.nonce
    );
  }

  mine(difficulty) {
    while (!this.hash.startsWith(Array(difficulty + 1).join("0"))) {
      this.nonce++;
      this.hash = this.getHash();
    }
  }

  hasValidTransactions(chain) {
    return this.data.every((transaction) =>
      transaction.isValid(transaction, chain)
    );
  }
}

export class Blockchain {
  constructor() {
    const initialCoinRelease = new Transaction(
      mint_public_address,
      holderKeyPair.getPublic("hex"),
      100000
    );
    this.chain = [new Block(Date.now().toString(), [initialCoinRelease])];
    this.difficulty = 1;
    this.blockTime = 30000;
    this.transaction = [];
    this.reward = 500;
  }

  getLastBlock() {
    return this.chain[this.chain.length - 1];
  }

  getBalance(address) {
    let balance = 0;
    this.chain.forEach((block) => {
      block.data.forEach((transation) => {
        if (transation.from === address) {
          balance -= transation.amount;
          balance -= transation.gas;
        }

        if (transation.to === address) {
          balance += transation.amount;
        }
      });
    });
    return balance;
  }

  addBlock(block) {
    block.prevHash = this.getLastBlock().hash;
    block.hash = block.getHash();
    block.mine(this.difficulty);
    this.chain.push(block);
    this.difficulty +=
      Date.now() - parseInt(this.getLastBlock().timeStamp) < this.blockTime
        ? 1
        : -1;
  }

  addTransaction(transaction) {
    if (transaction.isValid(transaction, this)) {
      this.transaction.push(transaction);
    }
  }

  miningTransaction(rewardAddress) {
    let gas = 0;
    this.transaction.forEach((transaction) => {
      gas += transaction.gas;
    });

    const rewardTransaction = new Transaction(
      mint_public_address,
      rewardAddress,
      this.reward + gas
    );

    rewardTransaction.sign(mint_key_pair);

    if (this.transaction.length !== 0) {
      this.addBlock(
        new Block(Date.now().toString(), [
          rewardTransaction,
          ...this.transaction,
        ])
      );
    }
    this.transaction = [];
  }

  isValid(blockchain = this) {
    for (let i = 1; i < blockchain.chain.length; i++) {
      const currentBlock = blockchain.chain[i];
      const prevBlock = blockchain.chain[i - 1];

      if (
        currentBlock.hash !== currentBlock.getHash() ||
        currentBlock.prevHash !== prevBlock.hash ||
        currentBlock.hasValidTransactions(blockchain)
      ) {
        return false;
      }
    }
    return true;
  }
}

export class Transaction {
  //const transaction = new Transaction(holderKeyPair.getPublic("hex"), girlfriendwallet.getPublic("hex"), 333, 10)
  constructor(from, to, amount, gas = 0) {
    this.from = from;
    this.to = to;
    this.amount = amount;
    this.gas = gas;
  }

  sign(keyPair) {
    if (keyPair.getPublic("hex") === this.from) {
      this.signature = keyPair
        .sign(SHA256(this.from + this.to + this.amount + this.gas), "base64")
        .toDER("hex");
    }
  }

  isValid(tx, chain) {
    return (
      tx.from &&
      tx.to &&
      tx.amount &&
      (chain.getBalance(tx.from) >= tx.amount + tx.gas ||
        (tx.from === mint_public_address && tx.amount == this.reward)) &&
      ec
        .keyFromPublic(tx.from, "hex")
        .verify(SHA256(tx.from + tx.to + tx.amount + tx.gas), tx.signature)
    );
  }
}

const Chain = new Blockchain();

/* const girlfriendwallet = ec.genKeyPair();
const transaction = new Transaction(
  holderKeyPair.getPublic("hex"),
  girlfriendwallet.getPublic("hex"),
  333,
  10
);
transaction.sign(holderKeyPair);
Chain.addTransaction(transaction);
Chain.miningTransaction(girlfriendwallet.getPublic("hex")); */
let privKey = holderKeyPair.getPrivate('hex');
let pubKey = holderKeyPair.getPublic();
console.log(privKey);
console.log(pubKey.encode('hex').substring(2));
console.log(pubKey.encodeCompressed('hex'));
console.log(privKey.length, pubKey.encode('hex').substring(2).length, pubKey.encodeCompressed('hex').length)
console.log('c30331146ab8cd77fad2662019a8bc9029fe8610efdedb4aaee8f85ad4feb356'.length)
console.log('0000000000000000000000000000000000000000'.length);