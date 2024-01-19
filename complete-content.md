
## .gitignore:
```
node_modules

```

## .prettierignore:
```
.nuxt/
coverage/
dist/

```

## .prettierrc:
```
[object Object]
```

## CHANGELOG.md:
```md
# CHANGELOG

## Version 3.6.0 (2024-01-10)

### Added

- Zip code data added to purchase event

## Version 3.5.0 (2023-12-14)

### Added

- First name, last name, country code data added to purchase event

## Version 3.4.0 (2023-10-13)

### Added

- Setting a HttpOnly cookie called `ralph-gtm-user` to identify the user, this is pushed to GTM as `ralph_user` with the `original_location` event
- Introduced a `CHANGELOG.md` file

### Changed

- `autoInit` is now set to `false` by default. GTM will init after the `original_location` event is pushed to the dataLayer.

```

## LICENCE:
```
MIT License

Copyright (c) 2023 geins.io

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

```

## README.md:
```md
[![NPM Package][npm]][npm-url]
[![NPM Downloads][npm-downloads-per-month]][npm-trends]
![Geins][mit-shield]

[![Start Geins Free Trial][geins-tiral-img]][geins-tiral-url] [![Geins Docs][geins-docs-img]][geins-docs-url]

[![geins](https://raw.githubusercontent.com/geins-io/resources/master/images/banners/repos/gtm.jpg)](https://www.geins.io)

# Google Tag Manager module for Geins PWA Storefront

Add google tag manager to your Geins PWA Storefront. A wrapper around the [nuxt-gtm](https://github.com/nuxt-community/gtm-module) module.

## Pre-requisites

- Geins Account and PWA Storefront Ralph. [Get a free trial here](https://www.geins.io)
- Storefront with `@ralph/ralph-ui` 19.4.0 or higher.

## Installation

### 1. Install the module

```bash
npm i @geins/ralph-module-gtm
```

### 2. Add the module to your Geins PWA Storefront Ralph

Add the module to your Geins PWA Storefront Ralph by adding the following lines to your `nuxt.config.json` file:

```javascript
// nuxt.config.js

