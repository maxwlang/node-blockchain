import { SHA256 } from 'crypto-js'
import { isNil } from 'ramda'

export class Block {
    index: number
    timestamp: number
    data: any
    previousHash: string
    hash: string

    constructor (index: number, data: any, previousHash: string) {
        if (isNil(index)) throw new Error('Index missing on new block')
        if (isNil(previousHash)) throw new Error('Previous hash missing on new block')

        this.index = index
        this.timestamp = new Date().getTime()
        this.data = data
        this.previousHash = previousHash
        this.hash = this.generateHash()
    }

    generateHash(): string {
        return SHA256(this.index + this.timestamp + this.previousHash + JSON.stringify(this.data)).toString()
    }
}