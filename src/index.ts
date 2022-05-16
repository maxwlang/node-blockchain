import { Blockchain } from "./Blockchain"

const testCoin = new Blockchain()

for (let i = 0; i < 9 ; i++) {
    testCoin.addNewBlock({
        blockInt: i,
        bruh: true,
        cool: 'yeah'
    })

}

console.log('verify?: ', testCoin.verifyIntegrity())
console.log(testCoin.blockchain)
