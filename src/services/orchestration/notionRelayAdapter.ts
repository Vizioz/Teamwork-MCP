import logger from '../../utils/logger.js';
import { HandoffEvent } from '../../models/HandoffEvent.js';

export async function dispatchToNotionRelay(event: HandoffEvent): Promise<void> {
	logger.info(`NotionRelay adapter dispatching: ${event.title}`);
	// TODO: Implement Notion API call using channel as page/database id
}

export default dispatchToNotionRelay;