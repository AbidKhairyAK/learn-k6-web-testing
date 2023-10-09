import { check, group } from 'k6'
import http from 'k6/http'
import { Trend } from 'k6/metrics'

import { headers } from '../config/headers.js'

const pageDuration = new Trend('page_inventory_duration', true)

export default function () {
	group('02_inventory_page', function () {
		const responses = http.batch([
			['GET', 'https://www.saucedemo.com/v1/inventory.html', headers],
			['GET', 'https://www.saucedemo.com/v1/css/sample-app-web.css', headers],
			['GET', 'https://www.saucedemo.com/v1/main.js', headers],
			['GET', 'https://www.saucedemo.com/v1/img/SwagBot_Footer_graphic.png', headers],
			['GET', 'https://www.saucedemo.com/v1/img/SwagLabs_logo.png', headers],
			['GET', 'https://www.saucedemo.com/v1/img/twitter.png', headers],
			['GET', 'https://www.saucedemo.com/v1/img/facebook.png', headers],
			['GET', 'https://www.saucedemo.com/v1/img/linkedIn.png', headers],
			['GET', 'https://www.saucedemo.com/v1/img/sauce-backpack-1200x1500.jpg', headers],
			['GET', 'https://www.saucedemo.com/v1/img/bike-light-1200x1500.jpg', headers],
			['GET', 'https://www.saucedemo.com/v1/img/bolt-shirt-1200x1500.jpg', headers],
			['GET', 'https://www.saucedemo.com/v1/img/sauce-pullover-1200x1500.jpg', headers],
			['GET', 'https://www.saucedemo.com/v1/img/red-onesie-1200x1500.jpg', headers],
			['GET', 'https://www.saucedemo.com/v1/img/red-tatt-1200x1500.jpg', headers],
			['GET', 'https://www.saucedemo.com/v1/img/peek.png', headers],
		])

		for (const res of responses) {
			pageDuration.add(res.timings.duration)

			check(res, {
				'status 200': r => r.status === 200
			})
		}
	})
}