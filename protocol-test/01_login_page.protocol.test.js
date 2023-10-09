import { check, group } from 'k6'
import http from 'k6/http'
import { Trend } from 'k6/metrics'

import { headers } from '../config/headers.js'

const pageDuration = new Trend('page_login_duration', true)

export default function () {
	group('01_login_page', function () {
		const responses = http.batch([
			['GET', 'https://www.saucedemo.com/v1/', headers],
			['GET', 'https://www.saucedemo.com/v1/css/sample-app-web.css', headers],
			['GET', 'https://www.saucedemo.com/v1/img/Login_Bot_graphic.png', headers],
			['GET', 'https://www.saucedemo.com/v1/main.js', headers],
			['GET', 'https://www.saucedemo.com/v1/img/SwagLabs_logo.png', headers],
		])

		for (const res of responses) {
			pageDuration.add(res.timings.duration)

			check(res, {
				'status 200': r => r.status === 200
			})
		}
	})
}