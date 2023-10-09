import { sleep } from 'k6'

export default async function (page) {
	await page.goto('https://www.saucedemo.com/v1/inventory.html')
	page.waitForSelector('.inventory_item')
	page.screenshot({ path: 'screenshots/02_inventory_page.png' })
	sleep(3)
}