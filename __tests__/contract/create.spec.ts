import { readFileSync } from 'fs';
import { createContract, createWallet } from '../../src';

const contractSrc = readFileSync(
  '__tests__/contract/data/contract.js',
  'utf-8'
);
const initState = readFileSync('__tests__/contract/data/state.json', 'utf-8');

jest.setTimeout(120000);

describe('Create Contract', () => {
  it('should create a new contract with wallet passed in on testnet', async () => {
    const { key } = await createWallet({
      environment: 'local',
    });

    const { contract, status } = await createContract({
      wallet: key,
      environment: 'testnet',
      initialState: initState,
      contractSource: contractSrc,
    });

    expect(contract).toBeDefined();
    expect(contract).toHaveProperty('_contractTxId');
    expect(typeof contract).toEqual('object');
    expect(status).toBeDefined();
    expect(typeof status).toEqual('object');
    expect(status).toEqual({ code: 200, message: 'SUCCESSFUL' });
  });

  it('should create a new contract with wallet passed in on localhost', async () => {
    const { key } = await createWallet({ environment: 'local' });

    const { contract, status } = await createContract({
      environment: 'local',
      wallet: key,
      initialState: initState,
      contractSource: contractSrc,
    });

    expect(contract).toBeDefined();
    expect(typeof contract).toEqual('object');
    expect(contract).toHaveProperty('_contractTxId');
    expect(status).toBeDefined();
    expect(typeof status).toEqual('object');
    expect(status).toEqual({ code: 200, message: 'SUCCESSFUL' });
  });
});
