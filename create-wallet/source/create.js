//importa dependências
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

//define rede
//main net
//const network = bitcoin.networks.bitcoin
//test net
const network = bitcoin.networks.testnet

//derivação de carteiras HD
const path = `m/49'/1'/0'/0` 

//cria o mnemonic para a seed
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

//cria a raiz da cartiera HD
let root = bip32.fromSeed(seed, network)

//cria conta (chaves pública e privada)
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

//cria endereço
let btcAddress = bitcoin.payments.p2pkh({
    pubkey: node.publicKey,
    network: network,
}).address

console.log("Wallet created!")
console.log("Address: ", btcAddress)
console.log("Private Key:", node.toWIF())
console.log("Seed:", mnemonic)