module.exports = {
  modules: [
    [
      '@geins/ralph-module-gtm',
      // Configuration defaults for the module
      {
        // Set to true to enable debug mode
        debug: false,
        // Set to false to disable the module
        enabled: true,
        // Settings for the GTM module, see https://github.com/nuxt-community/gtm-module for more information
        gtm: {},
        // What to use as the item_id for the product, for example 'productId' or 'articleNumber'
        itemId: 'productId',
        // If you want to override some properties of the product, you can do so here , for example: [{ override: 'price_campaign', name: 'green_price' }]
        propOverrides: []
      }
    ]
  ]
}
```

## Events

The following events are pushed to gtm by this module:

- `add_to_cart` - One or more products are added to the cart
- `remove_from_cart` - One or more products are removed from the cart
- `view_item` - A product page is viewed
- `view_item_list` - A product in a list is scrolled into view
- `select_item` - A product in a list is clicked
- `begin_checkout` - The checkout page has been entered
- `purchase` - A purchase has been made
- `original_location` - The page where the user enters the site
- `virtual_page_view` - A new navigation has been made
- `page_data` - A page has been loaded
- `add_to_wishlist` - A product has been added to the wishlist

## Cookies

The following cookies are set by this module:

- `ralph-gtm-user` - This is a HttpOnly cookie with a random value (guid) plus a UNIX timestamp that is used to identify the user. It is set to expire in 2 years.

>**Note**
> This cookie can be used as the `master-cookie` for serverside tracking. Read more about serverside tracking with **master-cookies** [here](https://stape.io/blog/increase-first-party-cookie-lifetime-set-by-a-third-party-ip).

## Note

Since this module is based on the `[@nuxtjs/gtm](https://github.com/nuxt-community/gtm-module)` module, it will conflict with it.

If you are already using the `@nuxtjs/gtm` module, you should uninstall it and use this module instead, which will include the `@nuxtjs/gtm` module as a dependency. If you are using the internal GTM events of Ralph, you should disable them by setting `useExternalGtm` to true in the `publicRuntimeConfig` of you nuxt.config.js file.

[npm]: https://img.shields.io/npm/v/@geins/ralph-module-gtm
[npm-url]: https://www.npmjs.com/package/@geins/ralph-module-gtm
[npm-downloads-per-month]: https://img.shields.io/npm/dm/@geins/ralph-module-gtm.svg
[npm-trends]: https://npmtrends.com/@geins/ralph-module-gtm
[geins-docs-url]: https://docs.geins.io
[geins-docs-img]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/geins-io/resources/master/sheilds/geins-docs-read-v3.json
[geins-tiral-url]: https://www.geins.io
[geins-tiral-img]: https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/geins-io/resources/master/sheilds/geins-fee-tiral.json
[mit-shield]: https://img.shields.io/badge/license-MIT-green
[mit-url]: https://en.wikipedia.org/wiki/MIT_License

```

## lib/compatibility.js:
```js
const chalk = require('chalk')
const semver = require('semver')

function requireNuxtVersion (nuxt, version) {
  const pkgName = require('../package.json').name
  const currentVersion = semver.coerce(nuxt.constructor.version)
  const requiredVersion = semver.coerce(version)

  if (semver.lt(currentVersion, requiredVersion)) {
    throw new Error(`\n
      ${chalk.cyan(pkgName)} is not compatible with your current Nuxt version : ${chalk.yellow('v' + currentVersion)}\n
      Required: ${chalk.green('v' + requiredVersion)} or ${chalk.cyan('higher')}
    `)
  }
}
module.exports = {
  requireNuxtVersion
}

```

## lib/components/atoms/MyAtom/MyAtom.vue:
```

<template>
  <div class="my-atom">
    <p>MyAtom</p>   
  </div>
</template>

<script>
export default {
  name: 'MyAtom',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
  destroyed(){}
};
</script>
<style lang="scss">
.my-atom {
}
</style>

```

## lib/components/mixins/MyMixin.js:
```js
export default {
  name: 'MyMixin',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
}

```

## lib/components/molecules/MyMolecule/MyMolecule.vue:
```
<template>
  <div class="my-molecule">
    MyMolecule
  </div>
</template>
<script>
export default {
  name: 'MyMolecule',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
  destroy:{},
};
</script>
<style lang="scss">
.my-molecule {
}
</style>


```

## lib/components/organisms/MyOrganism/MyOrganism.vue:
```
<template>
  <div class="my-organism">
    <p>MyOrganism</p>
  </div>
</template>
<script>
export default {
  name: 'MyOrganism',
  mixins: [],
  props: {},
  data: () => ({}),
  computed: {},
  watch: {},
  mounted() {},
  methods: {},
  destroyed(){}
};
</script>
<style lang="scss">
.my-organism {
}
</style>


```

## lib/module.js:
```js
const path = require('path')

const moduleName = 'ralphGTM'

const defaults = {
  name: moduleName,
  debug: false,
  enabled: true,
  gtm: {},
  itemId: 'productId',
  propOverrides: []
}

module.exports = async function(moduleOptions) {
  const options = {
    ...defaults,
    ...this.options[moduleName],
    ...moduleOptions
  }

  options.gtm.autoInit = false

  if (!options.enabled) {
    return false
  }

  this.addTemplate({
    src: path.resolve(__dirname, 'module.utils.js'),
    fileName: `${moduleName}.utils.js`,
    options
  })

  this.addPlugin({
    src: path.resolve(__dirname, 'module.plugin.js'),
    fileName: `${moduleName}.plugin.js`,
    options
  })

  this.requireModule(['@nuxtjs/gtm', options.gtm])

  return true
}
module.exports.meta = require('../package.json')

```

## lib/module.middleware.js:
```js
export const createMiddleware = options => {
  return (req, res, next) => {
    // todo: add option to disable logging    
    console.log('middleware', req.url)
    next();
  }
}

```

## lib/module.plugin.js:
```js
import CryptoJS from 'crypto-js'
import { v4 as uuidv4 } from 'uuid'
const moduleOptions = `<%= JSON.stringify(options) %>`

export default function({ app, req }, inject) {
  const options = JSON.parse(moduleOptions)
  inject(options.name, options)

  const getRalphUser = () => {
    if (!process.server) {
      return
    }

    const cookies = req.headers.cookie ? req.headers.cookie.split(';') : []
    const cookieName = 'ralph-gtm-user'
    let ralphUser = null

    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim()
      if (cookie.startsWith(`${cookieName}=`)) {
        ralphUser = cookie.substring(cookieName.length + 1)
      }
    }

    if (!ralphUser) {
      const guid = uuidv4()
      const timestamp = Math.floor(new Date().getTime() / 1000)
      const twoYearsMs = 63113852000
      const expirationDate = new Date(new Date().getTime() + twoYearsMs)

      ralphUser = `${guid}.${timestamp}`

      const setCookieHeader = `${cookieName}=${ralphUser}; Path=/; HttpOnly; Expires=${expirationDate.toUTCString()}`
      app.context.res.setHeader('Set-Cookie', setCookieHeader)
    }

    return ralphUser
  }

  let productImpressions = []
  let ecommerce = {}

  // Function to push product impressions to the data layer in batches
  const pushProductImpressions = () => {
    if (productImpressions.length > 0) {
      ecommerce.items = productImpressions

      resetDataLayer()
      app.$gtm.push({
        event: 'view_item_list',
        ecommerce
      })

      // Clear the product impressions array
      productImpressions = []
    }
  }

  if (process.client) {
    window.onNuxtReady(() => {
      window.addEventListener('beforeunload', () => {
        pushProductImpressions()
      })
    })
  }

  const splitDiscount = (items, discount) => {
    let groupDiscount = discount
    let groupPrice = items.reduce((sum, ci) => sum + ci.price, 0)
    let totalDiscount = 0

    items?.map(cartItem => {
      let ratio = cartItem.price / groupPrice
      let discountSum = Math.round(groupDiscount * ratio * 100) / 100
      cartItem.price = Math.round((cartItem.price - discountSum) * 100) / 100

      if (cartItem.discount != null) {
        cartItem.discount += discountSum
      }

      totalDiscount += discountSum
      return cartItem
    })

    let rounding = Math.round((groupDiscount - totalDiscount) * 100) / 100

    if (rounding !== 0) {
      items[0].price -= rounding
      items[0].discount += rounding
    }

    return items
  }

  const getSalesCategory = discountPercent => {
    if (discountPercent >= 0 && discountPercent <= 5) {
      return '0-5%'
    } else if (discountPercent >= 6 && discountPercent <= 10) {
      return '6-10%'
    } else if (discountPercent >= 11 && discountPercent <= 15) {
      return '11-15%'
    } else if (discountPercent >= 16 && discountPercent <= 20) {
      return '16-20%'
    } else if (discountPercent >= 21 && discountPercent <= 30) {
      return '21-30%'
    } else if (discountPercent >= 31 && discountPercent <= 40) {
      return '31-40%'
    } else if (discountPercent >= 41 && discountPercent <= 50) {
      return '41-50%'
    } else if (discountPercent >= 51 && discountPercent <= 60) {
      return '51-60%'
    } else if (discountPercent >= 61 && discountPercent <= 70) {
      return '61-70%'
    } else if (discountPercent >= 71 && discountPercent <= 80) {
      return '71-80%'
    } else if (discountPercent >= 81 && discountPercent <= 100) {
      return '81-100%'
    } else {
      return 'Invalid discount percentage'
    }
  }

  const getItem = (product, skuItem = null, index = 1) => {
    const variant = getItemVariant(product) || String(skuItem?.skuId) || ''
    const price = skuItem?.unitPrice || product.unitPrice
    const discount = price?.regularPriceIncVat - price?.sellingPriceIncVat

    let item = {
      item_name: product.name,
      item_id: product[options.itemId],
      price: price?.sellingPriceIncVat,
      price_campaign: product.discountType === 'PRICE_CAMPAIGN',
      item_brand: product.brand?.name,
      item_category: product.primaryCategory?.name,
      // item_category2: item_category2,
      // item_category2: item_category3,
      // item_category4: item_category4,
      item_variant: variant,
      // item_list_name: list_name,
      // item_list_id: list_id,
      index: index,
      quantity: skuItem?.quantity || 1,
      sales_type: getSalesCategory(price?.discountPercentage)
      // customer_segmentation: customer_category
    }

    if (!Number.isNaN(discount)) {
      item.discount = Math.max(0, discount)
    }

    item = overrideProps(item)

    return item
  }

  const getItemVariant = product => {
    const group = product?.parameterGroups?.find(
      group => group?.parameterGroupId === 1
    )
    const parameter = group?.parameters?.find(p => p.name === 'Color')
    return parameter?.value || ''
  }

  const overrideProps = obj => {
    options.propOverrides.forEach(prop => {
      const value = obj[prop.override]
      if (!value) {
        return
      }
      delete obj[prop.override]
      obj[prop.name] = value
    })
    return obj
  }

  const resetDataLayer = () => {
    app.$gtm.push({ ecommerce: null })
  }

  // Listen to events in ralph and take action
  app.store.subscribe((mutation, state) => {
    if (mutation.type === 'events/push') {
      const eventType = mutation.payload.type
      const eventData = mutation.payload.data
      ecommerce.currency = state.channel.currentCurrency

      let product = eventData.product ?? null

      // ADD TO CART / REMOVE FROM CART
      // --------------------------------
      if (eventType.includes('cart')) {
        ecommerce.items = [getItem(product, eventData.item)]

        const event =
          eventType.split(':')[1] === 'add' ? 'add_to' : 'remove_from'

        resetDataLayer()
        app.$gtm.push({
          event: `${event}_cart`,
          ecommerce
        })
      }

      // PRODUCT IMPRESSIONS / VIEW ITEM LIST
      // ------------------------------------
      if (eventType === 'product:impression') {
        const item = getItem(product, null, eventData.index)
        productImpressions.push(item)

        // Check if the batch size limit is reached and push group
        if (productImpressions.length >= 4) {
          pushProductImpressions()
        }
      } else {
        // If other event, push leftovers if any
        pushProductImpressions()
      }

      // PRODUCT CLICK / SELECT ITEM
      // ---------------------------
      if (eventType === 'product:click') {
        ecommerce.items = [getItem(product, null, eventData.index)]

        resetDataLayer()
        app.$gtm.push({
          event: 'select_item',
          ecommerce
        })
      }

      // PRODUCT DETAIL IMPRESSION / VIEW ITEM
      // -------------------------------------
      if (eventType === 'product-detail:impression') {
        ecommerce.items = [getItem(product)]

        resetDataLayer()
        app.$gtm.push({
          event: 'view_item',
          ecommerce
        })
      }

      // CHECKOUT IMPRESSION / BEGIN CHECKOUT
      // ------------------------------------
      if (eventType === 'checkout:impression') {
        const cartItems =
          state?.cart?.data?.items?.map(item => {
            return getItem(item.product, item)
          }) || []

        ecommerce.items = cartItems

        resetDataLayer()
        app.$gtm.push({
          event: 'begin_checkout',
          ecommerce
        })
      }

      // PAGE IMPRESSION
      // ---------------
      if (eventType === 'page:impression') {
        app.$gtm.push({
          event: 'page_data',
          page_type: eventData.route?.meta[0]?.pageType
        })

        if (eventData.isSSR) {
          const ralph_user = getRalphUser()
          app.$gtm.push({
            event: 'original_location',
            original_location: eventData.requestUrl,
            ralph_user
          })
          app.$gtm.init(options.gtm.id)
        } else {
          app.$gtm.push({
            event: 'virtual_page_view',
            pagePath: eventData.route.fullPath
          })
        }
      }

      // ADD FAVORITE
      // ------------
      if (eventType === 'favorite:add') {
        const item = getItem(product)
        ecommerce.items = [item]

        resetDataLayer()
        app.$gtm.push({
          event: 'add_to_wishlist',
          ecommerce
        })
      }

      // TRANSACTION / PURCHASE
      // ----------------------
      if (eventType === 'checkout:purchase') {
        const email = eventData.order?.email?.toLowerCase().trim()
        const firstName = eventData.order?.firstName?.toLowerCase().trim()
        const lastName = eventData.order?.lastName?.toLowerCase().trim()
        const zip = eventData.order?.zip?.toLowerCase().trim()

        const hashedEmail = CryptoJS.SHA256(email).toString()
        const hashedFirstName = CryptoJS.SHA256(firstName).toString()
        const hashedLastName = CryptoJS.SHA256(lastName).toString()
        const hashedZip = CryptoJS.SHA256(zip).toString()

        ecommerce = {
          transaction_id: eventData.order?.orderId || '',
          currency: eventData.order?.currency || '',
          value: eventData.orderCart?.summary.total.sellingPriceIncVat,
          value_ex_tax: eventData.orderCart?.summary.total.sellingPriceExVat,
          value_tax: eventData.orderCart?.summary.total.vat,
          items_value: eventData.order?.itemValueIncVat,
          items_value_ex_tax: eventData.order?.itemValueExVat,
          items_tax:
            eventData.order?.itemValueIncVat - eventData.order?.itemValueExVat,
          shipping: eventData.orderCart?.summary.shipping.feeIncVat,
          shipping_ex_tax: eventData.orderCart?.summary.shipping.feeExVat,
          coupon: eventData.orderCart?.promoCode || '',
          user_id: hashedEmail || '',
          user_first_name: hashedFirstName || '',
          user_last_name: hashedLastName || '',
          user_zip: hashedZip || '',
          total_discount: eventData.orderCart?.summary.total.discountIncVat,
          nth_purchase: eventData?.nthPurchase || 1,
          country: app.store.getters['channel/checkoutMarketObj']?.country?.code || '',
        }

        const fixedAmountDiscount =
          eventData.orderCart?.summary?.fixedAmountDiscountIncVat
        const fixedAmountDiscountExVat =
          eventData.orderCart?.summary?.fixedAmountDiscountExVat

        if (fixedAmountDiscount > 0) {
          ecommerce.items_value = ecommerce.items_value - fixedAmountDiscount
          ecommerce.items_value_ex_tax =
            ecommerce.items_value_ex_tax - fixedAmountDiscountExVat
          ecommerce.items_tax =
            ecommerce.items_tax -
            (fixedAmountDiscount - fixedAmountDiscountExVat)
        }

        ecommerce = overrideProps(ecommerce)

        let cartItems =
          eventData.orderCart?.items?.map(item => {
            return getItem(item.product, item)
          }) || []

        if (fixedAmountDiscount > 0) {
          cartItems = splitDiscount(cartItems, fixedAmountDiscount)
        }

        ecommerce.items = cartItems

        resetDataLayer()
        app.$gtm.push({
          event: 'purchase',
          ecommerce
        })
      }

      // All events sent by ralph since version 19.3.0
      // ------------------------------------------------
      // `product:impression` - data payload: `{ product, page, index, pageSize }` (changed payload)

      // All events sent by ralph since version 19.1.0
      // ------------------------------------------------
      // `widget:click` - data payload: `{ href }`
      // `menu:click` - data payload: `{ item }`
      // `search:click` - data payload: `{ type, data }`

      // All events sent by ralph since version 19.0.0
      // ------------------------------------------------
      // `cart:add` - data payload: `{ item, product }`
      // `cart:remove` - data payload: `{ item, product }`
      // `page:impression` - data payload: `{ route }`
      // `product:click` - data payload: `{ product, page, index, pageSize }`
      // `product:impression` - data payload: `{ product, page }`
      // `product-detail:impression` - data payload: `{ product }`
      // `favorite:add` - data payload: `{ productId, product }`
      // `favorite:remove` - data payload: `{ productId, product }`
      // `checkout:impression` - data payload: `{}`
      // `checkout:update` - data payload: `{ checkout }`
      // `checkout:purchase` - data payload: `{ order }`
      // `user:login` - data payload: `{}`
      // `user:logout` - data payload: `{}`
      // `user:register` - data payload: `{}`
      // `user:password-reset` - data payload: `{ email, resetKey }`
      // `user:delete` - data payload: `{}`
      // `newsletter:subscribe` - data payload: `{ email }`
    }
  })
}

