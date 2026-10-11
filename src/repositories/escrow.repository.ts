export interface EscrowDetails {
  id: string;
  amount: string;
  status: 'PENDING' | 'RELEASED' | 'REFUNDED';
}

const IS_DEMO_MODE = process.env.NEXT_PUBLIC_DEMO_MODE === 'true';

export class EscrowRepository {
  static async getById(id: string): Promise<EscrowDetails> {
    if (IS_DEMO_MODE) {
      return { id, amount: '250.00', status: 'RELEASED' };
    }
    const res = await fetch(/api/escrows/);
    if (!res.ok) throw new Error('Failed to fetch escrow');
    return res.json();
  }
}