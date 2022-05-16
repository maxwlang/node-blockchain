import { expect } from 'chai'
import { Blockchain } from '../src/Blockchain'

describe('Blockchain', () => {
    it('Should generate a genesis block on initialization', () => {
        const testBlockchain = new Blockchain()
        const genesisBlock = testBlockchain.getLatestBlock()

        expect(testBlockchain.blockchain.length).to.equal(1)
        expect(genesisBlock.index).to.equal(0)
        expect(genesisBlock.previousHash).to.equal('0')
        expect(genesisBlock.hash).to.not.be.undefined
        expect(genesisBlock.timestamp).to.not.be.undefined
    })

    describe('getLatestBlock', () => {
        it('Should return the latest block', () => {
            const testBlockchain = new Blockchain()
            const genesisBlock = testBlockchain.getLatestBlock()
            
            expect(genesisBlock.index).to.equal(0)
            expect(genesisBlock.previousHash).to.equal('0')
            expect(genesisBlock.hash).to.not.be.undefined
            expect(genesisBlock.timestamp).to.not.be.undefined

            testBlockchain.addNewBlock({
                isATest: true
            })

            const latestBlock = testBlockchain.getLatestBlock()
            expect(latestBlock.index).to.equal(1)
            expect(latestBlock.previousHash).to.equal(genesisBlock.hash)
            expect(latestBlock.hash).to.not.be.undefined
            expect(latestBlock.hash.length).to.equal(64)
            expect(latestBlock.timestamp).to.not.be.undefined
        })
    })

    describe('addNewBlock', () => {
        it('Should allow you to add new blocks to the blockchain', () => {
            const testBlockchain = new Blockchain()
            expect(testBlockchain.blockchain.length).to.equal(1)
    
            testBlockchain.addNewBlock({
                isATest: true
            })
    
            expect(testBlockchain.blockchain.length).to.equal(2)
            expect(testBlockchain.getLatestBlock().data).to.deep.equal({
                isATest: true
            })
        })
    })

    describe('verifyIntegrity', () => {
        it('Should return true when blockchain integrity is correct', () => {
            const testBlockchain = new Blockchain()
            
            for (let i = 0; i < 9; i++) {
                testBlockchain.addNewBlock({
                    isATest: true,
                    dataIndex: i
                })
            }
    
            expect(testBlockchain.blockchain.length).to.equal(10)
            expect(testBlockchain.verifyIntegrity()).to.be.true
        })
    
        it('Should return false when blockchain integrity is incorrect due to hash mismatch', () => {
            const testBlockchain = new Blockchain()
            
            for (let i = 0; i < 9; i++) {
                testBlockchain.addNewBlock({
                    isATest: true,
                    dataIndex: i
                })
            }

            testBlockchain.blockchain[4].hash = 'HASH'
            testBlockchain.blockchain[4].previousHash = 'garbage'
    
            expect(testBlockchain.blockchain.length).to.equal(10)
            expect(testBlockchain.verifyIntegrity()).to.be.false
        })

        it('Should return false when blockchain integrity is incorrect due to data change', () => {
            const testBlockchain = new Blockchain()
            
            for (let i = 0; i < 9; i++) {
                testBlockchain.addNewBlock({
                    isATest: true,
                    dataIndex: i
                })
            }

            testBlockchain.blockchain[4].data = { thing: 'bad data' }
    
            expect(testBlockchain.blockchain.length).to.equal(10)
            expect(testBlockchain.verifyIntegrity()).to.be.false
        })
    })
})