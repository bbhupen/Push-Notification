importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js'
);

workbox.routing.registerRoute(
  ({request}) => request.destination === 'image',
  new workbox.strategies.CacheFirst()
)


console.log("Service worker loaded.....")


self.addEventListener('push', event => {
  const data = event.data.json()
  console.log(data.body)
  self.registration.showNotification(data.title, {
    body: data.body
  })
})

