import { expect } from 'chai'
import { Block } from '../src/Block'
import { Blockchain } from '../src/Blockchain'

describe('Block', () => {
    it('Should generate a unique SHA256 hash', () => {
        const genesisBlock = new Block(0, null, 'HASH')
        const unrelatedBlock = new Block(123, { blah: true }, 'HASH')

        expect(genesisBlock.hash).to.not.be.undefined
        expect(genesisBlock.hash).to.not.equal(unrelatedBlock.hash)
        expect(genesisBlock.hash.length).to.equal(64)
    })

    it('Should contain the previous block\'s hash', () => {
        const testBlockchain = new Blockchain()

        testBlockchain.addNewBlock({
            isATest: true
        })

        expect(testBlockchain.getLatestBlock().previousHash).to.equal(testBlockchain.blockchain[0].hash)
    })

    it('Should throw when an index is not supplied on a new block', () => {
        // @ts-expect-error We are expecting a typescript error here because we are testing missing vital fields.
        expect(() => new Block()).to.throw('Index missing on new block')
    })

    it('Should throw when a previous hash is not supplied on a new block', () => {
        // @ts-expect-error We are expecting a typescript error here because we are testing missing vital fields.
        expect(() => new Block(1, null)).to.throw('Previous hash missing on new block')
    })
})