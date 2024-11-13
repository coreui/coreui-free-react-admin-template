# CDN Usage of MSAL.js

In addition to npm, `msal` can be consumed from Microsoft-hosted CDNs.

## Best Practices

* Use the latest version of MSAL.js.
* Use the minified build in production, unminified build for development.
* Use the Microsoft CDN instead of third-party CDNs.
* Use the CDN region nearest to your users.
* Use the `async` or `defer` attributes to not block page rendering.
* Use the `integrity` attribute to ensure integrity of CDN builds.
* IE11 support requires a Promise polyfill ([more information](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/samples/msal-core-samples/VanillaJSTestApp/app/ie11-sample/README.md) on IE11 support).

## Basic Usage

<!-- CDN_LATEST -->
```html
<script type="text/javascript" src="https://alcdn.msauth.net/lib/1.4.17/js/msal.min.js"></script>
```

## Unminified builds

In addition to minified builds, unminified builds for each version are also available (as `msal.js` instead of `msal.min.js`)

```html
<!-- Replace <version> with desired version, e.g. 1.4.0 -->
<script type="text/javascript" src="https://alcdn.msauth.net/lib/<version>/js/msal.js"></script>
```

## Alternate region

Microsoft offers CDN builds hosted in two different regions, US West and Europe North.

CDN Domain          | Region       | Example
--------------------| -------------| --------
`alcdn.msauth.net`  | US West      | `https://alcdn.msauth.net/lib/<version>/js/msal.min.js`
`alcdn.msftauth.net`| Europe North | `https://alcdn.msftauth.net/lib/<version>/js/msal.min.js`

### CDN fallback

In the unlikely event that a CDN build is broken or the CDN itself is inaccessible, an application can use the other CDN region as a fallback:

```html
<script type="text/javascript" src="https://alcdn.msauth.net/lib/1.4.0/js/msal.js"></script>
<script type="text/javascript">
    if(typeof Msal === 'undefined')document.write(unescape("%3Cscript src='https://alcdn.msftauth.net/lib/1.4.0/js/msal.js' type='text/javascript' %3E%3C/script%3E"));
</script>
```

