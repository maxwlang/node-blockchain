import { Block } from "./Block"

export class Blockchain {
    blockchain: Block[]

    constructor() {
        this.blockchain = [this.createGenesisBlock()]
    }

    private createGenesisBlock(): Block {
        return new Block(0, null, '0')
    }

    getLatestBlock(): Block {
        return this.blockchain[this.blockchain.length - 1]
    }

    addNewBlock(data: any): Block {
        const previousHash = this.getLatestBlock().hash
        const newBlock = new Block(this.blockchain.length, data, previousHash)
        this.blockchain.push(newBlock)
        return newBlock
    }

    verifyIntegrity(): boolean {
        for (let i = 1; i < this.blockchain.length; i++) {
            const currentBlock = this.blockchain[i]
            const previousBlock = this.blockchain[i - 1]

            if (currentBlock.hash !== currentBlock.generateHash()) return false
            if (currentBlock.previousHash !== previousBlock.hash) return false
        }

        return true
    }
}