import logger from '../../utils/logger.js';
import { HandoffEvent } from '../../models/HandoffEvent.js';

export async function dispatchToClaudeAgent(event: HandoffEvent): Promise<void> {
	logger.info(`ClaudeAgent adapter dispatching: ${event.title}`);
	// TODO: Implement Claude API call
}

export default dispatchToClaudeAgent;