**Note:** This method of using `document.write` may be blocked in certain browsers in certain situations. More information can be found [here](https://www.chromestatus.com/feature/5718547946799104).

## Subresource Integrity

From [MDN](https://developer.mozilla.org/docs/Web/Security/Subresource_Integrity):

> Subresource Integrity (SRI) is a security feature that enables browsers to verify that resources they fetch (for example, from a CDN) are delivered without unexpected manipulation. It works by allowing you to provide a cryptographic hash that a fetched resource must match.

> Using Content Delivery Networks (CDNs) to host files such as scripts and stylesheets that are shared among multiple sites can improve site performance and conserve bandwidth. However, using CDNs also comes with a risk, in that if an attacker gains control of a CDN, the attacker can inject arbitrary malicious content into files on the CDN (or replace the files completely) and thus can also potentially attack all sites that fetch files from that CDN.

> Subresource Integrity enables you to mitigate some risks of attacks such as this, by ensuring that the files your web application or web document fetches (from a CDN or anywhere) have been delivered without a third-party having injected any additional content into those files — and without any other changes of any kind at all having been made to those files.

It is highly recommended to use SRI Hashes with CDN builds of MSAL.js to help secure your application and the authentication artifacts (e.g. access tokens) that MSAL.js stores in the browser.

### MSAL.js SRI Hash Example

```html
<script 
  type="text/javascript" 
  src="https://alcdn.msftauth.net/lib/1.4.0/js/msal.min.js" 
  integrity="sha384-6X/CShANCpFojIOVupEAGk9qfUlPGGcmS9ifhJ7NtMbAqD8UJDtwZv/q30RjFWxV" 
  crossorigin="anonymous"></script>
```

### SRI Hash Notes
- Each hash will be unique to the version of MSAL.js, and will not change.
- SRI hash usage is optional for MSAL.js CDN builds.
- If the `integrity` attribute is used for MSAL.js CDN builds, the `crossorigin` attribute must be set to `"anonymous"`. 
- If you believe our CDN builds have been comprimised, please [inform us](https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/SECURITY.md#reporting-a-vulnerability) immediately.


### SRI Hash History

<!-- SRI_TABLE_START -->
Version | Build       | SRI Hash
--------| ----------- | ---------------------------
1.4.17   | msal.js     | `sha384-fQMQIKsEX4Tfiozq5T+7S0d0mUws7XUtIAHcBvsoxy0M07pQ+sPGCfVgOF/H+27s`
1.4.17   | msal.min.js | `sha384-cvvRRsIY3q+PWX/oSBA4S8aEDfTaVRMSnxl2VirCpsEtOwJQ1xS+uWBfYB4bhZ/7`
1.4.16   | msal.js     | `sha384-SPnHRh7BjMGqffs8iBNxDGS8Sq2A+eS++kY3anLO2rNbiCgeoWg+nGS+w8STQr2B`
1.4.16   | msal.min.js | `sha384-EXLFv/N6/oShqrb4y/Q9EgPkwnhAmQkRgZXz9+/HgzEmZXzXvmPP5yunMCWNviJN`
1.4.15   | msal.js     | `sha384-UECzz1Tzc34O8beF9Ke6ncxLUXxGxbe2RK8X/yeX1ijHTaKpU7d4qyYfB1Iwh/sx`
1.4.15   | msal.min.js | `sha384-+b8P6Ktuu8q2VtO2GFBS2l8vJP76oUj8iAd+U8w3h1iEbkQTYBQeUEuB2hZQqcUK`
1.4.14   | msal.js     | `sha384-sy/O10kHoiUm0wskDW4fqtMsvDyZe2BfsZoVJyr0Cy/9CLghLmLAG4ck0VyG+Dqv`
1.4.14   | msal.min.js | `sha384-xHS6gJFNY6opy+G+RcmD34e9eaJ3p39HeY9j6OAv+BvsZPYZd22XZABmLrhIVuUo`
1.4.13   | msal.js     | `sha384-YDs8gT7xCXORl85PSpgNVFuUGWo24nsBg2jdY09g2MWCA17I6snX37LlH0Gv7SKM`
1.4.13   | msal.min.js | `sha384-QzBZi4XeyAgwexauyGuslQVxU3/MviIRuZ9X27s+D+SCkAPETHygLaG/bB7yqYxD`
1.4.12   | msal.js     | `sha384-2N+slcMnph+Zx/e95bNf2n8Kqp9S3cMV6lKKdAfGUfTjGzzI/wQHY5H+4JjJPVEw`
1.4.12   | msal.min.js | `sha384-HXrlXE4RRX2qTeeyar+QPFN2KFqpKglha0CR80D7ukeUk4sSPMsZh7QKi2ppo93E`
1.4.11   | msal.js     | `sha384-lfBCz1IleFDzaGx6P3QYr71aSHr1bei2uZJ1Z0wUaeuQkXpO3ufMEpylKastwUcR`
1.4.11   | msal.min.js | `sha384-+peQhgj5JzByPjjtyGpaIIazt9r6Jjh6opqIC1XHS7MZk6CBT80y+fNcOV5HXWX2`
1.4.10   | msal.js     | `sha384-4z1OnPVAf5yoOWlvO7vjWOlCxJeSDl1kWG60dxWzALSQ6Qc74wf9s62UkYv1JyEp`
1.4.10   | msal.min.js | `sha384-oWrl8CAgiYShK8tOdGvhwpkW8dpwSLhYXZ3zwXP8wfk6VrC1HL+Fd6hkAh6HQ3YN`
1.4.9   | msal.js     | `sha384-DoT9Qwx2RkHpZq1/5CU1sVXz4E3nWpLCq78Rduyd8bB5Lf8/sYaMbzpBLuxzPV7e`
1.4.9   | msal.min.js | `sha384-OJDpL3Ut0Ak83/dKgdFcrxavZQlIBs8lyX2Bu8W9XL1PqEK3oQkwOOo4KXAbFqQI`
1.4.8   | msal.js     | `sha384-rLIIWk6gwb6EYl6uqmTG4fjUDijpqsPlUxNvjdOcqt/OitOkxXKAJf6HhNEjRDBD`
1.4.8   | msal.min.js | `sha384-vw7GlHjJh3L1Dl3jehfWLNy2pgpxR959HE+mCjNCEG+0zWOnt6tYubajsXBaJq/g`
1.4.7   | msal.js     | `sha384-HZijf18eb57C1WdcsZVqEUadJwEXFR5KIBJ8beLghSrO94IFFjArCqw2gZFkpCFX`
1.4.7   | msal.min.js | `sha384-IVdWY8yqbDGv4MmETLyM/U69ZnFpWAMNsHcNtzOnfuQMiaoR3aZ2XWpUT+kzBH+v`
1.4.6   | msal.js     | `sha384-dOUgsELOfA0PeG+hIwUG2smqEslXDPZwdiWayfnaGvfXvF9KrYtPFPbtB5NhpU+k`
1.4.6   | msal.min.js | `sha384-rOMLkPdshUpj097h29CyUItUzKD60oRKD4LCT/qTqtLfPTQt6LGLg95EyskvzJpT`
1.4.5   | msal.js     | `sha384-/KKiVcHOMRF5hXmgtoVh1UsxkJupUivHchz/Mf4dYyAR8aV0t8AqZDvFohOjj8Av`
1.4.5   | msal.min.js | `sha384-35piYQtnCDJZxSbu/KD/4K6J/5vdITyJkoE5PvyejGRdu7qLGxVudvgODY+6lO6E`
1.4.4   | msal.js     | `sha384-fTmwCjhRA6zShZq8Ow5ZkbWwmgp8En46qW6yWpNEkp37MkV50I/V2wjzlEkQ8eWD`
1.4.4   | msal.min.js | `sha384-tJ2+UP9ZChH3JEqlsZkwy5w+m9XN51L2GaA8Mzp5r0z5ZHyRLMLNGaswNxiSvHYU`
1.4.3   | msal.js     | `sha384-Ndf/mI4t2fY6agloHXTqPi2l/W+GbkqmaurLsLFcr7tVUEmroJ7KtBhEFYmZe9RJ`
1.4.3   | msal.min.js | `sha384-9q4FGZujTyJtNV91J580pC2zLGhqIVQ83YzDgM7DBQpeR5gBjgKPVJ50coTKP+sw`
1.4.2   | msal.js     | `sha384-67878C1OfZkWiSmJMKaQsXCZPQtvEcM884jw9pi3b4DQ/MvuDjU7F1DEj2uqi8cr`
1.4.2   | msal.min.js | `sha384-BRQRaUeLqQOYFElnECTT4f6N2tlxW/NBv/ZUkevFIaFLfn1fmVO8Tey/Dq7YFVDY`
1.4.1   | msal.js     | `sha384-gsG3jdkq/qz+9oOnTog79fNfocY/PJ9mvoXEbRB9y9SzP5RmGPGAl/FlCWRELZDR`
1.4.1   | msal.min.js | `sha384-YeC6ifaQB+F6gDcE5lTJkAp5sKs62B3czPDAB3wiqVDKGnaCbRm3hOqGRF1r0Cu9`
1.4.0   | msal.js     | `sha384-DqrejB/00ccJc4ufFWc+TA3ImOruMihWCj6Wu9hEzRUNdqt4180qlzT0mFa6/Zp2`
1.4.0   | msal.min.js | `sha384-6X/CShANCpFojIOVupEAGk9qfUlPGGcmS9ifhJ7NtMbAqD8UJDtwZv/q30RjFWxV`
1.3.4   | msal.js     | `sha384-SLUfcZqOuUn4mgjkztK5Q6sZ/m08tFoo6K1sSGPkKN+y+QZZZ4DYFNpLmLcmMoLA`
1.3.4   | msal.min.js | `sha384-pkCsjTAwVvsQv5UEAo+kNmnVMFs/GoqIP/G9J0ZV7rC55j3hcV225SGGQJY8wwtn`
1.3.3   | msal.js     | `sha384-NXrqATyZkIFf34YAQc9KUsELNnChm0YXI0Hugq92c2abTH1Gv7He1R/t89iGIAJn`
1.3.3   | msal.min.js | `sha384-36I7QTFSxEfBGkSBpZ3zdySjtmAchWxrUHUFcLzDJVLe4dGnEwnOmp0vRfA1lek+`
1.3.2   | msal.js     | `sha384-rwyXLM4dOdS5ptZmCIqzjVrWmbPA6bnan0Fy35CYYY13MdE0gK/L0TVDnKdEQV7q`
1.3.2   | msal.min.js | `sha384-4cH4i4aLXsdIJJz5DF27S+GxZXRSqBORS4NN7kc7NyZBBIugxFyt6hQt5FiR/DuZ`
1.3.1   | msal.js     | `sha384-YjtcEEqiYcRGh2K/ehq07C6Bk9jKrKoMgdFy9YGfTxtrmzV3GyNi0DDgwhmcCNrE`
1.3.1   | msal.min.js | `sha384-kb1EkR5mZZRISRcdpYMFQRBDBb/RG/tKvYeCbgFjLUhPu54tjm1O4OPkvmOMnpPJ`
1.3.0   | msal.js     | `sha384-n2/wxR+doMGeL8Lmj4kdPRfZBUg2d/OAVqaKCoHPWOfOs1HUFU3laBvp3gv/HBOu`
1.3.0   | msal.min.js | `sha384-CffO5BkITSJhYPN8BUPR9pm6G6FQyzwV5n9JCMtcP98ik6IHSMJSAZPE2JO3AXDh`
1.2.2   | msal.js     | `sha384-n2/wxR+doMGeL8Lmj4kdPRfZBUg2d/OAVqaKCoHPWOfOs1HUFU3laBvp3gv/HBOu`
1.2.2   | msal.min.js | `sha384-eSH2oPL3slP7xPzrIISf+chfkjBTLlhmdW4oqNqSQ0wrS0EkHUZ9wiQfW575BjC6`
1.2.1   | msal.js     | `sha384-9TV1245fz+BaI+VvCjMYL0YDMElLBwNS84v3mY57pXNOt6xcUYch2QLImaTahcOP`
1.2.1   | msal.min.js | `sha384-Z4L5heyGO9VZ/MBCDx9GRtQW50Hrmp32ByIKuqwFesWyB+MDNy9ueVgclolfwj1Q`
1.2.0   | msal.js     | `sha384-LSjD9o5MhT3UejOHZ5BJrlAp3TxNM6z68DPYw3o7Q3ApJviS9kOGP0oQyTaJJd9O`
1.2.0   | msal.min.js | `sha384-bUAfT3zjpyf+nuTqeGYWk7ZKN6E89ouvkiXth6G45RG55uQERls6TtStVOBM6v4O`
1.1.3   | msal.js     | `sha384-m/3NDUcz4krpIIiHgpeO0O8uxSghb+lfBTngquAo2Zuy2fEF+YgFeP08PWFo5FiJ`
1.1.3   | msal.min.js | `sha384-dA0Vw9s8Y8YiIYiE44WOORFrt3cwi0rYXwpetCRnFYziAtXEZ4miG8TMSGo8BIyL`
1.1.2   | msal.js     | `sha384-7Tfmyt6LHvfAaFOyMO+xB2LNlizyoOqOjTpE5TozyuKLeLJCY+aeG8jTPUU/a/eu`
1.1.2   | msal.min.js | `sha384-P7DiH/MUUHD1d41S0b9x5aPAVjW9uikNHFkeERTC7JzltKCx0E7VjZeRFiFL/4Wn`
1.1.1   | msal.js     | `sha384-lhlN+mWnVW/0gtymN2LvVNcVCqEkUZ7bEGJ6/S310LrK23y+BIC/ZWEv9i3BCfrp`
1.1.1   | msal.min.js | `sha384-5uId2MNKlSyxh7xL1+dfiFQhD+sKb2qLVjX4uLrDIgnzbXOZmjO9LRjaAJbzTzKq`
1.1.0   | msal.js     | `sha384-53AIYbe0k1eWy4fjgOhYSb8AlZQXWK1FRnrXsdiH8DG6SDDF/TRQmBh9vx99l+rV`
1.1.0   | msal.min.js | `sha384-XDORa6Kv553jB6XjaWfbPOjNVJOxBdB7NfvVtFeUTNfm9LOLYyNqPPr44xxOzyxb`
1.0.2   | msal.js     | `sha384-+k01G9iZEvDJV+pT6/HBWt3sPtAzmO2Np96PfJcLalUAuAIDsXAs5BGmtESC+sLL`
1.0.2   | msal.min.js | `sha384-qG5KUExZdZCA9qjuYVyoqr7gTT+8MtThFPct1V4bcH9YiN2Z+JNlV0WUhHt3WcHO`
1.0.1   | msal.js     | `sha384-iKfqIXg4/mwitg1zYpvVnHCce523K9+EI86HrFFLKU+FSbDA7qXQtGIsRoj+0Ymg`
1.0.1   | msal.min.js | `sha384-U8/FAuo2D2BkQz7U9Y6EJwnXm7mk+IVbyIyjBgNQvcXeElulyqy4t+3NcjN5bwWF`
1.0.0   | msal.js     | `sha384-2f5zZtNBJYY5SYk6iemfozas1aVScvY8KGBTzm9K3qsUwJ5d0wB8qmXUjWfFuEZt`
1.0.0   | msal.min.js | `sha384-JrnDP9rGv/2Y3Hr/tAea/SvhMgKvfPHCK7GsjK4xH326K9AdRVUkgqS6cgG9qcLL`
0.2.4   | msal.js     | `sha384-DbDPH21H9wAvWxiluBCwk+1CNFwul7V0MO6moVjDrt5PFoId2Gm8pYamyK0xZjDU`
0.2.4   | msal.min.js | `sha384-5PUwk+rp+Yovytrq8poRG4BH3iqRdwgKUKgbnrpPVuLtu51QnrmXPBRITW50QaYK`
0.2.3   | msal.js     | `sha384-w+80VVyNNjw0X1E81uQOBlm8/EKE16XFyuZ4gUzevKSpCjl4K2fw57hDiA39azF7`
0.2.3   | msal.min.js | `sha384-rGkLRqTkhrP/8flhd9MYSHI5+E7Es5QKgUYIdsmhHW4Gjj1duJ41xBj600oBj2fw`
0.2.2   | msal.js     | `sha384-/7xln9Vkx+PpbQYTYkGGG5puwiWvR26PMZxsSQMc2Xmq8F9bgQCec8F8lOo/Uj+7`
0.2.2   | msal.min.js | `sha384-T4Bau4NWVmN0/P14uu/aqADN3egjj1Pvn3bydxBuYFT09JnhNT5CzTtEULlN+5Zp`
0.2.1   | msal.js     | `sha384-y9LAto4rX9LoIRNtpHnrNxHnRyUWvrKUWm8XXGUaK78F3+shpFU8RfaHl1RUDXld`
0.2.1   | msal.min.js | `sha384-2Rbtg6QnsSz+tp51dDnhxraEQFlYlYzdSM+j7kMfsQdR5H86QujbMZVwuaiIosjx`
0.2.0   | msal.js     | `sha384-bBwydq6xJWMgLVvNd/Bwzh0R/QZRsvX/arOoUbl+VtwxWVyBhdKUAqP5tymnXiee`
0.2.0   | msal.min.js | `sha384-n13CoO6Xjx5zg79xLnO5d+lyt2jpNlw3lUzIKLBOkxdK/KH9KzCEsD9RlqU3dLdx`
0.1.9   | msal.js     | `sha384-bkbxTzKQkGwQMrzrqPjuj8mTJghd1utNEWkG/DPLgRMSXfMFjo2AEyJML8aQZFqK`
0.1.9   | msal.min.js | `sha384-FImOwJKtnTSlcPHnbdOxnqKUrdaaJB+saURHpcRgoki6gLJQtErBLAdn1IaXykZD`
0.1.7   | msal.js     | `sha384-V2fjJ4EKwqdRAvTUB54d0jDR07pKdN5XeWiRqjUPC3ek7syTc3cVIorrXAFMElBO`
0.1.7   | msal.min.js | `sha384-03REuRoep6LXaceVjSD3J4G8PPG0aq7RltVKBpiOOfboMX4NuoGXhwRTOmaWKGeE`
0.1.6   | msal.js     | `sha384-BSOMa8wVfZFZ6ErZw72zgFOoeEgFUlFRkmt4hxHCVZtLTfc+N/e8spXZat+3K86H`
0.1.6   | msal.min.js | `sha384-xUeuBhJkqQNsSqC/Vp+iBbTmJYPKaQZmHw1FmItaMeO6cPxke0oWF7WKuGGSQXwZ`
0.1.5   | msal.js     | `sha384-fRkpvOupH96TWiZMYDoN6zCqbG01O+LCl2aKfZ1XxyaLSnI903q4xv+P8BjYAiLk`
0.1.5   | msal.min.js | `sha384-KSEL5Lw2KU3hDQ5shS768AepsDAW0LzJupGsVCcklTE+E83tCE2XXLRNifFil9F/`
0.1.4   | msal.js     | `sha384-I+3yWlmqOC5r45O+ed1I5jkjs4xztL7xtBS3qkndksNPezP3DLtcuZNBUfE/VR4r`
0.1.4   | msal.min.js | `sha384-PjgsBxpE55yEIOc+e3yfov1FbJNrdxkg2QOWb9fUG5o9QEZssu2tz0V4yW6SmXrp`
0.1.3   | msal.js     | `sha384-L893gVjbtwElcL0/wshC+nfZoT6u9mj1rHjRfiJlW4rXWSaXjhObY/0ifLdN8AjJ`
0.1.3   | msal.min.js | `sha384-PtTU30L4CXXXOrXyjQOLCgYJA7ESNa/YCaFtDzGybniBc1rkOaIFGIZPIA1qH+ap`
0.1.2   | msal.js     | `sha384-WU4HUYQCGQ264Sip5uczU5yCoizGy8F6l20Vw4+k1i+CjPXvPt/7BHsCSywsZmXQ`
0.1.2   | msal.min.js | `sha384-DjA4Q2EsrVJMQYcR0ka2RSCIIPZrkBkAepuyK7+RxnKn6HHiyRtdOg0AsQzz1ApH`
0.1.1   | msal.min.js | `sha384-wdwhRVZfSWHMht/NRBdseg06tAW6HjJ78TEgwV9JsQyeluZED3S7w54gv8wu6Woj`
0.1.0   | msal.js     | `sha384-bzGfjWVfU/wbUCkSOkshyxkxu3T3GgLZ4h6a/BAS5domaRxtf/2PbuiFI48PNjt+`
0.1.0   | msal.min.js | `sha384-ujQ7X/OxofE4MyPDIJJ1xBikz56E3pSqtH9YG3KI4uKM1jnu0ncIzWAlK3jmLfxJ`
