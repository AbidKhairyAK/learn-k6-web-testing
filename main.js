import { browser } from 'k6/experimental/browser'

import login_protocol from './protocol-test/01_login_page.protocol.test.js'
import inventory_protocol from './protocol-test/02_inventory_page.protocol.test.js'

import login_browser from './browser-test/01_login_page.browser.test.js'
import inventory_browser from './browser-test/02_inventory_page.browser.test.js'

export const options = {
	scenarios: {
		protocolBased: {
			exec: 'protocolBasedScript',
			executor: 'constant-vus',
			vus: 10,
			duration: '10s',
		},
		browserBased: {
			exec: 'browserBasedScript',
			executor: 'shared-iterations',
			options: {
				browser: {
					type: 'chromium'
				}
			}
		}
	}
}

export async function browserBasedScript () {
	const page = browser.newPage()

	try {
		await login_browser(page)
		await inventory_browser(page)
	} finally {
		page.close()
	}
}

export function protocolBasedScript () {
	login_protocol()
	inventory_protocol()
}