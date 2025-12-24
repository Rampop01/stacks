'use server';

import chainhooksClient from '@/lib/chainhooks';

export async function getChainhooksStatus() {
  try {
    const status = await chainhooksClient.getStatus();
    return { success: true, data: status };
  } catch (error) {
    console.error('Error fetching chainhooks status:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getChainhooks(params: { limit?: number; offset?: number } = {}) {
  try {
    const results = await chainhooksClient.getChainhooks(params);
    return { success: true, data: results };
  } catch (error) {
    console.error('Error fetching chainhooks:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}
