import { sleep } from 'k6'

export default async function (page) {
	await page.goto('https://www.saucedemo.com/v1/')
	page.waitForSelector('.bot_column')
	page.screenshot({ path: 'screenshots/01_login_page.png' })
	sleep(3)
}