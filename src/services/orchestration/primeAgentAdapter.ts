import logger from '../../utils/logger.js';
import { HandoffEvent } from '../../models/HandoffEvent.js';

export async function dispatchToPrimeAgent(event: HandoffEvent): Promise<void> {
	logger.info(`PrimeAgent adapter dispatching: ${event.title}`);
	// TODO: Implement Prime invocation (e.g., HTTP, queue)
}

export default dispatchToPrimeAgent;