```

## lib/module.utils.js:
```js
const moduleOptions = `<%= JSON.stringify(options) %>`
const logStyle =
  'background-color: #FFFFFF; padding: 2px 5px; border-radius: 5px; font-weight: bold; border: 1px solid #e8452c; color: #e8452c;'
export function log(...args) {
  const options = JSON.parse(moduleOptions)
  // eslint-disable-next-line no-console
  console.log('%c' + options.name, logStyle, ...args)
}

```

## package-lock.json:
```json
[object Object]
```

## package.json:
```json
[object Object]
```

## ralph-module-gtm.code-workspace:
```
[object Object]
```

## test/fixture/nuxt.config.js:
```js
const resolve = require('path').resolve

const optionConfig = {}

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  modules: ['~/../../lib/module'],
  'lp-pwa-module-boilerplate': optionConfig,
  dev: process.env.NODE_ENV !== 'test' && process.env.NODE_ENV === 'production'
}

```

## test/fixture/pages/index.vue:
```
<template>
  <div>
    create-nuxt-module default content
  </div>
</template>

<script>
export default {}
</script>

```

## test/system/module.test.js:
```js
const puppeteer = require('puppeteer')
const request = require('request-promise-native')

const { Nuxt, Builder } = require('nuxt')
const config = require('../fixture/nuxt.config')

const url = path => `http://localhost:3000${path}`
const get = path => request(url(path))

jest.setTimeout(10000)

describe('module E2E test', () => {
  let nuxt
  let page
  let browser

  beforeAll(async () => {
    nuxt = new Nuxt(config)

    const createNuxt = async () => {
      await new Builder(nuxt).build()
      await nuxt.listen(3000)
    }
    const createBrowser = async () => {
      browser = await puppeteer.launch({
        args: [
          '--no-sandbox'
        ],
        headless: process.env.NODE_ENV !== 'development',
        timeout: 0
      })
      page = await browser.newPage()
    }
    await Promise.all([createNuxt(), createBrowser()])
  }, 300000)

  afterAll(async () => {
    await browser.close()
    await nuxt.close()
  })

  test('WIP', () => {
    // TODO: write test
    expect(true).toBe(true)
  })
})

```

## test/unit/module.middleware.test.js:
```js
describe('module.middleware.js', () => {
  describe('sample', () => {
    it('should returns true', () => {
      expect(true).toBe(true)
    })
  })
})

```

## test/unit/module.test.js:
```js
describe('module.js', () => {
  describe('sample', () => {
    it('should returns true', () => {
      expect(true).toBe(true)
    })
  })
})

```
